import { IVillainState, VillainActionTypes } from "./villainTypes";

const initialState: IVillainState = {
  villains: [],
  villain: null,
  loading: false,
};

interface IAction {
  type: string;
  payload: any;
}

export const villainReducer = (
  state: IVillainState = initialState,
  action: IAction
): IVillainState => {
  switch (action.type) {
    case VillainActionTypes.FETCH_VILLAINS_REQUEST:
      return { ...state, loading: true };
    case VillainActionTypes.FETCH_VILLAINS_SUCCESS:
      return { ...state, loading: false, villains: action.payload };
    case VillainActionTypes.FETCH_VILLAINS_FAIL:
      return { ...state, loading: false };

    case VillainActionTypes.REMOVE_VILLAIN_REQUEST:
      return { ...state, loading: true };
    case VillainActionTypes.REMOVE_VILLAIN_SUCCESS:
      return {
        ...state,
        loading: false,
        villains: state.villains.filter((t) => t.id !== action.payload),
      };
    case VillainActionTypes.REMOVE_VILLAIN_FAIL:
      return { ...state, loading: false };

    case VillainActionTypes.ADD_VILLAIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VillainActionTypes.ADD_VILLAIN_SUCCESS:
      return {
        ...state,
        loading: false,
        villains: [...state.villains, action.payload],
      };
    case VillainActionTypes.ADD_VILLAIN_FAIL:
      return {
        ...state,
        loading: false,
      };
    case VillainActionTypes.UPDATE_VILLAIN_REQUEST:
      return { ...state, loading: true };
    case VillainActionTypes.UPDATE_VILLAIN_SUCCESS:
      return {
        ...state,
        loading: false,
        villains: state.villains.map((villain) =>
          villain.id === action.payload.id ? action.payload : villain
        ),
      };
    case VillainActionTypes.UPDATE_VILLAIN_FAIL:
      return {
        ...state,
        loading: false,
      };
    case VillainActionTypes.SOFT_DELETE_VILLAIN:
      return {
        ...state,
        villains: state.villains.filter((t) => t.id !== action.payload),
      };

    default:
      return state;
  }
};
