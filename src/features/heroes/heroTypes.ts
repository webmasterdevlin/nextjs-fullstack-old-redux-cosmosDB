import { IHeroModel } from "src/models/heroModel";

export interface IHeroState {
  readonly heroes: IHeroModel[];
  readonly hero: IHeroModel;
  readonly loading: boolean;
}

export type ApiResponse = Record<string, any>;

export const heroNamespace = "hero";

/* action types */
export const HeroActionTypes = {
  FETCH_HEROES_REQUEST: `${heroNamespace}/FETCH_HEROES_REQUEST`,
  FETCH_HEROES_SUCCESS: `${heroNamespace}/FETCH_HEROES_SUCCESS`,
  FETCH_HEROES_FAIL: `${heroNamespace}/FETCH_HEROES_FAIL`,

  REMOVE_HERO_REQUEST: `${heroNamespace}/REMOVE_HERO_REQUEST`,
  REMOVE_HERO_SUCCESS: `${heroNamespace}/REMOVE_HERO_SUCCESS`,
  REMOVE_HERO_FAIL: `${heroNamespace}/REMOVE_HERO_FAIL`,

  ADD_HERO_REQUEST: `${heroNamespace}/ADD_HERO_REQUEST`,
  ADD_HERO_SUCCESS: `${heroNamespace}/ADD_HERO_SUCCESS`,
  ADD_HERO_FAIL: `${heroNamespace}/ADD_HERO_FAIL`,

  UPDATE_HERO_REQUEST: `${heroNamespace}/UPDATE_HERO_REQUEST`,
  UPDATE_HERO_SUCCESS: `${heroNamespace}/UPDATE_HERO_SUCCESS`,
  UPDATE_HERO_FAIL: `${heroNamespace}/UPDATE_HERO_FAIL`,

  SOFT_DELETE_HERO: `${heroNamespace}/SOFT_DELETE`,
};
