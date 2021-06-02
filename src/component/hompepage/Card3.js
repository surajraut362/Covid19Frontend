import React from "react";
import doctors from "../images/doctors.png";
import { Card, Button } from "react-bootstrap";

export default function Mycards3() {
  return (
    <div style={{ backgroundColor: "#FCF3CF" }}>
      <Card
        style={{
          width: "18rem",
          height: "20rem",
          backgroundColor: "lightyellow",
        }}
      >
        <Card.Img variant="top" src={doctors} />
        <Card.Body>
          <Card.Text>
            Explore with us the available hospitals and Speciality centers
          </Card.Text>
          <Button variant="warning" size="sm">
            {" "}
            <a
              style={{ textDecoration: "none" }}
              href="https://www.apollo247.com/specialties"
              className="telegram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <b style={{ color: "black" }}>Explore</b>
            </a>
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
