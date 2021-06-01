import React, { Component } from "react";
import { Patient } from "../../model/Patient";
import { CovidTest } from "../../model/CovidTest";
import { PatientService } from "../../service/patientservice/PatientService";
import axios from "axios";
import Select from "react-select";
import "../hompepage/style.css";

class AddPatientTest extends Component {
  service = new PatientService();

  constructor(props) {
    super(props);
    this.state = {
      selectOptions: [],
      patientId: "",
      patientFirstName: "",
      patientLastName: "",

      patient: new Patient(),
      covidTest: new CovidTest(),

      error: {
        idError: "",
        dateError: "",
        resultError: "",
      },
    };
  }
  async getOptions() {
    const data = await (
      await axios.get(
        "http://localhost:9090/CovidTracker.com/patients/allpatients"
      )
    ).data;

    const options = data.map((d) => ({
      value: d.patientId,
      label: d.patientId + " : " + d.patientFirstName + " " + d.patientLastName,
    }));

    this.setState({ selectOptions: options });
  }

  handleChange(e) {
    this.setState({ patientId: e.value, patientFirstName: e.label });
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
    if (!this.state.covidTest.testDate) {
      flag = false;
      error.dateError = "Patient Test Date is Required";
    }
    if (!this.state.covidTest.result) {
      flag = false;
      error.lnameError = "Patient test result is Required";
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

    // alert(JSON.stringify(this.state.student));
    this.service
      .addPatientTestDetails(this.state.patientId, this.state.covidTest)
      .then((data) => {
        alert(JSON.stringify(data));
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
              <h3 align="center" className="mt-2">
                <span className="badge badge-dark">
                  Add Patient Test Details
                </span>
              </h3>
              <div className="form-group mr2">
                <label>Select Patient:</label>
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
                <label>Select Patient Test Date:</label>
                <div className="alert-danger">{this.state.error.dateError}</div>
                <input
                  type="date"
                  className="form-control"
                  id="testDate"
                  placeholder="Enter patients testdate"
                  value={this.state.covidTest.testDate}
                  onChange={(event) =>
                    this.setState({
                      covidTest: {
                        ...this.state.covidTest,
                        testDate: event.target.value,
                      },
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Select Test Result:</label>
                <div className="alert-danger">
                  {this.state.error.resultError}
                </div>
                <select
                  type="text"
                  className="form-control"
                  id="result"
                  value={this.state.covidTest.result}
                  onChange={(event) =>
                    this.setState({
                      covidTest: {
                        ...this.state.covidTest,
                        result: event.target.value,
                      },
                    })
                  }
                >
                  <option>......</option>
                  <option>Negative</option>
                  <option>Positive</option>
                </select>
              </div>
              <button type="submit" className="btn btn-warning my-2">
                Add Patient Test
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default AddPatientTest;
