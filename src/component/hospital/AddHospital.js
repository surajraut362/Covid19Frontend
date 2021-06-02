import { Button, IconButton } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import axios from "axios";
import React, { Component } from "react";
import Select from "react-select";
import { Admin } from "../../model/Admin";
import { Hospital } from "../../model/Hospital";
import { HospitalType } from "../../model/HospitalType";
import { HospitalZone } from "../../model/HospitalZone";
import { AdminService } from "../../service/adminservice/AdminService";
import "../../styles/design.css";

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
    service
      .addHospital(
        this.state.hospital,
        this.state.zoneId,
        this.state.typeId,
        this.state.admin.adminId
      )
      .then((result) => {
        this.props.history.push("/hospital");
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };

  render() {
    return (
      <div className="container-fluid px-1 py-5 mx-auto">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
            <div className="card">
              <h5 className="text-center mb-4">Add Hospital</h5>
              <form className="form-card" onSubmit={this.handleSubmit}>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-12 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Enter Hospital Name<span className="text-danger"> *</span>
                    </label>

                    <div className="alert-danger">
                      {this.state.error.NameError}
                    </div>
                    <input
                      style={{}}
                      type="text"
                      className="form-control"
                      data-testid="HospitalName"
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
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Enter General Bed<span className="text-danger"> *</span>
                    </label>
                    <div className="alert-danger">
                      {this.state.error.GenerelBed}
                    </div>

                    <input
                      // style={{ marginTop: "25px" }}
                      type="number"
                      min={0}
                      className="form-control"
                      id="hospitalGeneralBed"
                      data-testid="GeneralBed"
                      placeholder="General Beds"
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

                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Enter ICU Bed
                      <span className="text-danger"> *</span>
                    </label>
                    <div className="alert-danger">
                      {this.state.error.ICUBed}
                    </div>

                    <input
                      // style={{ marginTop: "25px" }}
                      type="number"
                      min={0}
                      className="form-control"
                      id="hospitalICUBed"
                      data-testid="ICUBed"
                      placeholder="ICU Bed"
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
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-11 flex-column d-flex">
                    <Select
                      options={this.state.selectOptions}
                      onChange={this.handleChange.bind(this)}
                      placeholder="Select Hospital Zone"
                    />
                  </div>

                  <div className="form-group col-1 flex-column d-flex">
                    <IconButton>
                      <Button
                        onClick={() =>
                          this.props.history.push("/addHospitalZone")
                        }
                      >
                        <AddCircle fontSize="large" className="text-primary" />
                      </Button>
                    </IconButton>
                  </div>
                </div>
                <div>
                  <Select
                    options={this.state.selectOptions1}
                    onChange={this.handleChange1.bind(this)}
                    placeholder="Select Hospital Type"
                  ></Select>
                </div>

                <Button type="submit" className="btn btn-primary">
                  Add Hospital
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddHospital;
