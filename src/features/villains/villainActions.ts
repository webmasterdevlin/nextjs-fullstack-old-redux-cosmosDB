/* action creators of Saga */
import { Action } from "redux";
import { VillainActionTypes } from "./villainTypes";

import { IVillainModel } from "src/models/client/villainModel";

export interface IAction extends Action {
  readonly payload?: any;
}

export const fetchVillains = (): IAction => ({
  type: VillainActionTypes.FETCH_VILLAINS_REQUEST,
});

export const removeVillain = (id: string): IAction => ({
  type: VillainActionTypes.REMOVE_VILLAIN_REQUEST,
  payload: id,
});

export const addVillain = (villain: IVillainModel): IAction => ({
  type: VillainActionTypes.ADD_VILLAIN_REQUEST,
  payload: villain,
});

export const updateVillain = (villain: IVillainModel) => ({
  type: VillainActionTypes.UPDATE_VILLAIN_REQUEST,
  payload: villain,
});

export const softDeleteVillain = (id: string) => ({
  type: VillainActionTypes.SOFT_DELETE_VILLAIN,
  payload: id,
});
