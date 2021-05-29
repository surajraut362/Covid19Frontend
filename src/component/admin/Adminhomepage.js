import React from "react";
import ResponsiveEmbed from "react-bootstrap/ResponsiveEmbed";
import {
  Navbar,
  Image,
  Nav,
  Container,
  NavDropdown,
  Card,
  Button,
  NavLink,
} from "react-bootstrap";
import datacenter from "../images/datacenterroom.jpg";
import admin from "../images/admincategory.png";
import hospital from "../images/hospital.jpg";
import patient from "../images/patient.jpg";

import { Link } from "react-router-dom";

export default function adminHomepage() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Image src={datacenter} fluid className="my-4" />
          </div>
          {/* <div className="col-lg-6">
                        <Image src={adminbgright} fluid className="my-4" />
                    </div> */}
        </div>
      </div>

      <div className="container">
        <div className="row" align="center">
          <div className="col-lg-4 col-md-4 col-xs-12 my-4">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={admin} />
              <Card.Body>
                <Card.Title>Admin Functionalities</Card.Title>

                <Link to="/admins">
                  <Button variant="primary">Explore</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>

          <div className="col-lg-4 col-md-4 col-xs-12 my-4">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={hospital} />
              <Card.Body>
                <Card.Title>Hospital Functionalities</Card.Title>

                <Link to="/hospitals">
                  <Button variant="primary">Explore</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>

          <div className="col-lg-4 col-md-4 col-xs-12 my-4">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={patient} />
              <Card.Body>
                <Card.Title>Patient Functionalities</Card.Title>
                <Card.Text></Card.Text>
                <Link to="/patients">
                  <Button variant="primary">Explore</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
