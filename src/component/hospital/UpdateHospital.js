import React, { Component } from "react";
import axios from "axios";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Button, Grid, Paper } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LockIcon from "@material-ui/icons/Lock";
import PhoneIcon from "@material-ui/icons/Phone";
import FiberPinIcon from "@material-ui/icons/FiberPin";
import RoomIcon from "@material-ui/icons/Room";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import HomeIcon from "@material-ui/icons/Home";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Hospital } from "../../model/Hospital";
import { AdminService } from "../../service/adminservice/AdminService";
import { HospitalZone } from "../../model/HospitalZone";
import { HospitalType } from "../../model/HospitalType";
import { Admin } from "../../model/Admin";
import Select from "react-select";

class UpdateHospital extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hospital: new Hospital(),
      hospitalZone: new HospitalZone(),
      HospitalType: new HospitalType(),
      admin: new Admin(),
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
  }
  componentDidMount() {
    this.service
      .getHospitalById(this.props.match.params.id)
      .then((result) => {
        this.setState({
          hospital: result.data,
        });
      })
      .catch((error) => {
        alert(JSON.stringify("error: " + error));
      });
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

  service = new AdminService();

  validate = () => {
    let flag = true;
    let error = {};
    if (!this.state.hospital.hospitalName) {
      flag = false;
      error.NameError = "Hospital Name is Required";
    }

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

    let isValid = this.validate();
    if (!isValid) {
      return false;
    }

    this.service
      .modifyHospital(this.state.hospital)
      .then((data) => {
        alert(JSON.stringify(data));
        alert("Hospital Information Updated Successfully");
        // redirect you to viewallvendor page after updating
        this.props.history.push("/hospitals");
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        this.props.history.push("/");
        // alert(error.response.data.message);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>
          <span className="badge badge-dark">Add Hospital</span>
        </h1>

        <div className="form-group">
          <div className="alert-danger">{this.state.error.NameError}</div>
          <input
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

        <div className="form-group">
          <div className="alert-danger">{this.state.error.GeneralBedError}</div>
          <input
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
        </div>
        <button type="submit" className="btn btn-primary">
          Update Hospital
        </button>
      </form>
    );
  }
}
export default UpdateHospital;
