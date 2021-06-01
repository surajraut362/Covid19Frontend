import React, { useEffect, useState } from "react";
import randomColor from "randomcolor";

// javascipt plugin for creating charts
// react plugin used to create charts
import { Line, Bar, Pie } from "react-chartjs-2";
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
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
// core components

import { blue, green, lime, purple } from "@material-ui/core/colors";
import { UserService } from "../../service/userservice/UserService.js";
import axios from "axios";
import { DeathService } from "../../service/deathservice/DeathService.js";

function Charts(props) {
  const [activeNav, setActiveNav] = React.useState(1);
  let userService = new UserService();
  const [cases, setCases] = useState({});
  const [records, setRecords] = useState([[], [], [], []]);
  const [recoveredArray, setRecoveredArray] = useState([]);
  const [activeArray, setActiveArray] = useState([]);
  const [deathArray, setDeathArray] = useState([]);
  const [confirmedArray, setConfirmedArray] = useState([]);
  const [cardTitle, setCardTitle] = useState([]);
  const [cardFooter, setCardFooter] = useState([]);

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
      setCases({
        totalConfirmedCases,
        totalActiveCases,
        totalDeathCases,
        totalRecoveredCases,
      });

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
      <Container maxWidth={false} component={Box} marginTop="10px">
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            lg={6}
            component={Box}
            marginBottom="3rem!important"
          >
            <Card elevation={5}>
              {/* <CardHeader
                subheader={
                  <Grid
                    container
                    component={Box}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item xs="auto">
                      <Box
                        component={Typography}
                        variant="h6"
                        letterSpacing=".0625rem"
                        marginBottom=".25rem!important"
                      >
                        <Box component="span">Case:</Box>
                      </Box>
                      <Box
                        component={Typography}
                        variant="h4"
                        marginBottom="0!important"
                      >
                        <Box component="span">Covid Cases graph</Box>
                      </Box>
                    </Grid>
                  </Grid>
                }
              ></CardHeader> */}
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
                          label: "Confirmed Cases",
                          borderColor: blue[300],
                          backgroundColor: blue[300],
                          fill: false,
                        },
                      ],
                    }}
                    options={{
                      title: {
                        display: true,
                        text: "Monthly Rise of Cases:",
                      },
                      responsive: true,
                      animations: {
                        tension: {
                          duration: 10000000,
                          easing: "linear",
                          from: 1,
                          to: 1,
                          loop: true,
                        },
                      },
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          min: 0,
                          max: 100,
                        },
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
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6} className=" mb-0 mt-0">
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
            marginBottom="3rem!important"
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
                          pointHoverBackgroundColor: "rgb(0, 0, 0)",
                          pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                          pointHoverBorderWidth: 2,
                          pointRadius: 1,
                          pointHitRadius: 10,
                        },
                        {
                          data: activeArray,
                          label: "Total Active Cases",
                          borderColor: lime[300],
                          fill: false,
                          backgroundColor: lime[300],
                        },
                        {
                          data: deathArray,
                          label: "Total Deceased Cases",
                          borderColor: red[300],
                          fill: false,
                          backgroundColor: red[300],
                        },
                        {
                          data: recoveredArray,
                          label: "Total Recovered Cases",
                          borderColor: green[300],
                          fill: false,
                          backgroundColor: green[300],
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
            component={Box}
            marginBottom="3rem!important"
          >
            <Card elevation={5}>
              <Grid item xs="auto">
                <CardHeader></CardHeader>
                <Box>
                  {/* <ToggleButtonGroup
                    value={activeNav}
                    size="small"
                    onChange={(e, value) => {
                      if (value !== null) setActiveNav(value);
                    }}
                    aria-label="text alignment"
                    className=""
                  >
                    <ToggleButton value={1} aria-label="left aligned">
                      {/* <FormatAlignLeftIcon /> Monthly
                   */}
                </Box>
              </Grid>

              <CardContent>
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

                      maintainAspectRatio: true,
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
