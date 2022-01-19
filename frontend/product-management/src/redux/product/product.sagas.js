import ProductTypes from "./product.types";
import { put, all, takeLatest, call } from "@redux-saga/core/effects";
import Http from "../../utils/http";
import {
  addProductSuccess,
  deleteProductSuccess,
  editProductSuccess,
  fetchFailure,
  fetchProductSuccess,
} from "./product.actions";
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

    // alert();

    const result = yield axios({
      method: "post",
      url: "http://localhost:5000/api/product/create/" + userName,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    const data = result.data;
    yield put(addProductSuccess(data));
  } catch (error) {
    yield put(fetchFailure(error));
  }
}

export function* addProductWatcher() {
  yield takeLatest(ProductTypes.ADD_PRODUCT_START, addProduct);
}

export function* fetchProduct() {
  try {
    const result = yield Http.get("/product");
    const data = result.data;
    yield put(fetchProductSuccess(data.products));
  } catch (err) {
    yield put(fetchFailure(err));
  }
}

export function* fetchProductWatcher() {
  yield takeLatest(ProductTypes.FETCH_PRODUCTS_START, fetchProduct);
}

export function* editProduct(payload) {
  // console.log('payload', payload)
  const product = payload.payload;
  console.log(product);
  const {
    proNameValue,
    shortNameValue,
    locationValue,
    expirationValue,
    functionsValue,
    descriptionValue,
    imageValue,
    id,
  } = product;

  // console.log(image);
  try {
    const formData = new FormData();
    formData.append("productName", proNameValue);
    formData.append("shortName", shortNameValue);
    formData.append("location", locationValue);
    formData.append("expiration", expirationValue);
    formData.append("functions", functionsValue);
    formData.append("description", descriptionValue);
    formData.append("image", imageValue);
    formData.append("houseId", null);

    const result = yield axios({
      method: "patch",
      url: "http://localhost:5000/api/product/edit/" + id,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    const data = result.data;
    console.log(data);
    yield put(editProductSuccess(data));
  } catch (error) {
    yield put(fetchFailure(error));
  }
}

export function* editProductWatcher() {
  yield takeLatest(ProductTypes.EDIT_PRODUCT_START, editProduct);
}

export function* deleteProduct(payload) {
  // console.log('payload', payload)
  const id = payload.payload;
  console.log(id);
  try {
    const result = Http.delete("/product/delete/" + id);

    const data = result.data;
    console.log(data);
    yield put(deleteProductSuccess(data));
  } catch (error) {
    yield put(fetchFailure(error));
  }
}

export function* deleteProductWatcher() {
  yield takeLatest(ProductTypes.EDIT_PRODUCT_START, deleteProduct);
}

export function* productSaga() {
  yield all([
    call(addProductWatcher),
    call(fetchProductWatcher),
    call(editProductWatcher),
    call(deleteProductWatcher)
  ]);
}
