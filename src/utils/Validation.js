import {Alert} from 'react-native';

export const PINCODE_REGEX = /^[1-9][0-9]{5}$/;
export const EMAIL_REGEX = /^[A-Za-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
export const NAME_REGEX = /^[a-zA-Z '.-]+$/;
export const MOBILE_REGEX = /^\d{10}$/;


export const customErrors = {
    first_name: {
        valueMissing: 'Please enter your first Name',
        wrongPattern: 'Invalid first name'
    },
    last_name: {
        valueMissing: 'Please enter your last Name',
        wrongPattern: 'Invalid last name'
    },
    phone_no: {
        valueMissing: 'Please enter your phone number',
        wrongPattern: 'Invalid phone number'
    },
    email: {
        valueMissing: 'Please enter your email id',
        wrongPattern: 'Invalid email id'
    },
    pass: {
        valueMissing: 'Please enter password',
        wrongPattern: 'password should contain only alphabets and numbers',
        minLength: 'password length should be between 8 to 12 characters'
    },
    confirmPass: {
        valueMissing: 'Please confirm password',
        diffPassword: 'password should match with the above password'
    },
    gender: {
        valueMissing: 'Please select gender',
    },
    birthDate: {
        valueMissing: 'Please enter birth date',
    },
    address: {
        valueMissing: 'Please enter address',
    },
    pincode: {
        valueMissing: 'Required',
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
    otpCode:{
        valueMissing: 'Please enter otp',
    }
}

export function validation(fieldName, value){
    const nameRegex = /^[A-Za-z]+$/;
    const phoneRegex = /^[1-9]\d{9}$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    const passwordRegex = /^[a-zA-Z0-9]$/;

    let errorMsg = '';
    


    if(fieldName === 'first_name' && value === ''){
        Alert.alert("first name cannot be empty");
        errorMsg = 'required';
        return errorMsg;
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


    else if(fieldName === 'confirm_password' && value === ''){
        Alert.alert("Please confirm the password");
        errorMsg = 'required';
        return errorMsg;
    }

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
