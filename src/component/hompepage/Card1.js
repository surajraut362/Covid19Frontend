import React from "react";
import { Card, Button } from "react-bootstrap";
import nurse from "../images/nurse.png";
// import '../hompepage/style.css';
export default function Mycards() {
  return (
    <div style={{ backgroundColor: "#FCF3CF" }}>
      <Card
        style={{
          width: "18rem",
          height: "20rem",
          backgroundColor: "lightgreen",
        }}
      >
        <Card.Img variant="top" src={nurse} />
        <Card.Body>
          <Card.Text>
            Get the help-line numbers of each city for Medical Assistance
          </Card.Text>
          <Button variant="warning" size="sm" className="mb-4">
            {" "}
            <a
              style={{ textDecoration: "none" }}
              href="https://www.mohfw.gov.in/pdf/coronvavirushelplinenumber.pdf"
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
