import React, { Component } from "react";
import { Link } from "react-router-dom";

function LogoutComponent(props) {
  function logout() {
    sessionStorage.removeItem("username");
    props.setUserName();
    props.history.push("/");
  }

  return (
    <div className="modal-dialog text-secondary" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title " id="exampleModalLabel">
            Ready to Leave?
          </h5>
          <button
            className="close"
            type="button"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body text-gray-400">
          Select "Logout" below if you are ready to end your current session.
        </div>
        <div className="modal-footer text-gray-400">
          <button
            className="btn btn-secondary"
            type="button"
            data-dismiss="modal"
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            data-dismiss="modal"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
export default LogoutComponent;
