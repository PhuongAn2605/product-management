import ProductTypes from "./product.types";

export const addProductStart = ({product, userName}) => ({
    type: ProductTypes.ADD_PRODUCT_START,
    payload: {
        product,
        userName
    }
});

export const addProductSuccess = (result) => ({
    type: ProductTypes.ADD_PRODUCT_SUCCESS,
    payload: result
});

export const addProductFailure = (error) => ({
    type: ProductTypes.ADD_PRODUCT_FAILURE,
    payload: error
});

export const addProductImage = (url) => ({
    type: ProductTypes.ADD_PRODUCT_IMAGE,
    payload: url
});

export const fetchProductStart = () => ({
    type: ProductTypes.FETCH_PRODUCTS_START,
});

export const fetchProductSuccess = (result) => ({
    type: ProductTypes.FETCH_PRODUCTS_SUCCESS,
    payload: [...result]
});

export const fetchProductFailure = (error) => ({
    type: ProductTypes.FETCH_PRODUCTS_FAILURE,
    payload: error
});