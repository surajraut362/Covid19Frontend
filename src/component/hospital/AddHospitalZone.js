import React, { Component } from "react";
import { HospitalZone } from "../../model/HospitalZone";
import { HospitalService } from "../../service/hospitalservice/HospitalService";

class AddHospitalZone extends Component {
  service = new HospitalService();

  state = {
    zone: new HospitalZone(),
    error: {
      nameError: "",
    },
  };

  validate = () => {
    let flag = true;
    let error = {};
    if (!this.state.zone.zoneName) {
      flag = false;
      error.nameError = "Zone Name is Required";
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
      .addHospitalZone(this.state.zone)
      .then((data) => {
        this.props.history.push("/addHospital");
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };

  render() {
    return (
      // <form  style={{ marginTop: "50px" }}>
      //   <h1>
      //     <span className="badge badge-dark">Add Hospital Zone</span>
      //   </h1>
      <div className="container-fluid px-1 py-5 mx-auto">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
            <div className="card">
              <h5 className="text-center mb-4">Add Hospital Zone</h5>
              <form className="form-card " onSubmit={this.handleSubmit}>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-12 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Enter Hospital Zone Name
                      <span className="text-danger"> *</span>
                    </label>
                    <div className="alert-danger">
                      {this.state.error.nameError}
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="zoneName"
                      data-testid="ZoneName"
                      placeholder="Enter Hospital Zone Name"
                      value={this.state.zone.zoneName}
                      onChange={(event) =>
                        this.setState({
                          zone: {
                            ...this.state.zone,
                            zoneName: event.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Add Hospital Zone
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddHospitalZone;
