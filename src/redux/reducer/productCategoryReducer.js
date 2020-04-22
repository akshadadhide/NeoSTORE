import {ActionTypes} from '../actions/ActionTypes';

const initialState = {
    error:'',
    images: [],
    isLoading: true,
    categoryId:[],
    productList: [],
    productDetails:[],
    productRatingRes:{}
};

export function productCategoryReducer(state = initialState, action){

    switch(action.type){
        case ActionTypes.GET_CATEGORY_SUCCESS:{
            // console.log(action.payload);
            return {...state, images:[...action.payload], isLoading:false};
        }

        case ActionTypes.GET_CATEGORY_FAILURE:
            return {...state, error:action.payload};

        case ActionTypes.GET_CATEGORY_ID:
            return {...state, categoryId:[...action.payload]}

        /*product list */
        case ActionTypes.GET_PRODUCT_LIST_REQUEST:
            return {...state, isLoading:true}

        case ActionTypes.GET_PRODUCT_LIST_SUCCESS:
            return {...state, isLoading:false, productList:[...action.payload]}

        case ActionTypes.GET_PRODUCT_LIST_FAILURE:
            return {}
        /*product list */
        

        /*product detail */
        case ActionTypes.GET_PRODUCT_DETAILS_SUCCESS:
            return {...state, isLoading:false, productDetails:[...action.payload]}

        case ActionTypes.GET_PRODUCT_DETAILS_FAILURE:
            return {...state, error:action.payload}
        /*product detail */

        /*product star rating */
        case ActionTypes.RATE_TO_PRODUCT:
            return {...state, productRatingRes: action.payload}

        /*product star rating */

        default:
            return {};
    }
}