import { ActionTypes } from '../actions/ActionTypes';
import AsyncStorage from '@react-native-community/async-storage';
import { apiCall } from '../../API/apiCall';

export const userActions = {
  login,
  register,
  handleForgotPassword,
  handleRecoverPassword,
};


function login(logData, type) {
  return async dispatch => {
    dispatch(userLoginRequest());

    await apiCall(logData, 'POST', type)
      .then((result) => {
        const userD = JSON.stringify(result);
        AsyncStorage.setItem('userData', userD);
        const token = result.token;
        AsyncStorage.setItem('userToken', token);
        
        dispatch(userLoginSuccess(result));
      })
      .catch((error) => {
        dispatch(userLoginFailure(error));
      })

  }

  function userLoginRequest() {
    return {
      type: ActionTypes.USER_LOGIN_REQUEST,
    }
  }

  function userLoginSuccess(result) {
    return {
      type: ActionTypes.USER_LOGIN_SUCCESS,
      payload: result
    }
  }

  function userLoginFailure(error) {
    return {
      type: ActionTypes.USER_LOGIN_FAILURE,
      payload: error
    }
  }

}


function register(userData, type) {

  return dispatch => {

    dispatch(userRegistrationRequest());
    apiCall(userData, 'POST', type)
      .then((result) => {
        dispatch(userRegistrationSuccess(result));

      })
      .catch((error) => {
        dispatch(userRegistrationFailure(error));
      })
  }

  function userRegistrationRequest() {
    return {
      type: ActionTypes.USER_LOGIN_REQUEST,

    }
  }

  function userRegistrationSuccess(result) {
    return {
      type: ActionTypes.USER_REGISTER_SUCCESS,
      payload: result
    }
  }

  function userRegistrationFailure(error) {
    return {
      type: ActionTypes.USER_REGISTER_FAILURE,
      payload: error
    }
  }
}

function handleForgotPassword(data, type) {

  return dispatch => {

    apiCall(data, 'POST', type)
      .then((result) => {
        dispatch(ForgotPasswordSuccess(result));
      })
      .catch((error) => {
        dispatch(ForgotPasswordFailure(error));
      })
  }
  function ForgotPasswordSuccess(result) {
    return {
      type: ActionTypes.FORGOT_PASSWORD_SUCCESS,
      payload: result
    }
  }
  function ForgotPasswordFailure(error) {
    return {
      type: ActionTypes.FORGOT_PASSWORD_FAILURE,
      payload: error
    }
  }


}

function handleRecoverPassword(data, type) {

  return dispatch => {
    apiCall(data, 'POST', type)
      .then((result) => {
        dispatch(recoverPasswordSuccess(result));
      })
      .catch((error) => {
        dispatch(recoverPasswordFailure(error));
      })
  }

  function recoverPasswordSuccess(data) {
    return {
      type: ActionTypes.RECOVER_PASSWORD_SUCCESS,
      payload: data
    }
  }
  function recoverPasswordFailure(error) {
    return {
      type: ActionTypes.RECOVER_PASSWORD_FAILURE,
      payload: error
    }
  }
}


