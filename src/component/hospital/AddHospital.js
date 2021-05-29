import { ThreeSixty } from "@material-ui/icons";
import React, { Component, component } from "react";
import { Admin } from "../../model/Admin";
import { Hospital } from "../../model/Hospital";
import { HospitalType } from "../../model/HospitalType";
import { HospitalZone } from "../../model/HospitalZone";
import { AdminService } from "../../service/adminservice/AdminService";
import axios from "axios";
import Select from "react-select";
import { Link } from "react-router-dom";
import { HospitalService } from "../../service/hospitalservice/HospitalService";

class AddHospital extends Component {
  async getOptions() {
    const res = await axios.get(
      "http://localhost:9090/CovidTracker.com/hospital/allHospitalZone"
    );
    const data = res.data;

    const options = data.map((d) => ({
      value: d.zoneId,
      label: d.zoneName,
    }));

    this.setState({ selectOptions: options });
  }
  handleChange(e) {
    this.setState({ zoneId: e.value, zoneName: e.label });
  }

  async getOptions1() {
    const res1 = await axios.get(
      "http://localhost:9090/CovidTracker.com/hospital/allHospitalType"
    );
    const data1 = res1.data;

    const options1 = data1.map((d1) => ({
      value: d1.typeId,
      label: d1.typeName,
    }));

    this.setState({ selectOptions1: options1 });
  }
  handleChange1(e) {
    this.setState({ typeId: e.value, typeName: e.label });
  }

  componentDidMount() {
    this.getOptions();
    this.getOptions1();
    let service = new AdminService();
    alert("hello");
    service
      .getAdminCredentials(JSON.parse(sessionStorage.getItem("username")))
      .then((result) => {
        this.setState({
          admin: result.data,
        });
      });
  }

  state = {
    hospital: new Hospital(),
    hospitalZone: new HospitalZone(),
    HospitalType: new HospitalType(),
    admin: new Admin(),
    selectOptions: [],

    zoneId: "",
    zoneName: "",
    selectOptions1: [],
    typeId: "",
    typeName: "",

    error: {
      idError: "",
      Name: "",
      Zone: "",
      Type: "",
      GenerelBed: "",
      ICUBed: "",
      NameError: "",
    },
  };
  validate = () => {
    let flag = true;
    let error = {};
    // if (!this.state.hospital.hospitalId) {
    //   error.idError = "hospital Id Is Required";
    //   flag = false
    // }

    if (!this.state.hospital.hospitalName) {
      flag = false;
      error.NameError = "Hospital Name is Required";
    }

    // if (!this.state.hospital.hospitalZone) {
    //   flag = false;
    //   error.numberError = "Hospital Zone is Requ.ired";
    // }

    // if (!this.state.hospital.hospitalType) {
    //   flag = false;
    //   error.ageError = "Hospital Type is Required";
    // }

    if (!this.state.hospital.hospitalGeneralBed) {
      flag = false;
      error.genError = "Hospital General Bed is Required";
    }
    if (!this.state.hospital.hospitalICUBed) {
      flag = false;
      error.genError = "Hospital ICU Bed is Required";
    }
    this.setState({ error: error });
    return flag;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log("hello");
    let isValid = this.validate();
    if (!isValid) {
      console.log("hello1");
      return false;
    }
    let service = new AdminService();
    alert(JSON.stringify(this.state.hospital));
    service
      .addHospital(
        this.state.hospital,
        this.state.zoneId,
        this.state.typeId,
        this.state.admin.adminId
      )
      .then((result) => {
        this.props.history.push("/hospitals");
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        style={{ borderStyle: "solid", marginTop: "50px" }}
      >
        <h1>
          <span className="badge badge-dark">Add Hospital</span>
        </h1>
        {/* <div className="form-group mr2">
                        <div className="alert-danger">{this.state.error.idError}</div>
                        <input
                        type="text"
                        className="form-control"
                        id="adminId"
                        placeholder="Enter admin Id"
                        value={this.state.admin.adminId}
                        onChange={(event) =>
                        this.setState({admin: { ...this.state.admin, adminId: event.target.value } })
                        }
          />
                        </div>   */}
        {/* <div className="form-group">
          <div className="alert-danger">{this.state.error.idError}</div>
          <input
            type="text"
            className="form-control"
            id="hospitalId"
            placeholder="Enter Hospital Id"
            value={this.state.hospital.hospitalId}
            onChange={(event) =>
              this.setState({ hospital: { ...this.state.hospital, hospitalId: event.target.value } })
            }
          />
        </div> */}
        <div className="form-group" style={{ backgroundColor: "#C7D2FE" }}>
          <div className="alert-danger">{this.state.error.NameError}</div>
          <input
            style={{}}
            type="text"
            className="form-control"
            id="hospitalName"
            placeholder="Enter hospital Name"
            value={this.state.hospital.hospitalName}
            onChange={(event) =>
              this.setState({
                hospital: {
                  ...this.state.hospital,
                  hospitalName: event.target.value,
                },
              })
            }
          />
        </div>
        {/* <div className="form-group">
          <div className="alert-danger">{this.state.error.ZoneError}</div>
          <input
            type="text"
            className="form-control"
            id="hospitalZone"
            placeholder="Enter hospital Zone"
            value={this.state.hospital.hospitalZone}
            onChange={(event) =>
              this.setState({ hospital: { ...this.state.hospital, hospitalZone: event.target.value } })
            }
          />
        </div> */}
        {/* <div className="form-group">
          <div className="alert-danger">{this.state.error.TypeError}</div>
          <input
            type="text"
            className="form-control"
            id="hospitalType"
            placeholder="Enter hospital Type"
            value={this.state.hospital.hospitalType}
            onChange={(event) =>
              this.setState({ hospital: { ...this.state.hospital, hospitalType: event.target.value } })
            }
          />
        </div> */}
        <div className="form-group">
          <div className="alert-danger">{this.state.error.GeneralBedError}</div>
          <input
            style={{ marginTop: "25px" }}
            type="text"
            className="form-control"
            id="hospitalGeneralBed"
            placeholder="Enter hospital General Bed"
            value={this.state.hospital.hospitalGeneralBed}
            onChange={(event) =>
              this.setState({
                hospital: {
                  ...this.state.hospital,
                  hospitalGeneralBed: event.target.value,
                },
              })
            }
          />
        </div>
        <div className="form-group">
          <div className="alert-danger">{this.state.error.ICUBedError}</div>
          <input
            style={{ marginTop: "25px" }}
            type="text"
            className="form-control"
            id="hospitalICUBed"
            placeholder="Enter hospital ICU Bed"
            value={this.state.hospital.hospitalICUBed}
            onChange={(event) =>
              this.setState({
                hospital: {
                  ...this.state.hospital,
                  hospitalICUBed: event.target.value,
                },
              })
            }
          />
          <br></br>
          <div>
            <Select
              options={this.state.selectOptions}
              onChange={this.handleChange.bind(this)}
              placeholder="Select Hospital Zone"
            />
            <Link to="/AddHospitalZone">
              <button style={{ marginLeft: "970px" }}>Add Hospital Zone</button>
            </Link>
          </div>
          <br />
          <div>
            <Select
              options={this.state.selectOptions1}
              onChange={this.handleChange1.bind(this)}
              placeholder="Select Hospital Type"
            ></Select>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginLeft: "500px" }}
        >
          Add Hospital
        </button>
      </form>
    );
  }
}
export default AddHospital;
