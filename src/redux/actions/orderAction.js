import {ActionTypes} from '../actions/ActionTypes';
import { apiCall } from '../../API/apiCall';

export const orderActions = {
    placeOrder,
    getOrderDetails,
    getCustomerOrderInDetail,
}

function placeOrder(data, type){
    console.log("In POrder action");
    

    return dispatch =>{
        console.log("In POrder disp");

        apiCall(data, 'POST', type)
            .then((response) => {
                console.log("place Order action dis res", response);
                dispatch(placeOrderSuccess(response));
            })
            .catch((error) =>{
                console.log("Error", error);
                dispatch(placeOrderFailure(error));                
            })
    }
    function placeOrderSuccess(response){
        return {
            type: ActionTypes.PLACE_ORDER_SECCESS,
            payload: response
        }
    }
    function placeOrderFailure(error){
        return {
            type: ActionTypes.PLACE_ORDER_FAILURE,
            payload: error
        }
    }
}

function getOrderDetails(type){
    return dispatch =>{
        apiCall(null,'GET',type)
        .then((result) => {
            console.log("res: ",result);
            dispatch(getOrderDetailsSuccess(result.product_details));
        })
        .catch((error) =>{
            console.log("Error: ", error);
            
        })
    }

    function getOrderDetailsSuccess(result){
        return {
            type: ActionTypes.GET_ORDER_DETAILS_SUCCESS,
            payload: result
        }

    }
}

function getCustomerOrderInDetail(type){

    return dispatch => {
        apiCall(null,'GET',type)
        .then((result)=>{
            console.log("Result of getCustomerOrderInDetail: ",result);
            dispatch(getOrderInDetailSuccess(result));
            
        })
        .catch((error) => {
            console.log("Error in getCustomerOrderInDetail: ", error);
        });
    }

    function getOrderInDetailSuccess(result){
        return {
            type: ActionTypes.GET_ORDER_IN_DETAIL_SUCCESS,
            payload: result
        }
    }

}