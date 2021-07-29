import React, { Component } from "react";
import { connect, MapDispatchToProps } from "react-redux";

import { AppBar, Box, Link, Theme, Toolbar } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

import { fetchVillains } from "src/features/villains/villainActions";
import { fetchHeroes } from "src/features/heroes/heroActions";
import { IHeroState } from "src/features/heroes/heroTypes";
import { IVillainState } from "src/features/villains/villainTypes";
import { RootState } from "src/store";
import TotalOfCharacters from "./TotalOfCharacters";

/*local state's shape*/
interface IState {}

/*props' shape*/
interface IProps {
  classes: any;
  heroStore: IHeroState;
  villainStore: IVillainState;
  fetchVillains: () => Promise<void>;
  fetchHeroes: () => Promise<void>;
}

class NavigationBar extends Component<IProps, IState> {
  render() {
    const { classes, heroStore, villainStore } = this.props;
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
            <TotalOfCharacters
              collection={heroStore.heroes}
              dataTestId={"total-heroes"}
            />
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
            <TotalOfCharacters
              collection={villainStore.villains}
              dataTestId={"total-villains"}
            />
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    villainStore: state.villainStore,
    heroStore: state.heroStore,
  };
};

const mapDispatchToProps = (dispatch: MapDispatchToProps<any, any>) => {
  return {
    fetchHeroes: async () => await dispatch(fetchHeroes()),
    fetchVillains: async () => await dispatch(fetchVillains()),
  };
};

const styles: any = (theme: Theme) => ({
  button: {
    margin: "0 0.5rem",
    fontWeight: "bold",
    "&:hover": {
      textDecoration: "none",
    },
    "&:focus": {
      outline: "none",
    },
  },
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(NavigationBar)
);
