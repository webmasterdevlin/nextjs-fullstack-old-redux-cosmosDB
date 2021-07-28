import { IHeroState, HeroActionTypes } from "./heroTypes";
import { Action } from "redux";

export const initialState: IHeroState = {
  heroes: [],
  hero: null,
  isLoading: false,
};

interface IAction extends Action {
  readonly payload?: any;
}

export const heroReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case HeroActionTypes.FETCH_HEROES_REQUEST:
      return { ...state, isLoading: true };
    case HeroActionTypes.FETCH_HEROES_SUCCESS:
      return { ...state, isLoading: false, heroes: action.payload };
    case HeroActionTypes.FETCH_HEROES_FAIL:
      return { ...state, isLoading: false };

    case HeroActionTypes.REMOVE_HERO_REQUEST:
      return { ...state, isLoading: true };
    case HeroActionTypes.REMOVE_HERO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        heroes: state.heroes.filter((f) => f.id !== action.payload),
      };
    case HeroActionTypes.REMOVE_HERO_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case HeroActionTypes.ADD_HERO_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case HeroActionTypes.ADD_HERO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        heroes: [...state.heroes, action.payload],
      };
    case HeroActionTypes.ADD_HERO_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case HeroActionTypes.UPDATE_HERO_REQUEST:
      return { ...state, isLoading: true };
    case HeroActionTypes.UPDATE_HERO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        heroes: state.heroes.map((hero) =>
          hero.id === action.payload.id ? action.payload : hero
        ),
      };
    case HeroActionTypes.UPDATE_HERO_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case HeroActionTypes.SOFT_DELETE_HERO:
      return {
        ...state,
        heroes: state.heroes.filter((f) => f.id !== action.payload),
      };
    default:
      return state;
  }
};
