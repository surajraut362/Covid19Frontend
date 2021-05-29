import React, { Component } from "react";
import { Carousel, Container, Image } from "react-bootstrap";
// import * as Icon from 'react-bootstrap-icons';
import {
  Navbar,
  Nav,
  NavLink,
  Button,
  Card,
  Jumbotron,
  Tab,
  Tabs,
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import img2 from "../images/covid2.jpg";
import img3 from "../images/covid3.png";
import heroes from "../images/heroes.png";
import vaccine from "../images/togetherwefight1.png";
import HeaderSideMenuFooter from "./HeaderSideMenu";
import { Footer } from "./Footer";
import IconUI from "@material-ui/core/Icon";
import { colors } from "@material-ui/core";
import Mycards from "./cards";
import Mycards2 from "./cards2";
import Mycards3 from "./cards3";
import Charts from "./Charts";

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <div className="my-4">
          {/* Body container */}
          <div>
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-xs-12">
                  <Carousel fade>
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={img2}
                        alt="Second slide"
                      />

                      <Carousel.Caption></Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      {/* <a href="https://studentzone-ngasce.nmims.edu/studentportal/"  target="_blank"> */}
                      <img
                        className="d-block w-100"
                        src={img3}
                        alt="Third slide"
                      />
                      {/* </a> */}

                      <Carousel.Caption></Carousel.Caption>
                    </Carousel.Item>
                  </Carousel>
                </div>

                <div className="col-lg-6 col-md-6 col-xs-12 ml=auto">
                  <Image src={vaccine} fluid />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <Charts />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8 col-xs-12" align="center">
              <h5 id="articleheadin" className="mb-4">
                Articles related to our <b>Life Savers</b>
              </h5>
              <Jumbotron style={{ backgroundColor: "lightblue" }}>
                <h3>
                  Thank You Coronavirus Helpers! Some Heroes Don’t Wear Capes.
                </h3>
                <p>
                  Are you tired of all the negative stories from the Covid-19
                  pandemic? If so, we understand! In 2020, Covid-19 brought the
                  world to a screeching stop. Cities that never slept before
                  were now bearing witness to deserted streets and parks! But
                  amidst all the pandemic’s fear and confusion, some sparks of
                  joy and humanity continued to burn bright. Countless selfless
                  individuals and organizations took the time to go out and help
                  those stranded away from home or in need of food, shelter,
                  masks, and hand sanitizers. These men and women, some of the
                  truest heroes of our times, wore no capes. Instead, they came
                  in all shapes, sizes, scrubs, t-shirts, and whatnot! To them,
                  we say thank you, coronavirus helpers! Once again, they have
                  proven that humanity shall prevail. And to honour the actions
                  of such individuals and organizations, let us, for a few
                  minutes, forget all about the negativity that this pandemic
                  has brought. Instead, we’ll look at the positive outcomes of
                  the Covid-19 pandemic. Now, if you’re all set, let’s begin!
                </p>
                <p align="center">
                  <Button variant="warning" size="sm">
                    {" "}
                    <a
                      style={{ textDecoration: "none" }}
                      href="https://surveysparrow.com/blog/thanking-coronavirus-helpers-positive-impacts-of-covid/"
                      className="telegram"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <b style={{ color: "black" }}>Read More...</b>
                    </a>
                  </Button>
                </p>
              </Jumbotron>
            </div>

            <div className="col-lg-4 col-md-4 col-xs-12 " align="center">
              <h5 id="articleheading" className="mb-4" align="center">
                Important help <b>Web Links</b>
              </h5>
              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="ml-2"
              >
                <Tab eventKey="home" title="Saving Lives">
                  <Mycards3 />
                </Tab>
                <Tab eventKey="profile" title="Helping Hands" align="center">
                  <Mycards />
                </Tab>
                <Tab eventKey="contact" title="Vaccine" align="center">
                  <Mycards2 />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>

        {/* <div className="container my-4">
          <div className="row my-4">
          <Card className="mr-4"  style={{ width: '18rem' }} >
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
    </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>

          <Card className="mr-4" style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
    </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>

          <Card className="mr-4" style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
    </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          </div>
        </div> */}
        <Footer />
      </div>
    );
  }
}
