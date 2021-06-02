import React, { useEffect, useState } from "react";
import randomColor from "randomcolor";

// javascipt plugin for creating charts
// react plugin used to create charts
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
// @material-ui/core components
import red from "@material-ui/core/colors/red";
// core components
import CardShow from "../Cards/CardShow";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// core components

import { blue, green, lime, purple, yellow } from "@material-ui/core/colors";
import { UserService } from "../../service/userservice/UserService.js";
import axios from "axios";
import { DeathService } from "../../service/deathservice/DeathService.js";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

function Charts(props) {
  let userService = new UserService();

  const [activeNav, setActiveNav] = React.useState(1);
  const [recoveredArray, setRecoveredArray] = useState([]);
  const [activeArray, setActiveArray] = useState([]);
  const [deathArray, setDeathArray] = useState([]);
  const [confirmedArray, setConfirmedArray] = useState([]);
  const [cardTitle, setCardTitle] = useState([]);
  const [cardFooter, setCardFooter] = useState([]);
  const [records, setRecords] = useState([[], [], [], []]);
  const [label, setLabel] = useState([[], [], [], []]);
  const [colors, setColors] = useState([[], [], [], []]);
  // const [index, setIndex] = useState(0);

  // start
  function setInfo() {
    label[1] = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    colors[1] = [
      "#003f5c",
      "#4D4D4D",
      "#5DA5DA",
      "#FAA43A",
      "#60BD68",
      "#F17CB0",
      "#B2912F",
      "#B276B2",
      "#DECF3F",
      "#F15854",
      "#665191",
      "#d45087",
    ];

    label[3] = ["Below 18", "18 to 30", "30 to 50", "50 & Above"];
    colors[3] = [blue[300], red[300], purple[300], green[300]];
    label[4] = ["Male", "Female"];
    colors[4] = [blue[300], green[300]];
    setLabel(label);
    setColors(colors);
  }
  const chart = async () => {
    try {
      const zoneData = await (
        await userService.findTotalDataBasedOnZone()
      ).data;

      records[2] = [];
      label[2] = [];

      for (const dataObj of Object.values(zoneData)) {
        records[2].push(dataObj["death"]);
        cardTitle.push(Object.values(dataObj));
      }
      setCardTitle(cardTitle);

      for (const dataObj of Object.keys(zoneData)) {
        label[2].push(dataObj);
        colors[2].push(randomColor());
        cardFooter.push(dataObj);
      }
      setCardFooter(cardFooter);
      setLabel(label);

      setInfo();

      let deathService = new DeathService();
      records[1] = await deathService.findAllMonthWiseDeath();
      records[3] = await deathService.findAllAgeWiseDeath();
      records[4] = await deathService.findAllGenderWiseDeath();
      setRecords(records);
      const totalConfirmedCases = await (
        await userService.findTotalCases()
      ).data;
      const totalActiveCases = await (
        await userService.findTotalPatientInIsolation()
      ).data;
      const totalDeathCases = await (await userService.findTotalDeath()).data;
      const totalRecoveredCases = await (
        await userService.findTotalRecoveredCases()
      ).data;

      const data = await (
        await axios.get(
          `http://localhost:9090/CovidTracker.com/status/totalDataBasedOnMonth`,
          {
            params: {
              startMonth: 1,
              endMonth: 12,
            },
          }
        )
      ).data;
      for (const dataObj of Object.values(data)) {
        setConfirmedArray([...confirmedArray, dataObj["confirmed"]]);
        setRecoveredArray([...recoveredArray, dataObj["recovered"]]);
        setDeathArray([...deathArray, dataObj["death"]]);
        setActiveArray([...activeArray, dataObj["active"]]);
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    chart();
    setActiveNav(1);
  }, []);

  const toggleNavs = (index) => {
    setActiveNav(index);
  };
  return (
    <>
      <Container maxWidth={false} component={Box}>
        <div>
          <CardShow cardFooter={cardFooter} cardTitle={cardTitle} />
        </div>
      </Container>
      {/* Page content */}
      <Container maxWidth={false} component={Box} marginY="20px">
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            lg={6}
            component={Box}
            marginBottom="0.5rem!important"
            marginTop="0.5rem!important"
          >
            <Card elevation={5}>
              <CardContent>
                <Box position="relative" height="350px">
                  <Doughnut
                    data={{
                      labels: ["Active", "Dead", "Recovered"],
                      datasets: [
                        {
                          data: [
                            activeArray[activeArray.length - 1],
                            deathArray[deathArray.length - 1],
                            recoveredArray[recoveredArray.length - 1],
                          ],
                          label: "Confirmed Cases",
                          borderColor: [lime[500], red[500], green[500]],
                          backgroundColor: [lime[200], red[200], green[200]],
                        },
                      ],
                    }}
                    options={{
                      title: {
                        display: true,
                        text: `Total Cases Distribution
                                Total Cases: ${
                                  confirmedArray[confirmedArray.length - 1]
                                }`,
                      },
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            component={Box}
            marginBottom="0.5rem!important"
            marginTop="0.5rem!important"
          >
            <Card elevation={5}>
              <CardContent>
                <Box position="relative" height="350px">
                  <Bar
                    data={{
                      labels: [
                        "Jan",
                        "Feb",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                      datasets: [
                        {
                          data: deathArray,
                          label: "Increase In Death",
                          borderColor: red[300],
                          backgroundColor: red[300],
                          fill: true,
                        },
                      ],
                    }}
                    options={{
                      title: {
                        display: true,
                        text: "Monthly rise of Death Cases",
                      },
                      animations: {
                        tension: {
                          duration: 1000,
                          easing: "linear",
                          from: 1,
                          to: 1,
                          loop: true,
                        },
                      },
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        yAxes: [
                          {
                            ticks: {
                              callback: function (value) {
                                if (value >= 1000) {
                                  return `${value / 1000}k`;
                                } else {
                                  return value;
                                }
                              },
                              beginAtZero: true,
                            },
                          },
                        ],
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            component={Box}
            marginBottom="0.5rem!important"
            marginTop="0.5rem!important"
            // spacing={2}
          >
            <Card elevation={5}>
              <CardHeader></CardHeader>
              <CardContent>
                <Box position="relative" height="350px">
                  <Line
                    data={{
                      labels: [
                        "Jan",
                        "Feb",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                      datasets: [
                        {
                          data: confirmedArray,
                          label: "Total Cases",
                          fill: true,
                          lineTension: 0.3,
                          backgroundColor: "rgba(184, 185, 210, .3)",
                          borderColor: "rgb(35, 26, 136)",
                          borderCapStyle: "butt",
                          borderDash: [],
                          borderDashOffset: 0.0,
                          borderJoinStyle: "miter",
                          pointBorderColor: "rgb(35, 26, 136)",
                          pointBackgroundColor: "rgb(255, 255, 255)",
                          pointBorderWidth: 10,
                          pointHoverRadius: 5,
                          pointHoverBorderWidth: 2,
                          pointRadius: 1,
                          pointHitRadius: 10,
                        },
                        {
                          data: activeArray,
                          label: "Total Active Cases",
                          borderColor: lime[400],
                          fill: true,
                          backgroundColor: "rgba(210, 190, 170, .3)",
                          borderCapStyle: "butt",
                          borderDash: [],
                          lineTension: 0.3,

                          borderDashOffset: 0.0,
                          borderJoinStyle: "miter",
                          pointBorderColor: lime[400],
                          pointBackgroundColor: "rgb(255, 255, 255)",
                          pointBorderWidth: 10,
                          pointHoverRadius: 5,
                          pointHoverBorderWidth: 2,
                          pointRadius: 1,
                          pointHitRadius: 10,
                        },
                        {
                          data: deathArray,
                          label: "Total Deceased Cases",
                          borderColor: red[400],
                          backgroundColor: "rgba(210, 180, 180, .3)",
                          fill: true,
                          borderCapStyle: "butt",
                          borderDash: [],
                          borderDashOffset: 0.0,
                          borderJoinStyle: "miter",
                          lineTension: 0.3,

                          pointBorderColor: red[490],
                          pointBackgroundColor: "rgb(255, 255, 255)",
                          pointBorderWidth: 10,
                          pointHoverRadius: 5,
                          pointHoverBorderWidth: 2,
                          pointRadius: 1,
                          pointHitRadius: 10,
                        },
                        {
                          data: recoveredArray,
                          label: "Total Recovered Cases",
                          borderColor: green[400],

                          backgroundColor: "rgba(170, 170, 220, .3)",
                          fill: true,
                          borderCapStyle: "butt",
                          borderDash: [],
                          borderDashOffset: 0.0,
                          borderJoinStyle: "miter",
                          pointBorderColor: green[400],
                          pointBackgroundColor: "rgb(255, 255, 255)",
                          pointBorderWidth: 10,
                          pointHoverRadius: 5,
                          pointHoverBorderWidth: 2,
                          pointRadius: 1,
                          pointHitRadius: 10,
                        },
                      ],
                    }}
                    options={{
                      title: {
                        display: true,
                        text: "Covid Graph",
                      },
                      responsive: true,
                      animations: {
                        tension: {
                          duration: 1000,
                          easing: "linear",
                          from: 1,
                          to: 1,
                          loop: true,
                        },
                      },
                      maintainAspectRatio: false,
                    }}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            // spacing={2}
            component={Box}
            marginBottom="0.5rem!important"
            marginTop="0.5rem!important"
          >
            <Card elevation={5}>
              <CardContent>
                <Grid item xs="auto">
                  <Box>
                    <ToggleButtonGroup
                      name="value"
                      type="radio"
                      value={activeNav}
                      onChange={(e) => setActiveNav(e)}
                    >
                      <ToggleButton value={1}>Monthly</ToggleButton>
                      <ToggleButton value={2}>Zone</ToggleButton>
                      <ToggleButton value={3}>Age</ToggleButton>
                      <ToggleButton value={4}>Gender</ToggleButton>
                    </ToggleButtonGroup>
                  </Box>
                </Grid>
                <Box position="relative" height="350px">
                  <Pie
                    data={{
                      labels: label[activeNav],
                      datasets: [
                        {
                          data: records[activeNav],
                          label: "Total Cases",
                          borderColor: colors[activeNav],
                          backgroundColor: colors[activeNav],
                          fill: false,
                        },
                      ],
                    }}
                    options={{
                      legend: false,
                      title: {
                        text: "Division By Death Cases:",
                        display: true,
                      },
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Charts;
