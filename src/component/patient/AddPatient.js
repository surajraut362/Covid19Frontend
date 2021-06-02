import React, { Component } from "react";
import { Patient } from "../../model/Patient";
import { Hospital } from "../../model/Hospital";
import { PatientService } from "../../service/patientservice/PatientService";
import axios from "axios";
import Select from "react-select";
import "../../styles/design.css";

{
  /*class Component for Adding Patient Details*/
}
class AddPatient extends Component {
  service = new PatientService();
  constructor(props) {
    super(props);
    this.state = {
      selectOptions: [],
      hospitalId: "",
      hospitalName: "",

      patient: new Patient(),
      hospital: new Hospital(),

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

  //   this is function is for getting data from API ,After getting the response
  //   it will loop through data array using map function and will set state
  //   using selectOptions value.

  async getOptions() {
    const data = await (
      await axios.get("http://localhost:9090/CovidTracker.com/hospital/")
    ).data;

    const options = data.map((d) => ({
      value: d.hospitalId,
      label: d.hospitalName,
    }));

    this.setState({ selectOptions: options });
  }

  // handles the change of the input value .

  handleChange(e) {
    this.setState({ hospitalId: e.value, hospitalName: e.label });
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

    if (
      this.state.patient.patientGender === "....." ||
      !this.state.patient.patientGender
    ) {
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

    // alert(JSON.stringify(this.state.patient));
    this.service
      .addPatient(this.state.hospitalId, this.state.patient)
      .then((data) => {
        //alert(JSON.stringify(data))
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
                <h1 align="center" className="my-2">
                  <span className="badge badge-dark ">Add Patient </span>
                </h1>
                <div className="form-group">
                  <label className="form-control-label">
                    Select Hospital:<span className="text-danger"> *</span>
                  </label>
                  <div className="alert-danger">{this.state.error.idError}</div>
                  <Select
                    // type="text"
                    // data-testid="HospitalId"
                    // className="form-control"
                    // id="hospitalId"
                    // placeholder="Enter hospital Id"
                    // value={this.state.hospital.hospitalId}
                    options={this.state.selectOptions}
                    onChange={this.handleChange.bind(this)}
                    // onChange={(event) =>
                    //   this.setState({ hospital: { ...this.state.hospital, hospitalId: event.target.value } })
                    // }
                  />
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <div className="form-group">
                      <label className="form-control-label">
                        Enter FirstName:<span className="text-danger"> *</span>
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
                        Enter LastName:<span className="text-danger"> *</span>
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
                        Enter Age:<span className="text-danger"> *</span>
                      </label>
                      <div className="alert-danger">
                        {this.state.error.ageError}
                      </div>
                      <input
                        type="Number"
                        min="1"
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
                    {/* <div className="form-group"> */}
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
                      onChange={(event) => {
                        this.setState({
                          patient: {
                            ...this.state.patient,
                            patientGender: event.currentTarget.value,
                          },
                        });
                      }}
                    >
                      <option value="select">.....</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
                {/* </div> */}
                <div className="form-group">
                  <label className="form-control-label">
                    Enter Mobile Number:<span className="text-danger"> *</span>
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
                  Add Patient
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddPatient;
