import {ActionTypes} from '../actions/ActionTypes';

const initialState = {
    res:{},
    errorMsg:'',
}

export function orderReducer(state = initialState, action){

    switch(action.type){
        case ActionTypes.PLACE_ORDER_SECCESS:
            return {...state, res: action.payload}

        case ActionTypes.PLACE_ORDER_FAILURE:
            return {...state, errorMsg:action.payload}

        default: 
            return {}
    }
}