import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import { apiCall } from '../../API/apiCall';

function TermsAndCond() {
    let txt;
    useEffect( () => {
        fetch('http://180.149.241.208:3022/2019-06-28T06-10-29.263ZTerms_and_Conditions.pdf')
        .then((r) => r.text())
        .then(text  => {
            // txt = text;
            console.log(text);
        });  
    });
    return (
        <View>
            <Text> {txt} </Text>
        </View>
    );
}

export default TermsAndCond;