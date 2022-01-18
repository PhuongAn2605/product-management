import ProductTypes from "./product.types"

const INITIAL_STATE = {
    product: null,
    productImage: null,
    error: null,
    products: []
}

const productReducer = (state=INITIAL_STATE, action) => {
    switch(action){
        case ProductTypes.ADD_PRODUCT_SUCCESS:
            console.log(action.payload);
            return{
                ...state,
                product: action.payload,
                error: null
            }
        case ProductTypes.ADD_PRODUCT_FAILURE:
            return {
                ...state,
                error: action.payload
            }

        case ProductTypes.ADD_PRODUCT_IMAGE:
            console.log(action.payload)
            return {
                ...state,
                productImage: action.payload
            }
        
        case ProductTypes.FETCH_PRODUCTS_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                products: [...action.payload],
                error: null
            }

        case ProductTypes.FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}

export default productReducer;