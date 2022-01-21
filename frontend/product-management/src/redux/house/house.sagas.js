import { put, all, takeLatest, call } from '@redux-saga/core/effects';
import Http from '../../utils/http';
import { fetchAllHouseSuccess, fetchFailure, getCommentsByHouseIdSuccess, getHouseByIdSuccess, likeCommentSuccess, sendCommentSuccess } from './house.actions';
import HouseTypes from './house.types';

export function* fetchAllHouses() {
    try{

        const result = yield Http.get('/house');
        const data = result.data;
        // console.log(data);
        yield put(fetchAllHouseSuccess(data.houses));

    }catch(error){
        yield put(fetchFailure(error));
    }
}

export function* fetchAllHousesWatcher () {
    yield takeLatest(HouseTypes.FETCH_ALL_HOUSE_START, fetchAllHouses);
}

export function* getHouseById(payload) {
    const id = payload.payload;
    try{
        const result = yield Http.get('/house/' + id);
        const data = result.data;
        console.log(data);
        yield put(getHouseByIdSuccess(data));
    }catch(error){
        yield put(fetchFailure(error));
    }
}

export function* getHouseByIdWatcher() {
    yield takeLatest(HouseTypes.GET_HOUSE_BY_ID_START, getHouseById);
}

export function* sendComment(payload) {
    const content = payload.payload.comment;
    const commenter = payload.payload.commenter;
    const houseId = payload.payload.visitHouseId;

    console.log('payload: ', payload.payload);

    try{
        const result = yield Http.post('/comment/create/' + houseId,{
            content,
            commenter
        });
        const data = result.data;
        console.log(result.data);
        yield put(sendCommentSuccess(data));
    }catch(error){
        yield put(fetchFailure(error));

    }
}

export function* sendCommentWatcher() {
    yield takeLatest(HouseTypes.SEND_COMMENT_START, sendComment);
}

export function* getCommentsByHouseId(payload) {
    const houseId =payload.payload;
    try{
        const result = yield Http.get('/comment/' + houseId);
        const data = result.data;
        console.log(result.data);
        yield put(getCommentsByHouseIdSuccess(data));
    }catch(error){
        yield put(fetchFailure(error));

    }
}


export function* getCommentsByHouseIdWatcher() {
    yield takeLatest(HouseTypes.GET_COMMENTS_BY_HOUSE_ID_START, getCommentsByHouseId);
}

export function* likeComment(payload) {
    const { commentId, like, userName } = payload.payload;
    console.log(payload.payload);
    
    try{
        const result = yield Http.post('/comment-like/' + commentId, {
            like,
            userName
        });
        const data = result.data;
        console.log(result.data);
        yield put(likeCommentSuccess(data));
    }catch(error){
        console.log('error: ', error)
        yield put(fetchFailure(error));

    }
}


export function* likeCommentWatcher() {
    yield takeLatest(HouseTypes.LIKE_COMMENT_START, likeComment);
}

export function* houseSaga() {
    yield all([
        call(fetchAllHousesWatcher),
        call(getHouseByIdWatcher),
        call(sendCommentWatcher),
        call(getCommentsByHouseIdWatcher),
        call(likeCommentWatcher)
    ])
}