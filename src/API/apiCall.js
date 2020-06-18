import {BASE_URL} from './apiConstants';
import {store} from '../redux/store';
import AsyncStorage from '@react-native-community/async-storage';


export const buildHeader = (headerParams) => {
    var header = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
    Object.assign(header, headerParams);
    // console.log("Header: ", header);
    
    return header;
}

export const apiCall = async(data, methodType, urlType) => {
    let secureRequest;

    const userToken = await AsyncStorage.getItem('userToken');
    console.log("user token", userToken);

    if (userToken == null) {
        // console.log('no token')
        secureRequest = buildHeader({})
    }
    else {
        secureRequest = buildHeader({'Authorization': `Bearer ${userToken}`})
    }
    if(data)
        secureRequest = { ...secureRequest};


    if(methodType === "GET"){
        return new Promise((resolve, reject) => {
            fetch(BASE_URL+urlType,{
                method: methodType,
                headers: secureRequest
                
            })
                .then( (response) => response.json())
                .then( (responseJson) => {
                    resolve(responseJson);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }


    if(methodType === "POST" || methodType === "PUT"){
        return new Promise( (resolve, reject) => {
            console.log("In post or put: ", methodType, "urltype: ", urlType, "data: ", JSON.stringify(data));
            
            fetch(BASE_URL+urlType, {
                method: methodType,
                headers: secureRequest,
                body: JSON.stringify(data),
            })
            .then((response) => response.json())   
            .then((responseJson) => {
                console.log("res" , responseJson);
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            });
            
        });
    }

    if(methodType === "DELETE"){
        return new Promise((resolve, reject) => {
            fetch(BASE_URL+urlType,{
                method: methodType,
                headers: secureRequest
                
            })
                .then( (response) => response.json())
                .then( (responseJson) => {
                    resolve(responseJson);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

}