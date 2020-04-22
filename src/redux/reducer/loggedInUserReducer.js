import {ActionTypes} from '../actions/ActionTypes';

const initialState = {
    isLoading: true,
    userProfile: {},
    errorMsg: '',
    editProfileRes:{},
    addAddrResponse:{},
    addressList:{},
    saveAddressResponse:{},
    changePasswordRes:{},

}

export function loggedInUserReducer(state =  initialState, action){

    switch(action.type){
        /*Get user Profile*/
        case ActionTypes.GET_USER_PROFILE_SUCCESS:
            console.log("In User Prof reducer", action.payload);
            return {...state, userProfile: action.payload}

        case ActionTypes.GET_USER_PROFILE_FAILURE:
            return {...state, errorMsg: action.payload}
        /*Get user Profile*/
        
        /*Edit user Profile*/
        case ActionTypes.EDIT_PROFILE_SUCCESS:
            return {...state, editProfileRes: action.payload}

        /*Add Address*/
        case ActionTypes.ADD_ADDRESS_SUCCESS:
            return {...state, addAddrResponse: action.payload}

        case ActionTypes.ADD_ADDRESS_FAILURE:
            return {...state, errorMsg: action.payload}
        /*Add Address*/
        
        /*Get Address*/
        case ActionTypes.GET_CUST_ADDRESS_REQUEST:
            return {...state, isLoading: true}
        
        case ActionTypes.GET_CUST_ADDRESS_SUCCESS:
            return {...state, addressList: action.payload, isLoading:false}

        case ActionTypes.GET_CUST_ADDRESS_SUCCESS:
            return {...state, errorMsg: action.payload}
        /*Get Address*/
        
        /*save address*/
        case ActionTypes.SAVE_ADDRESS_SUCCESS:
            return {...state, saveAddressResponse: action.payload}

        case ActionTypes.SAVE_ADDRESS_FAILURE:
            return {...state, errorMsg: action.payload}

        /*change password*/
        case ActionTypes.CHANGE_PASSWORD_SUCCESS:
            return {...state, changePasswordRes: action.payload}
        /*change password*/


        default:
            return {state};
    }

}