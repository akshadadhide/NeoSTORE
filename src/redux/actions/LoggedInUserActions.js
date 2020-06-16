import {ActionTypes} from '../actions/ActionTypes';
import {apiCall} from '../../API/apiCall';


export const loggedInUserActions ={
    getUserProfile,
    editProfile,
    addAddress,
    getAddress,
    saveAddress,
    changePassword,
    deleteAddress,
};


function getUserProfile(type){
    // console.log("In getUserProf");
    
    return dispatch => {
        // console.log("In getUserProf dis");

            apiCall(null, 'GET', type)
                .then((result) => {
                    // console.log("inaction before", result);
                    const customer_proile = result.customer_proile;
                    dispatch(getUserProfileSuccess(customer_proile));
                    // console.log("inaction after", customer_proile);
                })
                .catch((error) => {
                    console.log('Error: ', error);
                    dispatch(getUserProfileFailure(error));
                })

    }

    function getUserProfileSuccess(data){
        // console.log("In getUserProfileSuccess");
        return {
            type: ActionTypes.GET_USER_PROFILE_SUCCESS,
            payload: data
        }
    }

    function getUserProfileFailure(error){
        return {
            type: ActionTypes.GET_USER_PROFILE_FAILURE,
            payload: error
        }
    }
}

function editProfile(data,type){

    return dispatch =>{

        console.log("In edit prof action");

        apiCall(data,'PUT',type)
            .then((result) => {
                console.log("In dispatch");
                dispatch(editProfileSuccess(result));
            })
    }

    function editProfileSuccess(result){
        return {
            type: ActionTypes.EDIT_PROFILE_SUCCESS,
            payload: result
        }
    }

}

function addAddress(data, type){

    return dispatch =>{

        apiCall(data, 'POST', type)
            .then((result) => {
                // console.log("res", result);
                dispatch(addAddressSuccess(result));
            })
            .catch((error) =>{
                dispatch(addAddressFailure(error));
            })
    }

    function addAddressSuccess(data){
        return {
            type: ActionTypes.ADD_ADDRESS_SUCCESS,
            payload: data
        }
    }
    function addAddressFailure(error){
        return {
            type:ActionTypes.ADD_ADDRESS_FAILURE,
            payload: error
        }
    }
}

function getAddress(type){
    console.log("In getAddr");
    
    return dispatch => {
        console.log("In getAddr dis");

        dispatch(getAddressRequest());
        apiCall(null, 'GET', type)
            .then((result) =>{
                console.log("res", result);
                dispatch(getAddressSuccess(result));
            })
            .catch((error) =>{
                dispatch(getAddressFailure(error));
            })
    }

    function getAddressRequest(){
        return {
            type: ActionTypes.GET_CUST_ADDRESS_REQUEST,
            
        }
    }
    function getAddressSuccess(data){
        return {
            type: ActionTypes.GET_CUST_ADDRESS_SUCCESS,
            payload: data
        }
    }
    function getAddressFailure(error){
        return {
            type: ActionTypes.GET_CUST_ADDRESS_FAILURE,
            payload: error
        }
    }


}

function saveAddress(data, type){
    console.log("In svaAddr");

    return dispatch =>{
        console.log("In saveArr dis");

        apiCall(data, 'PUT', type)
            .then((result) => {
                console.log("In svaAddr res:", result);
                dispatch(saveAddressSuccess(result));
            })
            .catch((error) =>{
                dispatch(saveAddressFailure(error));
            })
        
    }
    function saveAddressSuccess(result){
        return {
            type: ActionTypes.SAVE_ADDRESS_SUCCESS,
            payload: result
        }
    }
    function saveAddressFailure(error){
        return {
            type: ActionTypes.SAVE_ADDRESS_FAILURE,
            payload: error
        }
    }
    

}

function changePassword(data, type){

    return dispatch => {
        apiCall(data, 'POST', type)
            .then((result) => {
                console.log("res: ",result);
                dispatch(changePasswordSuccess(result));
            })
            .catch((error) =>{
                console.log("Error: ", error);
                
            })
    }
    function changePasswordSuccess(result){
        return {
            type: ActionTypes.CHANGE_PASSWORD_SUCCESS,
            payload: result
        }
    }
}

function deleteAddress(type){
    return dispatch => {
        apiCall(null, 'DELETE', type)
        .then((result) => {
            console.log("res----",result);
            dispatch(deleteAddrSuccess(result));
        })
        .catch((error) => {
            console.log("Error: ",error);
        })
    }

    function deleteAddrSuccess(result){
        return {
            type: ActionTypes.DELETE_ADDRESS_SUCCESS,
            payload: result
        }
    }

   
}