import React, { Component } from "react";

function Contact(props) {
  // const useStyles = makeStyles((theme) => ({
  //     body:{
  //         backgroundcolor: '#25274d'
  //     }
  //   }));

  return (
    <div
      className="container justify-content-center  card"
      style={{ marginTop: "" }}
    >
      <div className="row">
        <div
          className="col-md-3 bg-primary"
          style={{
            padding: "4%",
            bordertopleftradius: "1rem",
            borderbottomleftradius: "1rem",
          }}
        >
          <div
            className="contact-info"
            style={{ marginTop: "10%", color: "#fff" }}
          >
            <img
              src="https://image.ibb.co/kUASdV/contact-image.png"
              alt="image"
              style={{ marginbottom: "15%" }}
            />
            <h2 style={{ marginTop: "20%", marginbottom: "10%" }}>
              Contact Us
            </h2>
            <h4 style={{ marginTop: "10%" }}>
              We would love to hear from you !
            </h4>
          </div>
        </div>
        <div
          className="col-md-9"
          style={{
            background: "#fff",
            padding: "3%",
            bordertoprightradius: "0.5rem",
            borderbottomrightradius: "0.5rem",
          }}
        >
          <div className="contact-form">
            <div className="form-group">
              <label
                className="control-label col-sm-2"
                for="fname"
                style={{ fontweight: "600" }}
              >
                First Name:
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="fname"
                  placeholder="Enter First Name"
                  name="fname"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" for="lname">
                Last Name:
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="lname"
                  placeholder="Enter Last Name"
                  name="lname"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" for="email">
                Email:
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  name="email"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" for="comment">
                Comment:
              </label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  rows="5"
                  id="comment"
                ></textarea>
              </div>
            </div>
            <div className="form-group ">
              <div className="col-sm-offset-2 col-sm-10">
                <button
                  type="submit"
                  className="btn btn-default btn-primary"
                  style={{
                    color: "#fff",
                    fontweight: "600",
                    width: "25%",
                    boxshadow: "none",
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
