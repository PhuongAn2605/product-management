import HouseTypes from "./house.types";

const INITIAL_STATE = {
  houses: [],
  error: null,
};

const houseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HouseTypes.FETCH_ALL_HOUSE_SUCCESS:
      return {
        ...state,
        houses: action.payload,
        error: null,
      };

    case HouseTypes.FETCH_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default houseReducer;
