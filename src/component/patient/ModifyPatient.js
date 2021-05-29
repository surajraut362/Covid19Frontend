import React, { Component } from "react";
import { Patient } from "../../model/Patient";
import { PatientService } from "../../service/patientservice/PatientService";
import Select from "react-select";
import axios from "axios";

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
      this.setState({
        patientId: e.value,
        patientFirstName: e.label,
        patient: this.state.patients[Number(e.id)],
      });
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
        this.props.history.push("/patients");
      })
      .catch(() => {});
    // redirect you to Home component after adding user
    // this.props.history.push("/students");
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
              <h3 align="center" className="mt-2">
                <span className="badge badge-dark">Update Patient Details</span>
              </h3>
              <div className="form-group mr2">
                <label>Select Patient:</label>
                <div className="alert-danger">{this.state.error.idError}</div>
                <Select
                  // type="text"
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
              <div className="form-group">
                <div className="alert-danger">{this.state.error.nameError}</div>
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
                  {this.state.error.scoreError}
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
                  {this.state.error.scoreError}
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
                <div className="alert-danger">
                  {this.state.error.scoreError}
                </div>
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
                <div className="alert-danger">
                  {this.state.error.scoreError}
                </div>
                <select
                  type="text"
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
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary my-2">
                Update Patient
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default ModifyPatient;
