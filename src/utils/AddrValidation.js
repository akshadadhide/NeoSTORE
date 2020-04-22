
export default function AddressValidation(fieldName, value){
    let errorMsg;
    const zipCodeRegex = /^[1-9]\d{5}$/;

    if(fieldName == 'address' && value == ''){
        return errorMsg = '*required';
    }

    if(fieldName == 'pincode' && value == ''){
        return errorMsg = '*required';
    }
    else if(fieldName == 'pincode' && value != ''){
        if(!zipCodeRegex.test(value)){
            return errorMsg = 'please enter valid zipcode';
        }
    }

    if(fieldName == 'city' && value == ''){
        return errorMsg = '*required';
    }

    if(fieldName == 'state' && value == ''){
        return errorMsg = '*required';
    }

    if(fieldName == 'country' && value == ''){
        return errorMsg = '*required';
    }
    else{
        return errorMsg = 'correct';
    }
}