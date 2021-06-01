import CardStats from "./CardStats";
import MyLocationTwoToneIcon from "@material-ui/icons/MyLocationTwoTone";
import InsertChartOutlined from "@material-ui/icons/InsertChartOutlined";
import { blue, green, lime, red } from "@material-ui/core/colors";
import { PieChart, VectorPen } from "react-bootstrap-icons";
import Box from "@material-ui/core/Box";

import { Grid } from "@material-ui/core";
import React from "react";
import { ChatBubbleOutlined } from "@material-ui/icons";

class CardShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };

    // alert(JSON.stringify(props));
    this.makeTimer();
  }
  makeTimer() {
    setInterval(() => {
      if (this.state.index === this.props.cardFooter.length) {
        this.setState({ index: 0 });
        console.log(this.state.index);
      } else {
        this.setState((prev) => {
          return { index: prev.index + 1 };
        });
        console.log(this.state.index);
      }
    }, 3500);
  }
  render() {
    return (
      <Grid container spacing={2}>
        <Grid item lg={3} xs={12}>
          <CardStats
            subtitle="Confirmed"
            // title={cardTitle[index][3]}
            title={
              this.props.cardTitle[this.state.index] !== undefined
                ? this.props.cardTitle[this.state.index][3]
                : "..."
            }
            icon={InsertChartOutlined}
            color={blue[400]}
            footer={
              <>
                <Box
                  component="span"
                  fontSize=".875rem"
                  // color={theme.palette.success.main}
                  marginRight=".5rem"
                  display="flex"
                  alignItems="center"
                >
                  <Box
                    component={MyLocationTwoToneIcon}
                    width="1.5rem!important"
                    height="1.5rem!important"
                  />{" "}
                  {this.props.cardFooter[this.state.index]}
                </Box>
              </>
            }
          />
        </Grid>
        <Grid item lg={3} xs={12}>
          <CardStats
            subtitle="Active"
            // title="2"

            title={
              this.props.cardTitle[this.state.index] !== undefined
                ? this.props.cardTitle[this.state.index][1]
                : "..."
            }
            //  title={cardTitle[index][1]}
            icon={PieChart}
            color={lime[600]}
            footer={
              <>
                <Box
                  component="span"
                  fontSize=".875rem"
                  // color={theme.palette.success.main}
                  marginRight=".5rem"
                  display="flex"
                  alignItems="center"
                >
                  <Box
                    component={MyLocationTwoToneIcon}
                    width="1.5rem!important"
                    height="1.5rem!important"
                  />{" "}
                  {this.props.cardFooter[this.state.index]}
                </Box>
              </>
            }
          />
        </Grid>
        <Grid item lg={3} xs={12}>
          <CardStats
            subtitle="Deceased"
            // title={cardTitle[index][0]}
            title={
              this.props.cardTitle[this.state.index] !== undefined
                ? this.props.cardTitle[this.state.index][0]
                : "..."
            }
            icon={VectorPen}
            color={red[400]}
            footer={
              <>
                <Box
                  component="span"
                  fontSize=".875rem"
                  // color={theme.palette.success.main}
                  marginRight=".5rem"
                  display="flex"
                  alignItems="center"
                >
                  <Box
                    component={MyLocationTwoToneIcon}
                    width="1.5rem!important"
                    height="1.5rem!important"
                  />{" "}
                  {this.props.cardFooter[this.state.index]}
                </Box>
              </>
            }
          />
        </Grid>
        <Grid item lg={3} xs={12}>
          <CardStats
            subtitle="Recovered"
            // title={cardTitle[index][2]}
            title={
              this.props.cardTitle[this.state.index] !== undefined
                ? this.props.cardTitle[this.state.index][2]
                : "..."
            }
            icon={ChatBubbleOutlined}
            color={green[400]}
            footer={
              <>
                <Box
                  component="span"
                  fontSize=".875rem"
                  // color={theme.palette.success.main}
                  marginRight=".5rem"
                  display="flex"
                  alignItems="center"
                >
                  <Box
                    component={MyLocationTwoToneIcon}
                    width="1.5rem!important"
                    height="1.5rem!important"
                  />{" "}
                  {this.props.cardFooter[this.state.index]}
                </Box>
              </>
            }
          />
        </Grid>
      </Grid>
    );
  }
}
export default CardShow;
