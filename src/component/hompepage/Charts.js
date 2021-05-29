import React, { useEffect, useState } from "react";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar, Pie } from "react-chartjs-2";
// @material-ui/core components
import EmojiEvents from "@material-ui/icons/EmojiEvents";
import GroupAdd from "@material-ui/icons/GroupAdd";
import InsertChartOutlined from "@material-ui/icons/InsertChartOutlined";
import PieChart from "@material-ui/icons/PieChart";
import amber from "@material-ui/core/colors/amber";
import red from "@material-ui/core/colors/red";
// core components
import CardStats from "../Cards/CardStats.js";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";

// core components

import { blue, green, lime, purple, yellow } from "@material-ui/core/colors";
import { UserService } from "../../service/userservice/UserService.js";
import axios from "axios";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { DeathService } from "../../service/deathservice/DeathService.js";
function Charts(props) {
  const [activeNav, setActiveNav] = React.useState(1);
  let userService = new UserService();
  const [cases, setCases] = useState({});
  const [records, setRecords] = useState([]);
  const [recoveredArray, setRecoveredArray] = useState([]);
  const [activeArray, setActiveArray] = useState([]);
  const [deathArray, setDeathArray] = useState([]);
  const [confirmedArray, setConfirmedArray] = useState([]);
  const [data, setData] = useState([]);
  const [label, setLabel] = useState([]);
  const [colors, setColors] = useState([]);

  // start
  const chart = async () => {
    try {
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
      // alert(JSON.stringify(data));
      for (const dataObj of Object.values(data)) {
        // empSal.push(parseInt(dataObj.employee_salary));
        // empAge.push(parseInt(dataObj.employee_age));
        setConfirmedArray([...confirmedArray, dataObj["confirmed"]]);
        setRecoveredArray([...recoveredArray, dataObj["recovered"]]);
        setDeathArray([...deathArray, dataObj["death"]]);
        setActiveArray([...activeArray, dataObj["active"]]);
      }
      // const zoneData = await (
      //   await userService.findTotalDataBasedOnZone()
      // ).data;
      let deathService = new DeathService();
      let ageWise = [];

      ageWise.push(
        await (
          await deathService.findtotalAgeWiseDeath(1, 17)
        ).data
      );
      alert(JSON.stringify(ageWise));

      ageWise.push(
        await (
          await deathService.findtotalAgeWiseDeath(18, 30)
        ).data
      );
      ageWise.push(
        await (
          await deathService.findtotalAgeWiseDeath(30, 50)
        ).data
      );
      ageWise.push(
        await (
          await deathService.findtotalAgeWiseDeath(50, 1000)
        ).data
      );
      records[3] = ageWise;
      setRecords(records);
      alert(JSON.stringify(records));
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    chart();
  }, []);

  const toggleNavs = (index) => {
    setActiveNav(index);
    if (activeNav == 3) {
      setLabel(["Below 18", "18 to 30", "30 to 50", "50 & Above"]);
      setColors([blue[300], red[300], purple[300], green[300]]);
    }
  };
  return (
    <>
      <Container maxWidth={false} component={Box}>
        <div>
          <Grid container spacing={2}>
            <Grid item lg={3} xs={12}>
              <CardStats
                subtitle="Confirmed"
                title={cases.totalConfirmedCases}
                icon={InsertChartOutlined}
                color={blue[400]}
              />
            </Grid>
            <Grid item lg={3} xs={12}>
              <CardStats
                subtitle="Active"
                title={cases.totalActiveCases}
                icon={PieChart}
                color={lime[600]}
              />
            </Grid>
            <Grid item lg={3} xs={12}>
              <CardStats
                subtitle="Deceased"
                title={cases.totalDeathCases}
                icon={PieChart}
                color={red[400]}
              />
            </Grid>
            <Grid item lg={3} xs={12}>
              <CardStats
                subtitle="Recovered"
                title={cases.totalRecoveredCases}
                icon={PieChart}
                color={green[400]}
              />
            </Grid>
          </Grid>
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
              <CardHeader
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
              ></CardHeader>
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
                          borderColor: blue[300],
                          fill: false,
                        },
                      ],
                    }}
                    options={{
                      title: {
                        display: true,
                        text: "Confirmed Cases",
                      },
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
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6} className=" mb-0 mt-0">
            <Card elevation={5}>
              <CardHeader
                title={
                  <Box
                    component="span"
                    //   color={theme.palette.gray[600]}
                  >
                    Death Case Rise
                  </Box>
                }
                subheader="Total deaths per Month"
                titleTypographyProps={{
                  component: Box,
                  variant: "h6",
                  letterSpacing: ".0625rem",
                  marginBottom: ".25rem!important",
                }}
                subheaderTypographyProps={{
                  component: Box,
                  variant: "h4",
                  marginBottom: "0!important",
                  color: "initial",
                }}
              ></CardHeader>
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
                          data: confirmedArray,
                          label: "Total Cases",
                          borderColor: green[300],
                          backgroundColor: green[300],
                          fill: false,
                        },
                      ],
                    }}
                    options={{
                      title: {
                        display: true,
                        text: "",
                      },
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
              <CardHeader
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
                        <Box component="span">Total Cases</Box>
                      </Box>
                      <Box
                        component={Typography}
                        variant="h2"
                        marginBottom="0!important"
                      >
                        <Box component="span"></Box>
                      </Box>
                    </Grid>
                    {/* <Grid item xs="auto">
                      <Box
                        justifyContent="flex-end"
                        display="flex"
                        flexWrap="wrap"
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          component={Box}
                          marginRight="1rem!important"
                          onClick={() => toggleNavs(1)}
                        >
                          Month
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => toggleNavs(2)}
                        >
                          Week
                        </Button>
                      </Box> 
                    </Grid>*/}
                  </Grid>
                }
              ></CardHeader>
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
                          borderColor: blue[300],
                          fill: false,
                        },
                        {
                          data: activeArray,
                          label: "Total Active Cases",
                          borderColor: lime[300],
                          fill: false,
                        },
                        {
                          data: deathArray,
                          label: "Total Deceased Cases",
                          borderColor: red[300],
                          fill: false,
                        },
                        {
                          data: recoveredArray,
                          label: "Total Recovered Cases",
                          borderColor: green[300],
                          fill: false,
                        },
                        // {
                        //   data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
                        //   label: "North America",
                        //   borderColor: "#c45850",
                        //   fill: false,
                        // },
                      ],
                    }}
                    options={{
                      title: {
                        display: true,
                        text: "Covid Graph",
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
              <CardHeader
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
                        <Box component="span">DeathCases:</Box>
                      </Box>
                      <Box
                        component={Typography}
                        variant="h2"
                        marginBottom="0!important"
                      >
                        <Box component="span"></Box>
                      </Box>
                    </Grid>
                    <Grid item xs="auto">
                      <Box
                        justifyContent="flex-end"
                        display="flex"
                        flexWrap="wrap"
                      >
                        <RadioGroup
                          row
                          aria-label="position"
                          name="position"
                          value={activeNav}
                          onChange={(e) => toggleNavs(e.target.value)}
                        >
                          <FormControlLabel
                            value="1"
                            control={<Radio color="primary" />}
                            label="Monthly"
                            labelPlacement="right"
                          />
                          <FormControlLabel
                            value="2"
                            control={<Radio color="primary" />}
                            label="Zone"
                            labelPlacement="right"
                          />
                          <FormControlLabel
                            value="3"
                            control={<Radio color="primary" />}
                            label="Age"
                            labelPlacement="right"
                          />
                          <FormControlLabel
                            value="4"
                            control={<Radio color="primary" />}
                            label="Gender"
                            labelPlacement="right"
                          />
                        </RadioGroup>
                      </Box>
                    </Grid>
                  </Grid>
                }
              ></CardHeader>
              <CardContent>
                <Box position="relative" height="334px">
                  <Pie
                    data={{
                      labels: label,
                      datasets: [
                        {
                          data: records[activeNav],
                          label: "Total Cases",
                          backgroundColor: colors,
                          fill: false,
                        },

                        // {
                        //   data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
                        //   label: "North America",
                        //   borderColor: "#c45850",
                        //   fill: false,
                        // },
                      ],
                    }}
                    options={{
                      title: {
                        display: true,
                        text: "Covid Graph",
                      },
                      maintainAspectRatio: false,
                    }}
                    getDatasetAtEvent={(e) => console.log(e)}
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
