import React, { Component } from "react";
import { Login } from "../../model/Login";
import { AdminService } from "../../service/adminservice/AdminService";
export default class LoginComponent extends Component {
  componentDidMount() {
    if (sessionStorage.getItem("username") !== null) {
      this.props.history.push("/admin");
    }
  }
  componentDidUpdate() {
    if (sessionStorage.getItem("username") !== null) {
      this.props.history.push("/admin");
    }
  }

  state = {
    login: new Login(),
    error: {
      usernameError: "",
      passwordError: "",
      invalidCredentials: "",
    },
  };
  validate = () => {
    let flag = true;
    let error = {};
    if (!this.state.login.username) {
      error.usernameError = "Username Is Required";
      flag = false;
    }
    if (!this.state.login.password) {
      flag = false;
      error.passwordError = "Password Is Required";
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
    // alert(JSON.stringify(this.state.login));
    let service = new AdminService();
    service
      .getAdminCredentials(this.state.login)
      .then((result) => {
        alert(JSON.stringify(result.data));
        if (result != null) {
          sessionStorage.setItem("username", JSON.stringify(this.state.login));
          this.props.history.push("/welcome");
        } else {
          alert("Hello");
          this.setState({
            error: { invalidCredentials: "Invalid Credentials" },
          });
        }
      })
      .catch((error) => {
        alert(error);

        this.setState({ error: { invalidCredentials: "Invalid Credentials" } });
      });
  };
  render() {
    {
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
          <div class="card card0 border-0">
            <div class="row d-flex">
              <div class="col-lg-6">
                <div class="card1 pb-5">
                  <div class="row">
                    {" "}
                    <img src="../images/logo.jpeg" class="logo" />
                  </div>
                  <div class="row px-3 justify-content-center mt-4 mb-5 border-line">
                    {" "}
                    <img src="../images/doctor.jpg" class="image" />{" "}
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="card2 card border-0 px-4 py-5">
                  <br></br>
                  <br></br>
                  <br></br>
                  <div class="row px-3">
                    {" "}
                    <div className="alert-danger">
                      {this.state.error.usernameError}
                    </div>
                    <label class="mb-1">
                      <h6 class="mb-0 text-sm">Username</h6>
                    </label>{" "}
                    <input
                      class="mb-4"
                      type="text"
                      name="email"
                      placeholder="Enter a valid Username"
                      value={this.state.login.username}
                      onChange={(event) =>
                        this.setState({
                          login: {
                            ...this.state.loginlogin,
                            username: event.target.value,
                          },
                        })
                      }
                    />{" "}
                  </div>
                  <div class="row px-3">
                    {" "}
                    <label class="mb-1">
                      <h6 class="mb-0 text-sm">Password</h6>
                    </label>{" "}
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={this.state.login.password}
                      onChange={(event) =>
                        this.setState({
                          login: {
                            ...this.state.login,
                            password: event.target.value,
                          },
                        })
                      }
                    />{" "}
                  </div>
                  <div class="row px-3 mb-4">
                    <div class="custom-control custom-checkbox custom-control-inline">
                      {" "}
                      <input
                        id="chk1"
                        type="checkbox"
                        name="chk"
                        class="custom-control-input"
                      />{" "}
                      <label for="chk1" class="custom-control-label text-sm">
                        Remember me
                      </label>{" "}
                    </div>{" "}
                    <a href="#" class="ml-auto mb-0 text-sm">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="form-group">
                    <div className="alert-danger">
                      {this.state.error.invalidCredentials}
                    </div>
                  </div>
                  <div class="row mb-3 px-3">
                    {" "}
                    <button type="submit" class="btn btn-blue text-center">
                      Login
                    </button>{" "}
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-blue py-4">
              <div class="row px-3">
                {" "}
                <small class="ml-4 ml-sm-5 mb-2">
                  Copyright &copy; 2021. All rights reserved.
                </small>
                <div class="social-contact ml-4 ml-sm-auto">
                  {" "}
                  <span class="fa fa-facebook mr-4 text-sm"></span>{" "}
                  <span class="fa fa-google-plus mr-4 text-sm"></span>{" "}
                  <span class="fa fa-linkedin mr-4 text-sm"></span>{" "}
                  <span class="fa fa-twitter mr-4 mr-sm-5 text-sm"></span>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
