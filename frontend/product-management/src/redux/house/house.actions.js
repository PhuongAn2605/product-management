import HouseTypes from "./house.types";

export const fetchAllHouseStart = () => ({
    type: HouseTypes.FETCH_ALL_HOUSE_START
});

export const fetchAllHouseSuccess = (result) => ({
    type: HouseTypes.FETCH_ALL_HOUSE_SUCCESS,
    payload: result
});

export const fetchFailure = (error) => ({
    type: HouseTypes.FETCH_FAILURE,
    payload: error
})