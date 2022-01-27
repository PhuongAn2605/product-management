import { deleteProductSuccess } from "./product.actions";
import ProductTypes from "./product.types";
import { deleteProduct, editProducts } from "./product.utils";

const INITIAL_STATE = {
  product: null,
  productImage: null,
  error: "",
  products: [],
  message: null,
  isSearchByName: true,
  isSearchByLocation: false,
  isSearched: false,
  searchedProducts: [],
  productToEdit: null
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
        message: "Edit Successfully!",
        products: editProducts(state.products, action.payload.product),
      };

    case ProductTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: deleteProduct(state.products, action.payload),
        error: null,
      };

    case ProductTypes.FETCH_FAILURE:
      console.log(action.payload.message)
    state.error = action.payload.message;
    console.log('state error', state.error);
      return {
        ...state,
        error: action.payload.message,
        message: null
      };

    case ProductTypes.SET_SEARCH_BY_NAME:
    case ProductTypes.SET_SEARCH_BY_LOCATION:
      return {
        ...state,
        isSearchByName: !state.isSearchByName,
        isSearchByLocation: !state.isSearchByLocation,
      };

    case ProductTypes.SET_SEARCH_STATE:
      return {
        ...state,
        isSearched: true
      }
    case ProductTypes.CANCEL_SEARCH:
      return {
        ...state,
        isSearched: false,
        searchedProducts: []
      }

    case ProductTypes.SEARCH_PRODUCT_BY_LOCATION_SUCCESS:
    case ProductTypes.SEARCH_PRODUCT_BY_NAME_SUCCESS:
      return {
        ...state,
        searchedProducts: action.payload,
      };
    case ProductTypes.SEARCH_PRODUCT_FAILURE:
      return {
        ...state,
        searchedProducts: [],
        error: action.payload
      }

    case ProductTypes.GET_PRODUCTS_FROM_AUTH:
      return{
        ...state,
        products: action.payload
      }
    
    case ProductTypes.GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        productToEdit: action.payload.product
      }

    default:
      return state;
  }
};

export default productReducer;
