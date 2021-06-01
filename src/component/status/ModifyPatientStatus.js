import React, { Component } from "react";
import { Patient } from "../../model/Patient";
import { Status } from "../../model/Status";
import { PatientService } from "../../service/patientservice/PatientService";
import Select from "react-select";
import axios from "axios";

class ModifyPatientStatus extends Component {
  service = new PatientService();

  constructor(props) {
    super(props);
    this.state = {
      selectOptions: [],
      patientId: "",
      patientFirstName: "",
      patientLastName: "",

      patient: new Patient(),
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
    this.getOptions();
  }
  // componentDidMount() {
  //   if (sessionStorage.getItem("username") === null) {
  //     alert('Unauthorized Access');
  //     this.props.history.push("/");
  //   }
  //   this.service.getAllDepartment()
  //     .then((result) => {
  //       let depts = result.data.map((dept) => {
  //         return { value: dept.departmentId, display: dept.departmentName };
  //       });
  //       this.setState({
  //         departments: [{ value: "-1", display: "Select Department" }].concat(
  //           depts
  //         ),
  //       });
  //     })
  //     .catch((error) => {
  //       alert(JSON.stringify("error: " + error));
  //     });
  // }

  validate = () => {
    let flag = true;
    let error = {};
    // if (!this.state.patient.patientId) {
    //   error.idError = "Patient Id Is Required";
    //   flag = false
    // }
    // if (!this.state.status.statusId) {
    //   flag = false;
    //   error.idError = "Status id is Required";
    // }
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
        // redirect you to Home component after adding user
        // this.props.history.push("/patients");
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        // alert(error.response.data.message);
        // redirect you to Home component after adding user
        //  this.props.history.push("/");
      });
  };

  render() {
    return (
      <div className="container-fluid" style={{ backgroundColor: "#dfe3ee" }}>
        <div className="row">
          <div className="col-2"></div>
          <div
            className="col-lg-8 col-md-6 col-xs-12 my-4"
            style={{ backgroundColor: "#8b9dc3" }}
          >
            <form onSubmit={this.handleSubmit}>
              <h1 align="center" className="mt-2">
                <span className="badge badge-dark">Modify Patient Status</span>
              </h1>
              <div className="form-group mr2">
                <label> Select Patient:</label>
                <div className="alert-danger">{this.state.error.idError}</div>
                <Select
                  // type="text"
                  // className="form-control"
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
              <div className="form-group">
                <label>Select Confirm Date:</label>
                <div className="alert-danger">
                  {this.state.error.cdateError}
                </div>
                <input
                  type="date"
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

              <div className="form-group">
                <label>Select Isolation Date:</label>
                <div className="alert-danger">
                  {this.state.error.idateError}
                </div>
                <input
                  type="date"
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
              <div className="form-group">
                <label>Select Recovery Date(Optional):</label>
                <div className="alert-danger">
                  {this.state.error.rdateError}
                </div>
                <input
                  type="date"
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

              <div className="form-group">
                <label>Select Death Date(Optional):</label>
                <div className="alert-danger">
                  {this.state.error.ddateError}
                </div>
                <input
                  type="date"
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
              <button type="submit" className="btn btn-warning my-2">
                Modify Status
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default ModifyPatientStatus;
