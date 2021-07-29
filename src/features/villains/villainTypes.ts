import { IVillainModel } from "src/models/villainModel";

export interface IVillainState {
  readonly villains: IVillainModel[];
  readonly villain: IVillainModel;
  readonly loading: boolean;
}

export type ApiResponse = Record<string, any>;

export const villainNamespace = "villain";

/* action types */
export const VillainActionTypes = {
  FETCH_VILLAINS_REQUEST: `${villainNamespace}/FETCH_VILLAINS_REQUEST`,
  FETCH_VILLAINS_SUCCESS: `${villainNamespace}/FETCH_VILLAINS_SUCCESS`,
  FETCH_VILLAINS_FAIL: `${villainNamespace}/FETCH_VILLAINS_FAIL`,

  REMOVE_VILLAIN_REQUEST: `${villainNamespace}/REMOVE_VILLAIN_REQUEST`,
  REMOVE_VILLAIN_SUCCESS: `${villainNamespace}/REMOVE_VILLAIN_SUCCESS`,
  REMOVE_VILLAIN_FAIL: `${villainNamespace}/REMOVE_VILLAIN_FAIL`,

  ADD_VILLAIN_REQUEST: `${villainNamespace}/ADD_VILLAIN_REQUEST`,
  ADD_VILLAIN_SUCCESS: `${villainNamespace}/ADD_VILLAIN_SUCCESS`,
  ADD_VILLAIN_FAIL: `${villainNamespace}/ADD_VILLAIN_FAIL`,

  UPDATE_VILLAIN_REQUEST: `${villainNamespace}/UPDATE_VILLAIN_REQUEST`,
  UPDATE_VILLAIN_SUCCESS: `${villainNamespace}/UPDATE_VILLAIN_SUCCESS`,
  UPDATE_VILLAIN_FAIL: `${villainNamespace}/UPDATE_VILLAIN_FAIL`,

  SOFT_DELETE_VILLAIN: `${villainNamespace}/SOFT_DELETE`,
};
