import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducers';
import dialogReducer from './dialog/dialog.reducers';
import productReducer from './product/product.reducers';

const rootReducer = combineReducers({
    auth: authReducer,
    dialog: dialogReducer,
    product: productReducer
});

export default rootReducer;