import React from "react";
import { useSelector } from "react-redux";
import { AppBar, Box, createStyles, Link, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import TotalOfCharacters from "./TotalOfCharacters";

const NavigationBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" style={{ marginBottom: "2rem" }}>
      <Toolbar>
        <Box mr={4}>
          <Link href="/" className={classes.button} color="inherit">
            Home
          </Link>
        </Box>
        <Box mr={4}>
          <Link
            href="/heroes"
            className={classes.button}
            color="inherit"
            data-testid="nav-heroes"
          >
            Heroes
          </Link>
          {/*<TotalOfCharacters*/}
          {/*  collection={store.hero.heroes}*/}
          {/*  dataTestId={"total-heroes"}*/}
          {/*/>*/}
        </Box>
        <Box mr={4}>
          <Link
            href="/villains"
            className={classes.button}
            color="inherit"
            data-testid="nav-villains"
          >
            Villains
          </Link>
          {/*<TotalOfCharacters*/}
          {/* collection={store.villain.villains}*/}
          {/*  dataTestId={"total-villains"}*/}
          {/*/>*/}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      "&:hover": {
        textDecoration: "none",
      },
      "&:focus": {
        outline: "none",
      },
      margin: "0 0.5rem",
      fontWeight: "bold",
    },
  })
);
