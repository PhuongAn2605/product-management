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


export const addProductImage = (url) => ({
    type: ProductTypes.ADD_PRODUCT_IMAGE,
    payload: url
});

export const fetchProductStart = () => ({
    type: ProductTypes.FETCH_PRODUCTS_START,
});

export const fetchProductSuccess = (result) => ({
    type: ProductTypes.FETCH_PRODUCTS_SUCCESS,
    payload: result
});


export const editProductStart = (product) => ({
    type: ProductTypes.EDIT_PRODUCT_START,
    payload: product
});

export const editProductSuccess = (data) => ({
    type: ProductTypes.EDIT_PRODUCT_SUCCESS,
    payload: data
});

export const deleteProductStart = (id) => ({
    type: ProductTypes.DELETE_PRODUCT_START,
    payload: id
});

export const deleteProductSuccess = (data) => ({
    type: ProductTypes.DELETE_PRODUCT_SUCCESS,
    payload: data
});

export const fetchFailure = (error) => ({
    type: ProductTypes.FETCH_FAILURE,
    payload: error
});

export const setSearchByName = () => ({
    type: ProductTypes.SET_SEARCH_BY_NAME
});

export const setSearchByLocation = () => ({
    type: ProductTypes.SET_SEARCH_BY_LOCATION
});

export const searchProductByNameStart = (productName) => ({
    type: ProductTypes.SEARCH_PRODUCT_BY_NAME_START,
    payload: productName
});

export const searchProductByNameSuccess = (result) => ({
    type: ProductTypes.SEARCH_PRODUCT_BY_NAME_SUCCESS,
    payload: result
});

export const searchProductByLocationStart = (location) => ({
    type: ProductTypes.SEARCH_PRODUCT_BY_LOCATION_START,
    payload: location
});

export const searchProductByLocationSuccess = (result) => ({
    type: ProductTypes.SEARCH_PRODUCT_BY_LOCATION_SUCCESS,
    payload: result
});

export const getProductsFromAuth = (productsFromAuth) => ({
    type: ProductTypes.GET_PRODUCTS_FROM_AUTH,
    payload: productsFromAuth
})
