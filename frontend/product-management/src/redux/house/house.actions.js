import HouseTypes from "./house.types";

export const fetchAllHouseStart = () => ({
    type: HouseTypes.FETCH_ALL_HOUSE_START
});

export const fetchAllHouseSuccess = (result) => ({
    type: HouseTypes.FETCH_ALL_HOUSE_SUCCESS,
    payload: result
});

export const getHouseByIdStart = (id) => ({
    type: HouseTypes.GET_HOUSE_BY_ID_START,
    payload: id
});

export const getHouseByIdSuccess = (result) => ({
    type: HouseTypes.GET_HOUSE_BY_ID_SUCCESS,
    payload: result
});

export const fetchFailure = (error) => ({
    type: HouseTypes.FETCH_FAILURE,
    payload: error
});

export const sendCommentStart = (visitHouseId, comment, commenter) => ({
    type: HouseTypes.SEND_COMMENT_START,
    payload: {
        visitHouseId,
        comment,
        commenter
    }
});

export const sendCommentSuccess = (result) => ({
    type: HouseTypes.SEND_COMMENT_SUCCESS,
    payload: result
});

export const getCommentsByHouseIdStart = (houseId) => ({
    type: HouseTypes.GET_COMMENTS_BY_HOUSE_ID_START,
    payload: houseId
});

export const getCommentsByHouseIdSuccess = (result) => ({
    type: HouseTypes.GET_COMMENTS_BY_HOUSE_ID_SUCCESS,
    payload: result
});

export const likeCommentStart = (commentId, like, userName) => ({
    type: HouseTypes.LIKE_COMMENT_START,
    payload: {
        commentId,
        like,
        userName
    }
});

export const likeCommentSuccess = (result) => ({
    type: HouseTypes.LIKE_COMMENT_SUCCESS,
    payload: result
});