import { deleteProductSuccess } from "./product.actions";
import ProductTypes from "./product.types";
import { deleteProduct, editProducts } from "./product.utils";

const INITIAL_STATE = {
  product: null,
  productImage: null,
  error: null,
  products: [],
  message: null,
  isSearchByName: true,
  isSearchByLocation: false,
  searchedProducts: [],
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductTypes.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        error: null,
        products: [...state.products, { ...action.payload.product }],
        message: "Add Successfully!",
      };
    // case ProductTypes.ADD_PRODUCT_IMAGE:
    //   return {
    //     ...state,
    //     productImage: action.payload,
    //   };

    case ProductTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        error: null,
        message: "Add Successfully!",
      };

    case ProductTypes.EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        error: null,
        message: "Add Successfully!",
        products: editProducts(state.products, action.payload.product),
      };

    case ProductTypes.DELETE_PRODUCT_SUCCESS:
      console.log(deleteProduct(state.products, action.payload));
      return {
        ...state,
        products: deleteProduct(state.products, action.payload),
        error: null,
      };

    case ProductTypes.FETCH_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case ProductTypes.SET_SEARCH_BY_NAME:
    case ProductTypes.SET_SEARCH_BY_LOCATION:
      return {
        ...state,
        isSearchByName: !state.isSearchByName,
        isSearchByLocation: !state.isSearchByLocation,
      };

    case ProductTypes.SEARCH_PRODUCT_BY_LOCATION_SUCCESS:
    case ProductTypes.SEARCH_PRODUCT_BY_NAME_SUCCESS:
      return {
        ...state,
        searchedProducts: action.payload,
      };

    case ProductTypes.GET_PRODUCTS_FROM_AUTH:
      return{
        ...state,
        products: action.payload
      }

    default:
      return state;
  }
};

export default productReducer;
