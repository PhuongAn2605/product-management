import { deleteProductSuccess } from "./product.actions";
import ProductTypes from "./product.types";
import { editProducts } from "./product.utils";

const INITIAL_STATE = {
  product: null,
  productImage: null,
  error: null,
  products: [],
  message: null
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductTypes.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        error: null,
        products: [...state.products, {...action.payload.product}],
        message: 'Add Successfully!'
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
        message: 'Add Successfully!'

      };

    case ProductTypes.EDIT_PRODUCT_SUCCESS:
        console.log(action.payload.product);
      return {
        ...state,
        error: null,
        message: 'Add Successfully!',
        products: editProducts(state.products, action.payload.product),
      };

    case ProductTypes.DELETE_PRODUCT_SUCCESS:
        return {
            ...state,
            products: ()
            error: null
        }

    case ProductTypes.FETCH_FAILURE:
        console.log(action.payload)
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
