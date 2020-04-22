import {ActionTypes} from '../actions/ActionTypes';
import { apiCall } from '../../API/apiCall';

export const orderActions = {
    placeOrder,
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