import React, { Component } from "react";
import { Link } from "react-router-dom";

function LogoutComponent(props) {
  function logout() {
    sessionStorage.removeItem("username");
    props.setUserName();
    props.history.push("/");
  }

  return (
    <div class="modal-dialog text-secondary" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title " id="exampleModalLabel">
            Ready to Leave?
          </h5>
          <button
            class="close"
            type="button"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body text-gray-400">
          Select "Logout" below if you are ready to end your current session.
        </div>
        <div class="modal-footer text-gray-400">
          <button class="btn btn-secondary" type="button" data-dismiss="modal">
            Cancel
          </button>
          <button class="btn btn-primary" data-dismiss="modal" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
export default LogoutComponent;
