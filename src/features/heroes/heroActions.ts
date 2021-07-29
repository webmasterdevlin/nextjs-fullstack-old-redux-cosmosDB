import { Dispatch, ActionCreator, Action } from "redux";
import { HeroActionTypes } from "./heroTypes";
import { ThunkAction, ThunkDispatch } from "redux-thunk"; // Too verbose to use. Any is good enough
import { EndPoints } from "src/axios/api-config";
import { IHeroModel } from "src/models/heroModel";
import {
  getAxios,
  deleteAxios,
  postAxios,
  putAxios,
} from "src/axios/generic-api-calls";

/* action creators */
export const fetchHeroes: ActionCreator<any> = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: HeroActionTypes.FETCH_HEROES_REQUEST,
    });
    try {
      const { data } = await getAxios<IHeroModel[]>(EndPoints.heroes);
      dispatch({ type: HeroActionTypes.FETCH_HEROES_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: HeroActionTypes.FETCH_HEROES_FAIL, payload: e.message });
    }
  };
};

export const removeHero: ActionCreator<any> = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: HeroActionTypes.REMOVE_HERO_REQUEST,
    });

    try {
      await deleteAxios(EndPoints.heroes, id);
      dispatch({ type: HeroActionTypes.REMOVE_HERO_SUCCESS, payload: id });
    } catch (e) {
      dispatch({
        type: HeroActionTypes.REMOVE_HERO_FAIL,
        payload: e.message,
      });
    }
  };
};

export const addHero: ActionCreator<any> = (hero: IHeroModel) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: HeroActionTypes.ADD_HERO_REQUEST,
    });

    try {
      const { data } = await postAxios(EndPoints.heroes, hero);
      dispatch({ type: HeroActionTypes.ADD_HERO_SUCCESS, payload: data });
    } catch (e) {
      dispatch({
        type: HeroActionTypes.ADD_HERO_FAIL,
        payload: e.message,
      });
    }
  };
};

export const updateHero: ActionCreator<any> = (hero: IHeroModel) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: HeroActionTypes.UPDATE_HERO_REQUEST,
    });

    try {
      await putAxios(EndPoints.heroes, hero.id, hero);
      dispatch({ type: HeroActionTypes.UPDATE_HERO_SUCCESS, payload: hero });
    } catch (e) {
      dispatch({
        type: HeroActionTypes.UPDATE_HERO_FAIL,
        payload: e.message,
      });
    }
  };
};

export const softDeleteHero = (id: string) => ({
  type: HeroActionTypes.REMOVE_HERO_SUCCESS,
  payload: id,
});
