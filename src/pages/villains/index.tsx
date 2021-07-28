import React, { Component } from "react";
import { connect, MapDispatchToProps } from "react-redux";
import { RootState } from "src/store";
import {
  addVillain,
  fetchVillains,
  removeVillain,
  softDeleteVillain,
} from "src/features/villains/villainActions";
import { IVillainModel } from "src/models/client/villainModel";
import { createStyles, makeStyles, withStyles } from "@material-ui/styles";

interface IState {
  counter: string;
}

interface IProps {
  villains: IVillainModel[];
  fetchVillains: () => Promise<void>;
  removeVillain: (id: string) => Promise<void>;
  addVillain: (values: IVillainModel) => Promise<void>;
  softDeleteVillain: (id: string) => Promise<void>;
}

export class VillainsPage extends Component<IProps, IState> {
  async componentDidMount(): Promise<void> {
    await this.props.fetchVillains();
  }

  render() {
    return (
      <div>
        {this.props.villains?.map((villain) => (
          <h1 key={villain.id}>{villain.firstName}</h1>
        ))}
      </div>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  return { ...state };
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

const styles = (theme) => ({
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
