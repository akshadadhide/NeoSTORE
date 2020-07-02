import {ActionTypes} from '../actions/ActionTypes';

const initialState = {
    userData:{},
    isLogin: false,
    isRegistered: false,
    errorMessage: '',
    registrationResult:{},
    forgotPasswordRes:{},
    recoverPasswordRes: {},
};


export function authReducer( state = initialState, action){

    switch(action.type){

        /*Login*/
        case ActionTypes.USER_LOGIN_REQUEST:{
            return {...state, isLogin:false,};
        }

        case ActionTypes.USER_LOGIN_SUCCESS:{
            return {...state, isLogin:true,  userData: action.payload };
        }

        case ActionTypes.USER_LOGIN_FAILURE:
            return {...state, errorMessage: action.payload };
        /*Login*/
        
        /*register*/
        case ActionTypes.USER_REGISTER_REQUEST:
                return {...state, isRegistered:false };
    
        case ActionTypes.USER_REGISTER_SUCCESS:
            return {...state, isRegistered:true, registrationResult: action.payload};

        case ActionTypes.USER_REGISTER_FAILURE:
            return {...state, errorMessage: action.payload};
        /*register*/
        
        /*forgot password*/
        case ActionTypes.FORGOT_PASSWORD_SUCCESS:
            return {...state, forgotPasswordRes: action.payload}

        case ActionTypes.FORGOT_PASSWORD_FAILURE:
                return {...state, errorMessage: action.payload}
        /*forgot password*/

        /*recover password*/
        case ActionTypes.RECOVER_PASSWORD_SUCCESS:
            return {...state, recoverPasswordRes: action.payload}

        case ActionTypes.RECOVER_PASSWORD_FAILURE:
                return {...state, errorMessage: action.payload}
        /*recover password*/

        default:
            return state;
    }
}