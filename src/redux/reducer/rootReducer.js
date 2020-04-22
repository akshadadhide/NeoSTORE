import {combineReducers} from 'redux';
import {authReducer} from './authReducer';
import {productCategoryReducer} from './productCategoryReducer';
import {loggedInUserReducer} from './loggedInUserReducer';
import {cartReducer} from './cartReducer';
import {orderReducer} from './orderReducer';

const rootReducer = combineReducers({
    authReducer,
    productCategoryReducer,
    loggedInUserReducer,
    cartReducer,
    orderReducer,
});


export default rootReducer;