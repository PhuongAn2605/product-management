import { authSaga } from "./auth/auth.sagas";
import { all, call } from '@redux-saga/core/effects';
import { productSaga } from "./product/product.sagas";

export default function* rootSaga() {
    yield all([
        call(authSaga),
        call(productSaga)
    ])
}