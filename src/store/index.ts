import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose,
  Store,
} from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import { IHeroState } from "../features/heroes/heroTypes";
import { heroReducer } from "../features/heroes/heroReducer";
import { Context, createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";

export interface IApplicationState {
  hero: IHeroState;
}

const rootReducer = combineReducers<IApplicationState>({
  hero: heroReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const sagaMiddleware = createSagaMiddleware();
const middleware = [thunk, sagaMiddleware, logger]; // side-effect middleware

// create a makeStore function
const makeStore = (context: Context) => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  // sagaMiddleware.run(villainSaga);
  return store;
};

// export an assembled wrapper
export const wrapper = createWrapper<Store<IApplicationState>>(makeStore, {
  debug: true,
});
