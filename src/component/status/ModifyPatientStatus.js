import React, { Component } from "react";
import { Patient } from "../../model/Patient";
import { Status } from "../../model/Status";
import { PatientService } from "../../service/patientservice/PatientService";
import Select from "react-select";
import axios from "axios";

{
  /*class Component for Updating Patient Details*/
}
class ModifyPatientStatus extends Component {
  service = new PatientService();

  constructor(props) {
    super(props);
    this.state = {
      selectOptions: [],
      patientId: "",
      patientFirstName: "",
      patientLastName: "",

      status: new Status(),
      patients: [],

      error: {
        idError: "",
        cdateError: "",
        idateError: "",
        rdateError: "",
        ddateError: "",
      },
    };
  }

  //   this is function is for getting data from API ,After getting the response
  //   it will loop through data array using map function and will set state
  //   using selectOptions value.
  async getOptions() {
    const data = await (
      await axios.get(
        "http://localhost:9090/CovidTracker.com/patients/allpatients"
      )
    ).data;
    this.setState({ ...this.state, patients: data });
    const options = data.map((d, index) => ({
      value: d.patientId,
      label: d.patientId + ":" + d.patientFirstName + " " + d.patientLastName,
      id: index,
    }));

    this.setState({ selectOptions: options });
  }

  // handles the change of the input value .
  handleChange(e) {
    if (JSON.stringify(this.state.patients) !== []) {
      // alert(JSON.stringify(this.state.patients))
      let length = this.state.patients[Number(e.id)].status.length;
      if (length > 0) {
        length--;

        if (
          this.state.patients[Number(e.id)].status[length].recoveredDate ==
            undefined &&
          this.state.patients[Number(e.id)].status[length].deathDate ==
            undefined
        ) {
          this.setState({
            patientId: e.value,
            patientFirstName: e.label,
            status: {
              ...this.state.patients[Number(e.id)].status[length],
              deathDate: "",
              recoveredDate: "",
            },
          });
        } else {
          if (
            this.state.patients[Number(e.id)].status[length].deathDate ==
            undefined
          ) {
            this.setState({
              patientId: e.value,
              patientFirstName: e.label,
              status: {
                ...this.state.patients[Number(e.id)].status[length],
                deathDate: "",
              },
            });
          } else {
            if (
              this.state.patients[Number(e.id)].status[length].recoveredDate ==
              undefined
            ) {
              this.setState({
                patientId: e.value,
                patientFirstName: e.label,
                status: {
                  ...this.state.patients[Number(e.id)].status[length],
                  recoveredDate: "",
                },
              });
            } else {
              if (
                this.state.patients[Number(e.id)].status[length]
                  .recoveredDate == undefined
              ) {
                this.setState({
                  patientId: e.value,
                  patientFirstName: e.label,
                  status: this.state.patients[Number(e.id)].status[length],
                });
              }
            }
          }
        }
      } else {
        alert("Add Patient test details then update status");
        this.props.history.push("/addpatienttest");
      }
    }
  }
  componentDidMount() {
    // if (sessionStorage.getItem("username") === null) {
    //        alert('Unauthorized Access');
    //        this.props.history.push("/");
    //      }
    this.getOptions();
  }

  // this function will check if input fields are null or not.
  validate = () => {
    let flag = true;
    let error = {};

    if (!this.state.status.confirmDate) {
      flag = false;
      error.cdateError = "Patient test result is Required";
    }
    if (!this.state.status.isolationDate) {
      flag = false;
      error.idateError = "Patient Test Date is Required";
    }

    this.setState({ error: error });
    return flag;
  };

  // will check the validate function and then handle the form submission on submit button.
  handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = this.validate();
    if (!isValid) {
      return false;
    }

    // alert(JSON.stringify(this.state.patient));
    this.service
      .modifyPatientStatus(this.state.status)
      .then((data) => {
        // alert(JSON.stringify(data));
        // redirect you to Home component after adding user
        this.props.history.push("/patient");
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        // alert(error.response.data.message);
        // redirect you to Home component after adding user
        //  this.props.history.push("/");
      });
  };

  //render is used to render the React JSX content into DOM.
  render() {
    return (
      <div className="container-fluid px-1 py-3 mx-auto">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-7 col-lg-8 col-md-9 col-12">
            <div className="card">
              <form onSubmit={this.handleSubmit}>
                <h3 align="center" className="mt-2">
                  <span className="badge badge-dark">
                    Update Patient Status
                  </span>
                </h3>
                <div className="form-group mr2">
                  <label className="form-control-label">
                    Select Patient:<span className="text-danger"> *</span>
                  </label>
                  <div className="alert-danger">{this.state.error.idError}</div>
                  <Select
                    // type="text"
                    // className="form-control"
                    //data-testid="PatientIdForTesting"
                    // id="patientId"
                    // placeholder="Enter patient Id"
                    // value={this.state.patient.patientId}
                    options={this.state.selectOptions}
                    onChange={this.handleChange.bind(this)}
                    // onChange={(event) =>
                    //   this.setState({ patient: { ...this.state.patient, patientId: event.target.value } })
                    // }
                  />
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <div className="form-group">
                      <label className="form-control-label">
                        Select Confirm Date:
                        <span className="text-danger"> *</span>
                      </label>
                      <div className="alert-danger">
                        {this.state.error.cdateError}
                      </div>
                      <input
                        type="date"
                        data-testid="patientconfirmDate"
                        className="form-control"
                        id="confirmDate"
                        placeholder="Enter confirm status date"
                        value={this.state.status.confirmDate}
                        onChange={(event) =>
                          this.setState({
                            status: {
                              ...this.state.status,
                              confirmDate: event.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <div className="form-group">
                      <label className="form-control-label">
                        Select Isolation Date:
                        <span className="text-danger"> *</span>
                      </label>
                      <div className="alert-danger">
                        {this.state.error.idateError}
                      </div>
                      <input
                        type="date"
                        data-testid="patientisolationDate"
                        className="form-control"
                        id="isolationDate"
                        placeholder="Enter patient isolation date "
                        value={this.state.status.isolationDate}
                        onChange={(event) =>
                          this.setState({
                            status: {
                              ...this.state.status,
                              isolationDate: event.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <div className="form-group">
                      <label className="form-control-label">
                        Select Recovery Date(Optional):
                        <span className="text-danger"></span>
                      </label>
                      <div className="alert-danger">
                        {this.state.error.rdateError}
                      </div>
                      <input
                        type="date"
                        data-testid="patientrecoveryDate"
                        className="form-control"
                        id="recoveredDate"
                        placeholder="Enter patients Recovery Date"
                        value={this.state.status.recoveredDate}
                        onChange={(event) =>
                          this.setState({
                            status: {
                              ...this.state.status,
                              recoveredDate: event.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <div className="form-group">
                      <label className="form-control-label">
                        Select Death Date(Optional):
                        <span className="text-danger"></span>
                      </label>
                      <div className="alert-danger">
                        {this.state.error.ddateError}
                      </div>
                      <input
                        type="date"
                        data-testid="patientdeathDate"
                        className="form-control"
                        id="deathDate"
                        placeholder="Enter patients Death Date"
                        value={this.state.status.deathDate}
                        onChange={(event) =>
                          this.setState({
                            status: {
                              ...this.state.status,
                              deathDate: event.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-info my-2">
                  Modify Status
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ModifyPatientStatus;
