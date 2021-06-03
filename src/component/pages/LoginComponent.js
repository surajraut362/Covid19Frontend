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
        if (result != null) {
          sessionStorage.setItem("username", JSON.stringify(this.state.login));
          this.props.history.push("/welcome");
        } else {
          this.setState({
            error: { invalidCredentials: "Invalid Credentials" },
          });
        }
      })
      .catch((error) => {
        this.setState({ error: { invalidCredentials: "Invalid Credentials" } });
      });
  };
  render() {
    {
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="container-fluid">
            <div className=" m-0">
              <div className="row ">
                <div className="col-lg-12 d-flex justify-content-center">
                  <div className="card2 card border-0  px-4 py-5 ">
                    {/* <div className="alert-danger mt-0">
                    </div> */}
                    <div className="row px-3">
                      {" "}
                      <label className="mb-1">
                        <h6 className="mb-0 text-sm">Username</h6>
                      </label>{" "}
                      <input
                        className="mb-4"
                        type="text"
                        name="email"
                        required
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
                    <div className="row px-3">
                      {" "}
                      <label className="mb-1">
                        <h6 className="mb-0 text-sm">Password</h6>
                      </label>{" "}
                      <input
                        required
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
                    <div className="row px-3 mb-4">
                      <div className="custom-control custom-checkbox custom-control-inline">
                        {" "}
                        <input
                          id="chk1"
                          type="checkbox"
                          name="chk"
                          className="custom-control-input"
                        />{" "}
                        <label
                          for="chk1"
                          className="custom-control-label text-sm"
                        >
                          Remember me
                        </label>{" "}
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="alert-danger">
                        {this.state.error.invalidCredentials}
                      </div>
                    </div>
                    <div className="row mb-3 px-3">
                      {" "}
                      <button
                        type="submit"
                        className="btn btn-primary text-center"
                      >
                        Login
                      </button>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
