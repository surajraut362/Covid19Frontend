import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";

// core components

function CardStats({ subtitle, title, footer, icon, color }) {
  const theme = useTheme();
  return (
    <>
      <Card elevation={10} style={{ borderRadius: 10 }}>
        <CardContent>
          <Grid container component={Box} justifyContent="space-between">
            <Grid item xs="auto" style={{}}>
              <Box
                component={Typography}
                variant="h6"
                marginBottom="0!important"
                marginTop="0!important"
                color={blue[50]}
                color={color}
              >
                {subtitle}
              </Box>

              <Box
                component={Typography}
                variant="h4"
                fontWeight="600!important"
                marginBottom="0!important"
                marginTop="0!important"
                color={blue[50]}
                color={color}
              >
                {title}
              </Box>
            </Grid>
            <Grid item xs={"auto"}>
              <Box
                width="3rem"
                height="3rem"
                padding="12px"
                textAlign="center"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="50%"
                color={blue[50]}
                color={color}
              >
                {icon && typeof icon === "object" ? (
                  <Box
                    component={icon}
                    width="1.5rem!important"
                    height="1.5rem!important"
                    color={blue[50]}
                    color={color}
                  />
                ) : null}
                {icon && typeof icon === "string" ? (
                  <Box
                    component="i"
                    fontSize="1.25rem"
                    className={icon}
                    color={blue[50]}
                    color={color}
                  />
                ) : null}
              </Box>
            </Grid>
          </Grid>
          {footer ? (
            <Box
              component="p"
              fontSize=".875rem"
              marginTop="1rem"
              marginBottom="0"
              display="flex"
              alignItems="center"
              flexWrap="wrap"
            >
              {footer}
            </Box>
          ) : null}
        </CardContent>
      </Card>
    </>
  );
}

// CardStats.propTypes = {
//   subtitle: PropTypes.string,
//   title: PropTypes.string,
//   icon: PropTypes.oneOfType([
//     // i.e. an icon name from Nucleo Icons - e.g. ni ni-atom
//     // // or an icon name from Font Awesome - e.g. fa fa-heart
//     PropTypes.string,
//     // i.e. a component from @material-ui/icons
//     PropTypes.object,
//   ]),
// };

export default CardStats;
