import {ActionTypes} from '../actions/ActionTypes';

const initialState = {
    isLoading:true,
    res:{},
    errorMsg:'',
    orderDetails:{},

}

export function orderReducer(state = initialState, action){

    switch(action.type){
        case ActionTypes.PLACE_ORDER_SECCESS:
            return {...state, res: action.payload}

        case ActionTypes.PLACE_ORDER_FAILURE:
            return {...state, errorMsg:action.payload}

        /*get order details*/
        case ActionTypes.GET_ORDER_DETAILS_SUCCESS:
            return {...state, orderDetails: action.payload, isLoading:false}
        /*get order details*/

        default: 
            return {}
    }
}