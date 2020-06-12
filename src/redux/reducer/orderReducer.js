import {ActionTypes} from '../actions/ActionTypes';

const initialState = {
    isLoading:true,
    res:{},
    errorMsg:'',
    orderDetails:{},
    OrderInDetail:{},
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

        /* getCustomerOrderInDetail */
        case ActionTypes.GET_ORDER_IN_DETAIL_SUCCESS:
            return {...state, OrderInDetail: action.payload, isLoading:false}
        /* getCustomerOrderInDetail */

        default: 
            return {}
    }
}