import HouseTypes from "./house.types";

const INITIAL_STATE = {
  houses: [],
  visitHouse: null,
  targetProducts: [],
  targetComments: [],
  commentDetails: [],
  commentLikes: [],
  newComment: null,
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
    case HouseTypes.GET_HOUSE_BY_ID_SUCCESS:
      return {
        ...state,
        visitHouse: action.payload.house,
        targetProducts: action.payload.targetProducts,
        targetComments: action.payload.comments,
        error: null,
      };
    case HouseTypes.SEND_COMMENT_SUCCESS:
      return {
        ...state,
        newComment: action.payload,
        commentDetails: [...state.commentDetails, action.payload.comment],
      };
    case HouseTypes.GET_COMMENTS_BY_HOUSE_ID_SUCCESS:
      return {
        ...state,
        commentDetails: action.payload.comments,
      };

    case HouseTypes.LIKE_COMMENT_SUCCESS:
      return {
        ...state,
        commentLikes: [...state.commentLikes, action.payload.commentLike],
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
