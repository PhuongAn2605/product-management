import ProductTypes from "./product.types";
import { put, all, takeLatest, call } from "@redux-saga/core/effects";
import Http from "../../utils/http";
import { addProductFailure, addProductSuccess, fetchProductFailure, fetchProductSuccess } from "./product.actions";
import axios from "axios";

export function* addProduct(payload) {
  const { product, userName } = payload.payload;
  const {
    proName,
    shortName,
    location,
    expiration,
    functions,
    description,
    image,
  } = product;

  // console.log(image);
  try {
    const formData = new FormData();
    formData.append("productName", proName);
    formData.append("shortName", shortName);
    formData.append("location", location);
    formData.append("expiration", expiration);
    formData.append("functions", functions);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("houseId", null);

    const result = yield axios({
      method: "post",
      url: "http://localhost:5000/api/product/create/" + userName,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    const data = result.data;
    console.log(data);
    yield put(addProductSuccess(data));
  } catch (error) {
    yield put(addProductFailure(error));
  }
}

export function* addProductWatcher() {
  yield takeLatest(ProductTypes.ADD_PRODUCT_START, addProduct);
}

export function* fetchProduct() {
  try{
    const result = yield Http.get('/product');
    const data = result.data;
    console.log(data.products);
    yield put(fetchProductSuccess(data.products));
  }catch(err){
    yield put(fetchProductFailure(err));
  }
}

export function* fetchProductWatcher() {
  yield takeLatest(ProductTypes.FETCH_PRODUCTS_START, fetchProduct);
}

export function* productSaga() {
  yield all([
    call(addProductWatcher),
    call(fetchProductWatcher)
  ]);
}
