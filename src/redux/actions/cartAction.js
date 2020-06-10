import {ActionTypes} from '../actions/ActionTypes';
import {BASE_URL} from '../../API/apiConstants';
import {apiCall} from '../../API/apiCall';
import AsyncStorage from '@react-native-community/async-storage';


export const cartAction ={
    addToCart,
    getCartData,
}

function addToCart(type, productInfo){
    console.log("Inaction addtocart");
    
    return dispatch => {
        console.log("In action dispatch");
        
        dispatch(addToCartRequest());
        console.log("after action request dispatch");

        apiCall(productInfo, 'POST', type)
            .then((result) =>{
                console.log("addTOCart action result:", result);
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
    console.log('in action');
    
    return async dispatch =>{
        console.log("in dispatch");
        
       apiCall(null, 'GET', type)
        .then((result) =>{
            console.log("in disp", result);
            let data = result.product_details
            data = data.map((value) => value.product_id);
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