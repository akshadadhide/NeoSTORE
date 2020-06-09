import React, { Component } from 'react';
import {View, Text, ScrollView, TextInput, TouchableHighlight, Alert} from 'react-native';
import CustomHeader from '../../Common/Header';
import { styles, WINDOW_WIDTH } from '../../styles/Styles';
import { StyleConstants } from '../../styles/Constants';
import AddressValidation from '../../../utils/AddrValidation';
import {loggedInUserActions} from '../../../redux/actions/LoggedInUserActions';
import {connect} from 'react-redux';
import { PINCODE_REGEX, customErrors } from '../../../utils/Validation';

class AddAddress extends Component {

    constructor(){
        super();
        this.state ={
            address: '',
            pincode :'',
            city:'',
            state:'',
            country:'',
            
            errorMsg:'',

            errors:{}
            
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    goBack = () => this.props.navigation.goBack();

    handleValidation = () =>{
        // const errorMsg = AddressValidation(fieldName, value);
        // this.setState({errorMsg: errorMsg});
        // console.log("error msg", errorMsg);

        const {address,pincode,city,state,country} = this.state;
        const {errors} =  this.state;
        let errorFlag = false;

        if(address.trim() === ''){
            errorFlag = true;
            const {valueMissing} = customErrors.address;
            errors.address = valueMissing;
        }
        else{
            delete errors.address;
        }
    
        if(pincode.length === 0 || (!PINCODE_REGEX.test(pincode)) ){
            errorFlag = true;
            const {valueMissing,wrongPattern} = customErrors.pincode;
            errors.pincode = pincode === '' ? valueMissing : wrongPattern;
        }
        else{
            delete errors.pincode;
        }
    
        if(city.trim() === ''){
            errorFlag = true;
            const {valueMissing} = customErrors.city;
            errors.city =  valueMissing;
        }
        else{
            delete errors.city;
        }
    
        if(state.trim() === ''){
            errorFlag = true;
            const {valueMissing} = customErrors.state;
            errors.state =  valueMissing;
        }
        else{
            delete errors.state;
        }
    
        if(country.trim() === ''){
            errorFlag = true;
            const {valueMissing} = customErrors.country;
            errors.country = valueMissing;
        }
        else{
            delete errors.country;
        }

        this.setState({errors});
        console.log("Errors: ", errors, "ErrorFlag: ", errorFlag);
        
        
    }

    async handleSubmit(){
        const address = {
            address: this.state.address,
            pincode: this.state.pincode,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
        }
        const errorFlag = this.handleValidation();

        if(errorFlag === false){
            await this.props.addAddress(address,'address');
            const {addAddrResponse} = this.props;

            console.log("kdsjf ",addAddrResponse);
            

            if(addAddrResponse.status_code === 200){
                this.props.navigation.navigate('AddressList');
            }
            else{
                Alert.alert('Something went wrong');
            }
        }
        else{
            Alert.alert("Please check all information is properly filled");
        }

        
    }

    render() {
        const {address, pincode, city, state, country } = this.state;
        console.log(address, pincode, city);
        const {errors} = this.state;
        

        return (
            <View style={{flex:1}}>
                <CustomHeader iconName="arrow-left" handleLeftIconClick={this.goBack} headerTitle="Add Address" rightIconName="search"/>

                <ScrollView style={{flex:1,  backgroundColor:StyleConstants.COLOR_EDEDED}}>

                    <View style={{padding: StyleConstants.PADDING,}}>
                        <View>
                            <Text style={styles.productDetailCategory}> Address </Text>
                            <Text style={{color:StyleConstants.COLOR_FE3F3F}}> {errors.address}</Text>
                        </View>
                        <TextInput 
                            value={address}
                            style={[styles.addressInput, {height: 150, marginTop:5}]}
                            onChangeText = {address => {this.setState({address})}}
                            onBlur ={this.handleValidation}
                        />


                        <View style={styles.rowSpaceBetween}>
                            <View>
                                <View>
                                    <Text style={styles.productDetailCategory}> City </Text>
                                    <Text style={{color:StyleConstants.COLOR_FE3F3F}}> {errors.city}</Text>
                                </View> 
                                <TextInput 
                                    value={city}
                                    onChangeText = {city => {this.setState({city})}}
                                    onBlur ={this.handleValidation}
                                    style={[styles.addressInput, {width: WINDOW_WIDTH/2.5, marginTop:5}]}        
                                />
                            </View>

                            <View>
                                <View>
                                    <Text style={styles.productDetailCategory}> State </Text>
                                    <Text style={{color:StyleConstants.COLOR_FE3F3F}}> {errors.state}</Text>
                                </View>
                                <TextInput 
                                    value={state}
                                    onChangeText = {state => {this.setState({state})}}
                                    onBlur ={this.handleValidation}
                                    style={[styles.addressInput, {width: WINDOW_WIDTH/2.5, marginTop:5}]}        
                                />
                            </View>
                        </View>

                        <View style={styles.rowSpaceBetween}>
                            <View>
                            <View>
                                <Text style={styles.productDetailCategory}> ZIP CODE </Text>
                                <Text style={{color:StyleConstants.COLOR_FE3F3F}}> {errors.pincode}</Text>
                            </View>
                                <TextInput
                                    value={pincode}
                                    onChangeText = {pincode => {this.setState({pincode})}}
                                    keyboardType='number-pad'
                                    onBlur ={this.handleValidation}
                                    style={[styles.addressInput, {width: WINDOW_WIDTH/2.5, marginTop:5}]}        
                                />
                            </View>

                            <View>
                            <View>
                                <Text style={styles.productDetailCategory}> COUNTRY  </Text>
                                <Text style={{color:StyleConstants.COLOR_FE3F3F}}> {errors.country}</Text>
                            </View>
                                <TextInput 
                                    value={country}
                                    onChangeText = {country => {this.setState({country})}}
                                    onBlur ={this.handleValidation}
                                    style={[styles.addressInput, {width: WINDOW_WIDTH/2.5, marginTop:5}]}        
                                />
                            </View>
                        </View>
                    </View>

                </ScrollView>

                <View style={{backgroundColor: StyleConstants.COLOR_FFFFFF}}>
                    <TouchableHighlight
                     style={{backgroundColor:StyleConstants.COLOR_E91C1A, height:70,margin:7, borderRadius:5,}}
                     onPress={this.handleSubmit} 
                     >
                        <Text style={[styles.buttonText, {color: StyleConstants.COLOR_FFFFFF, alignSelf: 'center',}]}> SAVE ADDRESS </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

function mapState(state){
    const {addAddrResponse} = state.loggedInUserReducer;
    return {addAddrResponse};
}

const actionCreators = {
    addAddress: loggedInUserActions.addAddress,
}

export default connect(mapState, actionCreators)(AddAddress);