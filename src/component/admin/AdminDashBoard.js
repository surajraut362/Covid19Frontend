import { Toolbar } from "@material-ui/core";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

// import '../style.css';
import hero from "../images/hero.png";
export default function WelcomePage(props) {
  useEffect(() => {}, []);

  return (
    <div>
      <div className="container card">
        <div className="row">
          <div className="col-lg-6 d-flex flex-column justify-content-center">
            <h4 data-aos="fade-up">
              Welcome to the <b>Admin Portal</b>
            </h4>
            <h5 data-aos="fade-up" data-aos-delay="400">
              Handle your data efficiently
            </h5>
            <div data-aos="fade-up" data-aos-delay="600">
              <div className=" text-lg-start">
                <NavLink to="/dashboard">
                  <Button>Get Started</Button>
                  <i className="bi bi-arrow-right"></i>
                </NavLink>
              </div>
            </div>
          </div>
          <div
            className="col-lg-6 hero-img"
            data-aos="zoom-out"
            data-aos-delay="200"
          >
            <img src={hero} className="img-fluid" alt="" />
          </div>
        </div>
      </div>
      {/* </section>
      </div> */}
    </div>
  );
}
