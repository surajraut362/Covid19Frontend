import React, { Component } from "react";
import { Patient } from "../../model/Patient";
import { CovidTest } from "../../model/CovidTest";
import { PatientService } from "../../service/patientservice/PatientService";
import axios from "axios";
import Select from "react-select";
import "../hompepage/style.css";

{
  /*class Component for Adding Patient Test Details*/
}
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

  //   this is function is for getting data from API ,After getting the response
  //   it will loop through data array using map function and will set state
  //   using selectOptions value.
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

  // handles the change of the input value .
  handleChange(e) {
    this.setState({ patientId: e.value, patientFirstName: e.label });
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
      error.resultError = "Patient test result is Required";
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

    // alert(JSON.stringify(this.state.student));
    this.service
      .addPatientTestDetails(this.state.patientId, this.state.covidTest)
      .then((data) => {
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
                    Add Patient Test Details
                  </span>
                </h3>
                <div className="form-group mr2">
                  <label className="form-control-label">
                    Select Patient:<span className="text-danger"> *</span>
                  </label>
                  <div className="alert-danger">{this.state.error.idError}</div>
                  <Select
                    // type="text"
                    //data-testid="testpatientId"
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
                  <label className="form-control-label">
                    Select Patient Test Date:
                    <span className="text-danger"> *</span>
                  </label>
                  <div className="alert-danger">
                    {this.state.error.dateError}
                  </div>
                  <input
                    type="date"
                    data-testid="testDate"
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
                  <label className="form-control-label">
                    Select Test Result:<span className="text-danger"> *</span>
                  </label>
                  <div className="alert-danger">
                    {this.state.error.resultError}
                  </div>
                  <select
                    type="text"
                    data-testid="testResult"
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
                <button type="submit" className="btn btn-info my-2">
                  Add Patient Test
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddPatientTest;
