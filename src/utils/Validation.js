import {Alert} from 'react-native';

export const PINCODE_REGEX = /^[1-9][0-9]{5}$/;

export const customErrors = {
    address: {
        valueMissing: 'Please enter address',
    },
    pincode: {
        valueMissing: 'Please enter pincode',
        wrongPattern: 'Invalid zipcode'
    },
    city:{
        valueMissing: 'Please enter city',
    },
    state:{
        valueMissing: 'Please enter state',
    },
    country:{
        valueMissing: 'Please enter country',
    },
}

export function validation(fieldName, value){
    const nameRegex = /^[A-Za-z]+$/;
    const phoneRegex = /^[1-9]\d{9}$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    const passwordRegex = /^[a-zA-Z0-9]$/;

    // let errorFlag = false;
    let errorMsg = '';
    


    if(fieldName === 'first_name' && value === ''){
        Alert.alert("first name cannot be empty");
        // return false;
        // errorFlag = true;
        errorMsg = 'required';
        return errorMsg;
        // return {errorFlag, errorMsg}
    }
    
    else if(fieldName === 'first_name' || fieldName === 'last_name'){
        if(!(nameRegex.test(value))){
            Alert.alert("only characters are allowed for firstname and lastname");
            return false;
        }
    }

    else if(fieldName === 'last_name' && value === ''){
        Alert.alert("last name cannot be empty");
        errorMsg = 'required';
        return errorMsg;
    }

    else if(fieldName === 'email' && value === ''){
        Alert.alert("Email cannot be empty");
        errorMsg = 'required';
        return errorMsg;
    }

    else if(fieldName === 'email'){
        if(!emailRegex.test(value)){
            Alert.alert("Please enter valid email id");
            errorMsg = 'Please enter valid email id';
            return errorMsg;
        }
    }

    // if(fieldName === 'password'){
    //     if(!passwordRegex.test(value)){
    //         Alert.alert("Password should contain characters and numbers");
    //     }
    //     else if(value.length < 8 || value.length > 12){
    //         Alert.alert("Password length should be 8 to 12 chars");
    //     }
    //     else{
    //         pwd = value;
    //     }
    // }

    else if(fieldName === 'confirm_password' && value === ''){
        Alert.alert("Please confirm the password");
        errorMsg = 'required';
        return errorMsg;
    }

    // else if(fieldName === 'confirm_password' && value !== ''){
    //     if(!validatePassword){
    //         Alert.alert("Both passwords should be same");
    //     }
    // }

    else if(fieldName === 'phone_no' && value === ''){
        Alert.alert("Please enter phone number");
        errorMsg = 'required';
        return errorMsg;
    }

    else if(fieldName === 'phone_no'){
        if(!phoneRegex.test(value)){
            Alert.alert("Please enter valid phone number");
            errorMsg = 'Please enter valid phone number';
            return errorMsg;
        }
        errorMsg = '';
        return errorMsg;
    }
    else{
        errorMsg = '';
        return errorMsg;
    }
}

// export function validatePassword(password, confirm_password){
//     if(password !== confirm_password){
//         console.log("in val--- pass:-", password, " cpass:-", confirm_password);
//         return false;
//     }
//     else{
//         return true;
//     }
// }