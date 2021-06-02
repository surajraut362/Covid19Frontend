import React, { Component } from "react";
import { Patient } from "../../model/Patient";
import { PatientService } from "../../service/patientservice/PatientService";
import Select from "react-select";
import axios from "axios";
import "../hompepage/style.css";

{
  /*class Component for updating Patient Details*/
}

class ModifyPatient extends Component {
  service = new PatientService();

  constructor(props) {
    super(props);
    this.state = {
      selectOptions: [],
      patientId: "",
      patientFirstName: "",
      patientLastName: "",

      patient: new Patient(),
      patients: [],
      error: {
        idError: "",
        fnameError: "",
        lnameError: "",
        numberError: "",
        ageError: "",
        genError: "",
      },
    };
  }

  //this is function is for getting data from API ,After getting the response
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
      this.setState({
        patientId: e.value,
        patientFirstName: e.label,
        patient: this.state.patients[Number(e.id)],
      });
    }
  }

  componentDidMount() {
    // if (sessionStorage.getItem("username") === null) {
    //   alert('Unauthorized Access');
    //   this.props.history.push("/");
    // }
    this.getOptions();
  }

  // this function will check if input fields are null or not.
  validate = () => {
    let flag = true;
    let error = {};

    if (!this.state.patient.patientFirstName) {
      flag = false;
      error.fnameError = "Patient First Name Is Required";
    }
    if (!this.state.patient.patientLastName) {
      flag = false;
      error.lnameError = "Patient Last Name is Required";
    }

    if (!this.state.patient.patientMobileNo) {
      flag = false;
      error.numberError = "Patient Mobile Number is Required";
    }

    if (!this.state.patient.patientAge) {
      flag = false;
      error.ageError = "Patient Age is Required";
    }

    if (!this.state.patient.patientGender) {
      flag = false;
      error.genError = "Patient Gender is Required";
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

    this.service
      .modifyPatient(this.state.patient)
      .then((res) => {
        alert("patient updated...");
        this.props.history.push("/patient");
      })
      .catch(() => {});
    // redirect you to Home component after adding user
    // this.props.history.push("/students");
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
                    Update Patient Details
                  </span>
                </h3>
                <div className="form-group mr2">
                  <label className="form-control-label">
                    Select Patient:<span className="text-danger"> *</span>
                  </label>
                  <div className="alert-danger">{this.state.error.idError}</div>
                  <Select
                    // type="text"
                    //data-testid="PatientIdForTesting"
                    // className="form-control"
                    // id="patientId"
                    // placeholder="Enter Patient Id"
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
                        Firstname:<span className="text-danger"> *</span>
                      </label>
                      <div className="alert-danger">
                        {this.state.error.fnameError}
                      </div>
                      <input
                        type="text"
                        data-testid="FirstName"
                        className="form-control"
                        id="patientFirstName"
                        placeholder="Enter patient FirstName"
                        value={this.state.patient.patientFirstName}
                        onChange={(event) =>
                          this.setState({
                            patient: {
                              ...this.state.patient,
                              patientFirstName: event.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <div className="form-group">
                      <label className="form-control-label">
                        Lastname:<span className="text-danger"> *</span>
                      </label>
                      <div className="alert-danger">
                        {this.state.error.lnameError}
                      </div>
                      <input
                        type="text"
                        data-testid="LastName"
                        className="form-control"
                        id="patientLastName"
                        placeholder="Enter patient LastName"
                        value={this.state.patient.patientLastName}
                        onChange={(event) =>
                          this.setState({
                            patient: {
                              ...this.state.patient,
                              patientLastName: event.target.value,
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
                        Age:<span className="text-danger"> *</span>
                      </label>
                      <div className="alert-danger">
                        {this.state.error.ageError}
                      </div>
                      <input
                        type="Number"
                        min=""
                        max="150"
                        data-testid="Age"
                        className="form-control"
                        id="patientAge"
                        placeholder="Enter patient Age"
                        value={this.state.patient.patientAge}
                        onChange={(event) =>
                          this.setState({
                            patient: {
                              ...this.state.patient,
                              patientAge: event.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <div className="form-group">
                      <label className="form-control-label">
                        Select Gender:<span className="text-danger"> *</span>
                      </label>
                      <div className="alert-danger">
                        {this.state.error.genError}
                      </div>
                      <select
                        type="text"
                        data-testid="Gender"
                        className="form-control"
                        id="patientGender"
                        value={this.state.patient.patientGender}
                        onChange={(event) =>
                          this.setState({
                            patient: {
                              ...this.state.patient,
                              patientGender: event.target.value,
                            },
                          })
                        }
                      >
                        <option>.....</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-control-label">
                    Mobile Number:<span className="text-danger"> *</span>
                  </label>
                  <div className="alert-danger">
                    {this.state.error.numberError}
                  </div>
                  <input
                    type="Number"
                    min="1111111111"
                    max="9999999999"
                    data-testid="MobileNumber"
                    className="form-control"
                    id="patientMobileNo"
                    placeholder="Enter Mobile Number"
                    value={this.state.patient.patientMobileNo}
                    onChange={(event) =>
                      this.setState({
                        patient: {
                          ...this.state.patient,
                          patientMobileNo: event.target.value,
                        },
                      })
                    }
                  />
                </div>
                <button type="submit" className="btn btn-info my-2">
                  Update Patient
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ModifyPatient;
