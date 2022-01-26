import HouseTypes from "./house.types";

const INITIAL_STATE = {
  houses: [],
  visitHouse: null,
  targetProducts: [],
  targetComments: [],
  commentDetails: [],
  commentLikes: [],
  houseLikes: [],
  replyComments: [],
  message: null,
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
      localStorage.setItem(
        "visitHouse",
        JSON.stringify({
          visitHouse: action.payload.house,
          targetProducts: action.payload.targetProducts,
          targetComments: action.payload.targetComments,
          houseLikes: action.payload.houseLikes,
        })
      );

      return {
        ...state,
        visitHouse: action.payload.house,
        targetProducts: action.payload.targetProducts,
        targetComments: action.payload.targetComments,
        houseLikes: action.payload.houseLikes,
        error: null,
      };
    case HouseTypes.SEND_COMMENT_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        targetComments: action.payload.comments,
      };

    case HouseTypes.SEND_REPLY_COMMENT_SUCCESS:
      return {
        ...state,
        replyComments: action.payload.replyComments,
      };
    case HouseTypes.GET_COMMENTS_BY_HOUSE_ID_SUCCESS:
      return {
        ...state,
        targetComments: action.payload.comments,
      };

    case HouseTypes.GET_REPLIES_BY_COMMENT_ID_SUCCESS:
      return {
        ...state,
        replyComments: action.payload.replyComments,
      };

    case HouseTypes.LIKE_COMMENT_SUCCESS:
      return {
        ...state,
        commentLikes: action.payload.commentLikes,
      };
    case HouseTypes.LIKE_HOUSE_SUCCESS:
      return {
        ...state,
        houseLikes: action.payload.houseLikes,
      };
    case HouseTypes.SET_HOUSE_LIKES_FROM_AUTH:
      return {
        ...state,
        houseLikes: action.payload,
      };

    case HouseTypes.SET_HOUSE_COMMENTS_FROM_AUTH:
      return {
        ...state,
        targetComments: action.payload,
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
