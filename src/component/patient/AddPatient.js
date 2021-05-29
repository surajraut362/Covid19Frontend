import React, { Component } from "react";
import { Patient } from "../../model/Patient";
import { Hospital } from "../../model/Hospital";
import { PatientService } from "../../service/patientservice/PatientService";
import axios from "axios";
import Select from "react-select";

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

  handleChange(e) {
    this.setState({ hospitalId: e.value, hospitalName: e.label });
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

  handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = this.validate();
    if (!isValid) {
      return false;
    }

    alert(JSON.stringify(this.state.patient));
    this.service
      .addPatient(this.state.hospitalId, this.state.patient)
      .then((data) => {
        //alert(JSON.stringify(data))
        // redirect you to Home component after adding user
        this.props.history.push("/patients");
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
      <div className="container">
        <div className="row">
          <div
            className="col-lg-6 col-md-6 col-xs-12 my-4"
            style={{ backgroundColor: "lightblue" }}
          >
            <form onSubmit={this.handleSubmit}>
              <h1 align="center" className="mt-2">
                <span className="badge badge-dark">Add Patient </span>
              </h1>
              <div className="form-group mr2">
                <label>Select Hospital:</label>
                <div className="alert-danger">{this.state.error.idError}</div>
                <Select
                  // type="text"
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

              <div className="form-group">
                <div className="alert-danger">
                  {this.state.error.fnameError}
                </div>
                <input
                  type="text"
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
              <div className="form-group">
                <div className="alert-danger">
                  {this.state.error.lnameError}
                </div>
                <input
                  type="text"
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
              <div className="form-group">
                <div className="alert-danger">
                  {this.state.error.numberError}
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="patientMobileNo"
                  placeholder="Enter patient Mobile Number"
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
              <div className="form-group">
                <div className="alert-danger">{this.state.error.ageError}</div>
                <input
                  type="text"
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

              <div className="form-group">
                <label>Select Gender:</label>
                <div className="alert-danger">{this.state.error.genError}</div>
                <select
                  type="text"
                  className="form-control"
                  id="patientGender"
                  value={this.state.patient.patientGender}
                  onChange={(event) => {
                    alert(event.currentTarget.value);
                    this.setState({
                      patient: {
                        ...this.state.patient,
                        patientGender: event.currentTarget.value,
                      },
                    });
                  }}
                >
                  <option value=".">.....</option>
                  <option value="Male" selected>
                    Male
                  </option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary my-2">
                Add Patient
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default AddPatient;
