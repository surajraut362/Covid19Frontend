import React from "react";
import { Button, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import admin from "../images/admincategory.png";
import datacenter from "../images/datacenterroom.jpg";
import hospital from "../images/hospital.jpg";
import patient from "../images/patient.jpg";

export default function AdminHomepage() {
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

                <Link to="/admin">
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

                <Link to="/hospital">
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
                <Link to="/patient">
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
