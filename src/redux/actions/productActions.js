import {ActionTypes} from '../actions/ActionTypes';
import {BASE_URL} from '../../API/apiConstants';
import {apiCall} from '../../API/apiCall';

export const productActions = {
    updateProductRating,
    getAllProducts,
}

export  function getCarouselImages(){
    return async dispatch => {
        const result = await apiCall(null, 'GET', 'getAllCategories');
        let dataSource = result.category_details;
        let categoryId = dataSource.map((value) => {return value.category_id});
        let imgNames = dataSource.map((value) => {return value.product_image})
        let imgUrls = imgNames.map( (value) => BASE_URL.concat(value));
        let imgs = [...imgUrls];
        dispatch(getCategoryId(categoryId));
        dispatch(getCategorySuccess(imgs));
    }

    function getCategorySuccess(imgData) {
        return {
          type: ActionTypes.GET_CATEGORY_SUCCESS,
          payload: imgData,
        }
    }

    function getCategoryId(categoryId) {
        return {
          type: ActionTypes.GET_CATEGORY_ID,
          payload: categoryId,
        }
    }

}

export function getProductList(type){
    return async dispatch => {
        const result = await apiCall(null, 'GET', type);
        let productList =  [...result.product_details];
        dispatch(getProductListSuccess(productList));
    }

    function getProductListSuccess(productList){
        return {
            type: ActionTypes.GET_PRODUCT_LIST_SUCCESS,
            payload: productList
        }
    }
}

function updateProductRating(data, type){
    return dispatch =>{
        apiCall(data, 'PUT', type)
            .then((result) => {
                dispatch(rateToProduct(result));
                
            })
            .catch((error) => {
               console.log(error);
            })
    }

    function rateToProduct(result){
        return {
            type: ActionTypes.RATE_TO_PRODUCT,
            payload: result
        }
    }
}

export function getProductDetails(type){
    return async dispatch => {
        const result = await apiCall(null, 'GET', type);
        let productDetails = [...result.product_details];
        dispatch(getProductDetailsSuccess(productDetails));
    }

    function getProductDetailsSuccess(productDetails){
        return {
            type: ActionTypes.GET_PRODUCT_DETAILS_SUCCESS,
            payload: productDetails
        }
    }
    function getProductDetailsFailure(error){
        return {
            type: ActionTypes.GET_PRODUCT_DETAILS_FAILURE,
            payload: error
        }
    }
}

export function getAllProducts(type){
    return async dispatch => {
        const result =  await apiCall(null, 'GET', type);
        let allProducts =  [...result.product_details];
        dispatch(getProductListSuccess(allProducts));
    }

    function getProductListSuccess(allProducts){
        return {
            type: ActionTypes.GET_ALL_PRODUCTS_SUCCESS,
            payload: allProducts
        }
    }
}



