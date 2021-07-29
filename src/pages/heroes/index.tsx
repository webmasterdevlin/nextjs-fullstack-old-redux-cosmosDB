import React, { Component } from "react";
import { connect, MapDispatchToProps } from "react-redux";
import { RootState } from "src/store";
import {
  addHero,
  fetchHeroes,
  removeHero,
  softDeleteHero,
} from "src/features/heroes/heroActions";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import { Theme } from "@material-ui/core";

import { IHeroModel } from "src/models/client/heroModel";
import Layout from "src/components/Layout";
import TitleBar from "src/components/TitleBar";
import FormSubmission from "src/components/FormSubmission";
import UpdateUiLabel from "src/components/UpdateUiLabel";
import { IHeroState } from "src/features/heroes/heroTypes";

/*local state's shape*/
interface IState {
  counter: string;
}

/*props' shape*/
interface IProps {
  classes: any;
  heroStore: IHeroState;
  fetchHeroes: () => Promise<void>;
  removeHero: (id: string) => Promise<void>;
  addHero: (values: IHeroModel) => Promise<void>;
  softDeleteHero: (id: string) => Promise<void>;
}
/* You can't use React Hooks in Class based components */
export class HeroesPage extends Component<IProps, IState> {
  /*local state*/
  state = {
    counter: "0",
  };

  async componentDidMount(): Promise<void> {
    await this.props.fetchHeroes();
  }

  render() {
    const { heroes, loading } = this.props.heroStore;

    return (
      <Layout title={"Next Old Redux + TypeOrm - Heroes Page"}>
        <TitleBar title={"Super Heroes Page"} />
        <FormSubmission handleCreateAction={this.props.addHero} />
        <UpdateUiLabel />
        <>
          {loading ? (
            <Typography data-testid={"loading"} variant={"h2"}>
              Loading.. Please wait..
            </Typography>
          ) : (
            heroes?.map((h) => (
              <Box
                key={h.id}
                mb={2}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                data-testid={"card"}
              >
                <Typography>
                  <span>{`${h.firstName} ${h.lastName} is ${h.knownAs}`}</span>
                  {this.state.counter === h.id && <span> - marked</span>}
                </Typography>
                <div>
                  <Button
                    className={this.props.classes.button}
                    onClick={() => {
                      this.setState({ counter: h.id });
                    }}
                    variant={"contained"}
                    color={"default"}
                    data-testid={"mark-button"}
                  >
                    Mark
                  </Button>{" "}
                  <Button
                    className={this.props.classes.button}
                    onClick={() => this.props.softDeleteHero(h.id)}
                    variant={"contained"}
                    color={"secondary"}
                    data-testid={"remove-button"}
                  >
                    Remove
                  </Button>{" "}
                  <Button
                    className={this.props.classes.button}
                    onClick={async () => await this.props.removeHero(h.id)}
                    variant={"outlined"}
                    color={"primary"}
                    data-testid={"delete-button"}
                  >
                    DELETE in DB
                  </Button>
                </div>
              </Box>
            ))
          )}
        </>
        {heroes.length === 0 && !loading && (
          <Button
            data-testid={"refetch-button"}
            onClick={this.props.fetchHeroes}
            className={this.props.classes.button}
            variant={"contained"}
            color={"primary"}
          >
            Re-fetch
          </Button>
        )}
      </Layout>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  return {
    heroStore: state.heroStore,
  };
};

const mapDispatchToProps = (dispatch: MapDispatchToProps<any, any>) => {
  return {
    fetchHeroes: async () => await dispatch(fetchHeroes()),
    removeHero: async (id: string) => await dispatch(removeHero(id)),
    addHero: async (values: IHeroModel) => await dispatch(addHero(values)),
    softDeleteHero: (id: string) => dispatch(softDeleteHero(id)),
  };
};

const styles = (theme: Theme) => ({
  button: {
    margin: "0 0.5rem",
    "&:focus": {
      outline: "none",
    },
  },
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(HeroesPage)
);
