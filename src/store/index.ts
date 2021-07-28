import logger from "redux-logger";
import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose,
  Store,
} from "redux";

import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import { IHeroState } from "../features/heroes/heroTypes";
import { heroReducer } from "../features/heroes/heroReducer";
import { Context, createWrapper } from "next-redux-wrapper";

export interface IApplicationState {
  heroReducer: IHeroState;
}

const rootReducer = combineReducers<IApplicationState>({
  heroReducer,
});

const sagaMiddleware = createSagaMiddleware();
const middleware = [thunk, sagaMiddleware, logger]; // side-effect middleware

let store: Store<IApplicationState, any>;

// create a makeStore function
const makeStore = (context: Context) => {
  if (typeof window !== "undefined") {
    // @ts-ignore
    const withDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(
      rootReducer,
      withDevTools(applyMiddleware(...middleware))
    );
  }
};

// sagaMiddleware.run(villainSaga);

// export an assembled wrapper
export const wrapper = createWrapper<Store<IApplicationState>>(makeStore, {
  debug: true,
});
