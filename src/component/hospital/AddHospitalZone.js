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
        alert(JSON.stringify(data));
        this.props.history.push("/addHospital");
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ marginTop: "50px" }}>
        <h1>
          <span className="badge badge-dark">Add Hospital Zone</span>
        </h1>
        <div className="form-group mr2">
          <div className="alert-danger">{this.state.error.nameError}</div>
          <input
            type="text"
            className="form-control"
            id="zoneName"
            placeholder="Enter Hospital Zone Name"
            value={this.state.zone.zoneName}
            onChange={(event) =>
              this.setState({
                zone: { ...this.state.zone, zoneName: event.target.value },
              })
            }
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Hospital Zone
        </button>
      </form>
    );
  }
}

export default AddHospitalZone;
