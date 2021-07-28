import { put, takeEvery, call } from "redux-saga/effects";
import { all } from "@redux-saga/core/effects";

import { IAction } from "./villainActions";
import { VillainActionTypes } from "./villainTypes";

import {
  getAxios,
  deleteAxios,
  postAxios,
  putAxios,
} from "src/axios/generic-api-calls";
import { EndPoints } from "src/axios/api-config";

/*function generator implementations of Saga */
function* fetchingVillains() {
  try {
    const { data } = yield call(getAxios, EndPoints.villains); // saga
    yield put({
      type: VillainActionTypes.FETCH_VILLAINS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    yield put({
      type: VillainActionTypes.FETCH_VILLAINS_FAIL,
      payload: e.message,
    });
  }
}

function* removingVillain({ payload: id }: IAction) {
  try {
    yield call(deleteAxios, EndPoints.villains, id);
    yield put({ type: VillainActionTypes.REMOVE_VILLAIN_SUCCESS, payload: id });
  } catch (e) {
    yield put({
      type: VillainActionTypes.REMOVE_VILLAIN_FAIL,
      payload: e.message,
    });
  }
}

function* addingVillain({ payload: newVillain }: IAction) {
  try {
    const { data } = yield call(postAxios, EndPoints.villains, newVillain);
    yield put({ type: VillainActionTypes.ADD_VILLAIN_SUCCESS, payload: data });
  } catch (e) {
    yield put({
      type: VillainActionTypes.ADD_VILLAIN_FAIL,
      payload: e.message,
    });
  }
}

function* updatingVillain({ payload: updatedVillain }: IAction) {
  try {
    yield call(putAxios, EndPoints.villains, updatedVillain.id, updatedVillain);
    yield put({
      type: VillainActionTypes.UPDATE_VILLAIN_SUCCESS,
      payload: updatedVillain,
    });
  } catch (e) {
    yield put({
      type: VillainActionTypes.UPDATE_VILLAIN_FAIL,
      payload: e.message,
    });
  }
}

/* Saga watches the actions */
function* watchFetchingVillains() {
  yield takeEvery(VillainActionTypes.FETCH_VILLAINS_REQUEST, fetchingVillains);
}

function* watchRemovingVillain() {
  yield takeEvery(VillainActionTypes.REMOVE_VILLAIN_REQUEST, removingVillain);
}

function* watchAddingVillain() {
  yield takeEvery(VillainActionTypes.ADD_VILLAIN_REQUEST, addingVillain);
}
function* watchUpdatingVillain() {
  yield takeEvery(VillainActionTypes.UPDATE_VILLAIN_REQUEST, updatingVillain);
}

/* Saga sends all the watchers to the sagaMiddleware to run. */
export function* villainSaga() {
  yield all([
    watchFetchingVillains(),
    watchRemovingVillain(),
    watchAddingVillain(),
    watchUpdatingVillain(),
  ]);
}
