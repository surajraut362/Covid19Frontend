import React, { Component } from "react";

import { Hospital } from "../../model/Hospital";
import { AdminService } from "../../service/adminservice/AdminService";
import { HospitalZone } from "../../model/HospitalZone";
import { HospitalType } from "../../model/HospitalType";
import { Admin } from "../../model/Admin";

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
      // <form onSubmit={this.handleSubmit}>
      //   <h1>
      //     <span className="badge badge-dark">Add Hospital</span>
      //   </h1>
      <div className="container-fluid px-1 py-5 mx-auto">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
            <div className="card">
              <h5 className="text-center mb-4">Update Hospital</h5>
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
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Enter General Bed<span className="text-danger"> *</span>
                    </label>
                    <div className="alert-danger">
                      {this.state.error.GenerelBed}
                    </div>

                    <div className="alert-danger">
                      {this.state.error.GeneralBedError}
                    </div>
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

                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Enter ICU Bed<span className="text-danger"> *</span>
                    </label>
                    <div className="alert-danger">
                      {this.state.error.ICUBed}
                    </div>

                    <div className="alert-danger">
                      {this.state.error.ICUBedError}
                    </div>
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
                </div>
                <button type="submit" className="btn btn-info">
                  Update Hospital
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UpdateHospital;
