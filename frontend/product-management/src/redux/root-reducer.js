import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducers';
import dialogReducer from './dialog/dialog.reducers';
import houseReducer from './house/house.reducer';
import productReducer from './product/product.reducers';

const rootReducer = combineReducers({
    auth: authReducer,
    dialog: dialogReducer,
    product: productReducer,
    house: houseReducer
});

export default rootReducer;