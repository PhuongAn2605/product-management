import { put, all, takeLatest, call } from '@redux-saga/core/effects';
import Http from '../../utils/http';
import { fetchAllHouseSuccess, fetchFailure } from './house.actions';
import HouseTypes from './house.types';

export function* fetchAllHouses() {
    try{

        const result = yield Http.get('/house');
        const data = result.data;
        console.log(data);
        yield put(fetchAllHouseSuccess(data.houses));

    }catch(error){
        yield put(fetchFailure(error));
    }
}

export function* fetchAllHousesWatcher () {
    yield takeLatest(HouseTypes.FETCH_ALL_HOUSE_START, fetchAllHouses);
}

export function* houseSaga() {
    yield all([
        call(fetchAllHousesWatcher)
    ])
}