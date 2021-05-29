import React, { Component } from "react";
import { AdminService } from "../../service/adminservice/AdminService";

class DeleteHospital extends Component {
  componentDidMount() {
    // if (sessionStorage.getItem("username") === null) {
    //   alert('Unauthorized Access');
    //   this.props.history.push("/");
    // }
    let service = new AdminService();
    alert("hello");
    service.removeHospital(this.props.match.params.id).then(
      (result) => {
        alert("Hospital is deleted.");
        this.props.history.push("/dashboard");
      },
      (error) => {
        alert("Hospital is not deleted.");
      }
    );
  }
  render() {
    return <p>Processing...</p>;
  }
}

export default DeleteHospital;
