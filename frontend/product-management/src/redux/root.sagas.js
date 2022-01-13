import { authSaga } from "./auth/auth.sagas";
import { all, call } from '@redux-saga/core/effects';

export default function* rootSaga() {
    yield all([
        call(authSaga)
    ])
}