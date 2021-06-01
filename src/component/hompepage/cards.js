import React from "react";
import { Card, Button } from "react-bootstrap";
import nurse from "../images/nurse.png";
import "../hompepage/style.css";
export default function Mycards() {
  return (
    <div>
      <Card style={{ width: "18rem", backgroundColor: "lightgreen" }}>
        <Card.Img variant="top" src={nurse} fluid />
        <Card.Body>
          <Card.Text>
            Get the help-line numbers of each city for Medical Assistance
          </Card.Text>
          <Button variant="warning" size="sm">
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
