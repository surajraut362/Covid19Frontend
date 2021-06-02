import React, { Component } from "react";
import { Admin } from "../../model/Admin";
import { AdminService } from "../../service/adminservice/AdminService";
import "../../styles/design.css";

class AddAdmin extends Component {
  service = new AdminService();
  state = {
    admin: new Admin(),
    error: {
      firstName: "",
      lastName: "",
      emailId: "",
    },
  };
  constructor(props) {
    super(props);
  }
  validate = () => {
    let flag = true;
    let error = {};

    if (!this.state.admin.adminFirstName) {
      flag = false;
      error.NameError = "First Name is Required";
    }

    if (!this.state.admin.adminLastName) {
      flag = false;
      error.genError = "Last Name is Required";
    }
    if (!this.state.admin.adminEmailId) {
      flag = false;
      error.genError = "Email Id is Required";
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

    this.service
      .addAdmin(this.state.admin)
      .then((data) => {
        this.props.history.push("/admin");
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };
  render() {
    return (
      //  <form onSubmit={this.handleSubmit} style={bav}>

      <div className="container-fluid px-1 py-5 mx-auto">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
            <div className="card">
              <h5 className="text-center mb-4">Add Admin</h5>
              <form className="form-card" onSubmit={this.handleSubmit}>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <div className="alert-danger">
                      {this.state.error.fistNameError}
                    </div>
                    <label className="form-control-label px-3">
                      First name<span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      data-testid="FirstName"
                      placeholder="Enter Admin First Name"
                      value={this.state.admin.adminFirstName}
                      onChange={(event) =>
                        this.setState({
                          admin: {
                            ...this.state.admin,
                            adminFirstName: event.target.value,
                          },
                        })
                      }
                    />
                  </div>

                  <div className="form-group col-sm-6 flex-column d-flex">
                    <div className="alert-danger">
                      {this.state.error.lastNameError}
                    </div>
                    <label className="form-control-label px-3">
                      Last name<span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      data-testid="LastName"
                      placeholder="Enter Admin Last Name"
                      value={this.state.admin.adminLastName}
                      onChange={(event) =>
                        this.setState({
                          admin: {
                            ...this.state.admin,
                            adminLastName: event.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>

                <div className="row justify-content-between text-left">
                  <div className="form-group col-12 flex-column d-flex">
                    <div className="form-group">
                      <div className="alert-danger">
                        {this.state.error.emailId}
                      </div>
                      <label className="form-control-label px-3">
                        Email Id<span className="text-danger"> *</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        data-testid="Id"
                        placeholder="Enter Email Id"
                        value={this.state.admin.adminEmailId}
                        onChange={(event) =>
                          this.setState({
                            admin: {
                              ...this.state.admin,
                              adminEmailId: event.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row justify-content-end">
                  <div className="form-group col-sm-6">
                    {" "}
                    <button type="submit" className="btn-block btn-primary">
                      Add Admin
                    </button>{" "}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddAdmin;
