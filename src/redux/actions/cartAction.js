import {ActionTypes} from '../actions/ActionTypes';
import {apiCall} from '../../API/apiCall';


export const cartAction ={
    addToCart,
    getCartData,
    deleteCartProduct,
}

function addToCart(type, productInfo){
    return dispatch => {
        dispatch(addToCartRequest());
        apiCall(productInfo, 'POST', type)
            .then((result) =>{
                dispatch(addToCartSuccess(result));
            })
            .catch((error) => {
                dispatch(addToCartFailure(error));
            })
    }

    function addToCartRequest(){
        return {
            type: ActionTypes.ADD_PRODUCT_TO_CART_REQUEST
        }
    }

    function addToCartSuccess(productInfo){
        return {
            type: ActionTypes.ADD_PRODUCT_TO_CART_SUCCESS,
            payload: productInfo
        }
    }

    function addToCartFailure(error){
        return {
            type: ActionTypes.ADD_PRODUCT_TO_CART_FAILURE,
            payload: error
        }
    }

}

function getCartData(type){
    return async dispatch =>{
       const result = await apiCall(null, 'GET', type);
       let data
        if(result.product_details !== undefined){
            data = result.product_details
            data = data.map((value) => value.product_id);
        }
        dispatch(getCartDataSuccess(data));
    }

    function getCartDataSuccess(data){
        return {
            type:ActionTypes.GET_CART_DATA_SUCCESS,
            payload: data
        }
    }
}

function deleteCartProduct(type){

    return dispatch => {
        apiCall(null, 'DELETE', type)
        .then((result) => {
            dispatch(deleteCartProductSuccess(result));
        })
        .catch((error) => {
            console.log("Error: ",error);
        })
    }

    function deleteCartProductSuccess(result){
        return {
            type: ActionTypes.DELETE_CART_PRODUCT_SUCCESS,
            payload: result
        }
    }
}