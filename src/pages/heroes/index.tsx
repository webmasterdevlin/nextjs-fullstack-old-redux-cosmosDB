import React, { Component } from "react";
import { connect, DispatchProp, MapDispatchToProps } from "react-redux";
import { RootState } from "src/store";
import {
  addHero,
  fetchHeroes,
  removeHero,
  softDeleteHero,
} from "src/features/heroes/heroActions";
import { IHeroModel } from "src/models/client/heroModel";

interface IState {}

interface IProps {
  heroes: IHeroModel[];
  fetchHeroes: () => Promise<void>;
  removeHero: (id: string) => Promise<void>;
  addHero: (values: IHeroModel) => Promise<void>;
  softDeleteHero: (id: string) => Promise<void>;
}

export class HeroesPage extends Component<IProps, IState> {
  render() {
    return <div>{this.props.heroes}</div>;
  }
}
const mapStateToProps = (state: RootState) => {
  return state.hero;
};

const mapDispatchToProps = (dispatch: MapDispatchToProps<any, any>) => {
  return {
    fetchHeroes: async () => await dispatch(fetchHeroes()),
    removeHero: async (id: string) => await dispatch(removeHero(id)),
    addHero: async (values: IHeroModel) => await dispatch(addHero(values)),
    softDeleteHero: (id: string) => dispatch(softDeleteHero(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeroesPage);
