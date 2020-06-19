import {ActionTypes} from '../actions/ActionTypes';
import {apiCall} from '../../API/apiCall';


export const cartAction ={
    addToCart,
    getCartData,
    deleteCartProduct,
}

function addToCart(type, productInfo){
    // console.log("Inaction addtocart");
    
    return dispatch => {
        // console.log("In action dispatch");
        
        dispatch(addToCartRequest());
        // console.log("after action request dispatch");

        apiCall(productInfo, 'POST', type)
            .then((result) =>{
                // console.log("addTOCart action result:", result);
                dispatch(addToCartSuccess(result));
            
            })
            .catch((error) => {
                console.log(error);
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
    // console.log('in action');
    
    return async dispatch =>{
        // console.log("in dispatch");
        
       apiCall(null, 'GET', type)
        .then((result) =>{
            // console.log("in disp", result);
            let data
            if(result.product_details !== undefined){
                data = result.product_details
                data = data.map((value) => value.product_id);
            }
                dispatch(getCartDataSuccess(data));
        })
        .catch((error) =>{
            console.log("Error", error);
            
        })
       
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
            // console.log("Res disp: ",result);
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