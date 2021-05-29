import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

// import '../style.css';
import hero from "../images/hero.png";
export default function WelcomePage(props) {
  useEffect(() => {
    if (sessionStorage.getItem("username") === null) {
      props.history.push("/");
    }
  }, []);

  return (
    <div>
      <section id="hero" class="hero d-flex align-items-center">
        <div className="container">
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
      </section>
    </div>
  );
}
