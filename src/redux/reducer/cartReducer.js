import {ActionTypes} from '../actions/ActionTypes';

const initialState = {
    cartResult: {},
    cartData:{},
    isLoading: true,
    deleteCartResult:{},
}

export function cartReducer(state = initialState, action){

    switch(action.type){
        
        /* add to cart */
        case ActionTypes.ADD_PRODUCT_TO_CART_REQUEST:
            return {...state, isLoading: true}

        case ActionTypes.ADD_PRODUCT_TO_CART_SUCCESS:
            console.log("In reducer cartResult: ", action.payload);
            return {...state, cartResult:action.payload, isLoading: false}

        case ActionTypes.ADD_PRODUCT_TO_CART_FAILURE:
            return {...state, error:action.payload}
        /* add to cart */

        /*get cart data*/
        case ActionTypes.GET_CART_DATA_SUCCESS:
            console.log("In reducer cartData: ", action.payload)
            return {...state, cartData: action.payload, isLoading: false}
        /*get cart data*/

        /*delete cart product*/
        case ActionTypes.DELETE_CART_PRODUCT_SUCCESS:
            return {...state, deleteCartResult: action.payload}

        default:
            return {state};
    }
}
