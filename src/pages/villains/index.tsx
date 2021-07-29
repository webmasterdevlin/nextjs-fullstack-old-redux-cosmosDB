import React, { Component } from "react";
import { connect, MapDispatchToProps } from "react-redux";
import { RootState } from "src/store";
import {
  addVillain,
  fetchVillains,
  removeVillain,
  softDeleteVillain,
} from "src/features/villains/villainActions";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import { Theme } from "@material-ui/core";

import { IVillainModel } from "src/models/villainModel";
import Layout from "src/components/Layout";
import TitleBar from "src/components/TitleBar";
import FormSubmission from "src/components/FormSubmission";
import UpdateUiLabel from "src/components/UpdateUiLabel";
import { IVillainState } from "src/features/villains/villainTypes";

/*local state's shape*/
interface IState {
  counter: string;
}

/*props' shape*/
interface IProps {
  classes: any;
  villainStore: IVillainState;
  fetchVillains: () => Promise<void>;
  removeVillain: (id: string) => Promise<void>;
  addVillain: (values: IVillainModel) => Promise<void>;
  softDeleteVillain: (id: string) => Promise<void>;
}
/* You can't use React Hooks in Class based components */
export class VillainsPage extends Component<IProps, IState> {
  /*local state*/
  state = {
    counter: "0",
  };

  async componentDidMount(): Promise<void> {
    await this.props.fetchVillains();
  }

  render() {
    const { villains, loading } = this.props.villainStore;

    return (
      <Layout title={"Next Old Redux + TypeOrm - Villains Page"}>
        <TitleBar title={"Super Villains Page"} />
        <FormSubmission handleCreateAction={this.props.addVillain} />
        <UpdateUiLabel />
        <>
          {loading ? (
            <Typography data-testid={"loading"} variant={"h2"}>
              Loading.. Please wait..
            </Typography>
          ) : (
            villains?.map((v) => (
              <Box
                key={v.id}
                mb={2}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                data-testid={"card"}
              >
                <Typography>
                  <span>{`${v.firstName} ${v.lastName} is ${v.knownAs}`}</span>
                  {this.state.counter === v.id && <span> - marked</span>}
                </Typography>
                <div>
                  <Button
                    className={this.props.classes.button}
                    onClick={() => {
                      this.setState({ counter: v.id });
                    }}
                    variant={"contained"}
                    color={"default"}
                    data-testid={"mark-button"}
                  >
                    Mark
                  </Button>{" "}
                  <Button
                    className={this.props.classes.button}
                    onClick={() => this.props.softDeleteVillain(v.id)}
                    variant={"contained"}
                    color={"secondary"}
                    data-testid={"remove-button"}
                  >
                    Remove
                  </Button>{" "}
                  <Button
                    className={this.props.classes.button}
                    onClick={async () => await this.props.removeVillain(v.id)}
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
        {villains.length === 0 && !loading && (
          <Button
            data-testid={"refetch-button"}
            onClick={this.props.fetchVillains}
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
    villainStore: state.villainStore,
  };
};

const mapDispatchToProps = (dispatch: MapDispatchToProps<any, any>) => {
  return {
    fetchVillains: async () => await dispatch(fetchVillains()),
    removeVillain: async (id: string) => await dispatch(removeVillain(id)),
    addVillain: async (values: IVillainModel) =>
      await dispatch(addVillain(values)),
    softDeleteVillain: (id: string) => dispatch(softDeleteVillain(id)),
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
  connect(mapStateToProps, mapDispatchToProps)(VillainsPage)
);
