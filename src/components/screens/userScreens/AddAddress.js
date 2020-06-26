import React, { Component } from 'react';
import {View, Text, ScrollView, TextInput, TouchableHighlight, Alert} from 'react-native';
import CustomHeader from '../../Common/Header';
import { styles, WINDOW_WIDTH } from '../../styles/Styles';
import { StyleConstants } from '../../styles/Constants';
import {loggedInUserActions} from '../../../redux/actions/LoggedInUserActions';
import {connect} from 'react-redux';
import { PINCODE_REGEX, customErrors } from '../../../utils/Validation';
import Loader from '../../Common/Loader';

class AddAddress extends Component {

    constructor(){
        super();
        this.state ={
            address: '',
            pincode :'',
            city:'',
            state:'',
            country:'',
            errors:{},
            showLoader:false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    goBack = () => this.props.navigation.goBack();
    showLoader = () => { this.setState({ showLoader:true }); };
    hideLoader = () => { this.setState({ showLoader:false }); };

    handleValidation = (field_name, value) =>{

        const {address,pincode,city,state,country} = this.state;
        const {errors} =  this.state;
        let errorFlag = true;

        if(field_name === 'address'){
            if(value.trimRight() === ''){
                errorFlag = true;
                errors.address = 'Required';

            }
            else{
                errorFlag = false;
                delete errors.address;
            }
        }
    
        if(field_name === 'pincode'){
            if(value === '' || (!PINCODE_REGEX.test(value)) ){
                errorFlag = true;
                const {valueMissing,wrongPattern} = customErrors.pincode;
                errors.pincode = value === '' ? valueMissing : wrongPattern;
            }
            else{
                errorFlag = false;
                delete errors.pincode;
            }
        }
    
        if(field_name === 'city'){
            if(value === ''){
                errorFlag = true;
                errors.city = 'Required';

            }
            else{
                errorFlag = false;
                delete errors.city;
            }
        }
    
        if(field_name === 'state'){
            if(value === ''){
                errorFlag = true;
                errors.state =  'Required';

            }
            else{
                errorFlag = false;
                delete errors.state;
            }
        }
    
        if(field_name === 'country'){
            if(value === ''){
                errorFlag = true;
                errors.country = 'Required';

            }
            else{
                errorFlag = false;
                delete errors.country;
            }
        }

        this.setState({errors});
        return errorFlag;
        
    }

    async handleSubmit(){
        this.showLoader();
        const address = {
            address: this.state.address,
            pincode: this.state.pincode,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
        }
        const errorFlag = (this.handleValidation('address',this.state.address) 
                            || this.handleValidation('city',this.state.city) || 
                            this.handleValidation('state',this.state.state) || 
                            this.handleValidation('pincode',this.state.pincode) 
                            || this.handleValidation('country',this.state.country)
        );

        if(errorFlag === false && JSON.stringify(this.state.errors).length <= 2){
            await this.props.addAddress(address,'address');

            setTimeout(()=> {
                const {addAddrResponse} = this.props;
                console.log("addAddrResponse: ",addAddrResponse);
                
                this.hideLoader();
                if(addAddrResponse !== undefined){
                    if(addAddrResponse.status_code === 200){
                        (addAddrResponse.message !== undefined && addAddrResponse.message !== '') ?
                        (Alert.alert(addAddrResponse.message)) :
                        (Alert.alert("Address saved successfully!!"))
                        this.props.navigation.navigate('AddressList');
                    }
                    else{
                        (addAddrResponse.error_message !== undefined && addAddrResponse.error_message !== '') ?
                        (Alert.alert(addAddrResponse.error_message)) :
                        (Alert.alert('Something went wrong!!!Please try again'))
                    }
                }
                else{
                    Alert.alert('Something went wrong!!!Please try again');
                }
            },7000);
            
        }
        else{
            this.hideLoader();
            Alert.alert("Please check all information is properly filled");
        }

        
    }

    render() {
        const {address, pincode, city, state, country } = this.state;
        const {errors} = this.state;
        

        return (
            <View style={{flex:1}}>
                <CustomHeader iconName="arrow-left" handleLeftIconClick={this.goBack} headerTitle="Add Address"/>

                <ScrollView contentContainerStyle={{backgroundColor:StyleConstants.COLOR_EDEDED, padding: StyleConstants.PADDING,}}>

                    {/* <View style={{padding: StyleConstants.PADDING,}}> */}
                        <View>
                            <Text style={styles.productDetailCategory}> Address </Text>
                            <Text style={[styles.errorText,{color:StyleConstants.COLOR_FE3F3F,fontWeight:'normal'}]}> {errors.address}</Text>
                        </View>
                        <TextInput 
                            value={address.trimLeft()}
                            style={[styles.addressInput, {height: 150, marginTop:5}]}
                            onChangeText = {address => {this.setState({address})}}
                            // onKeyPress ={() => this.handleValidation('address')}
                            onChange ={(event) => this.handleValidation('address',event.nativeEvent.text)}
                            onBlur ={() => this.handleValidation('address',this.state.address)}
                        />


                        <View style={styles.rowSpaceBetween}>
                            <View style={{width: (WINDOW_WIDTH/2)-30}}>
                                <View>
                                    <Text style={styles.productDetailCategory}> City </Text>
                                    <Text style={styles.addrsErrorText}> {errors.city}</Text>
                                </View> 
                                <TextInput 
                                    value={city.trim()}
                                    onChangeText = {city => {this.setState({city})}}
                                    onChange ={(event) => this.handleValidation('city',event.nativeEvent.text)}
                                    onBlur ={() => this.handleValidation('city', this.state.city)}
                                    style={[styles.addressInput, {width: (WINDOW_WIDTH/2)-30, marginTop:5}]}        
                                />
                            </View>

                            <View style={{width: (WINDOW_WIDTH/2)-30}}>
                                <View>
                                    <Text style={styles.productDetailCategory}> State </Text>
                                    <Text style={styles.addrsErrorText}> {errors.state}</Text>
                                </View>
                                <TextInput 
                                    value={state.trim()}
                                    onChangeText = {state => {this.setState({state})}}
                                    onChange ={(event) => this.handleValidation('state',event.nativeEvent.text)}
                                    onBlur ={() => this.handleValidation('state', this.state.state)}
                                    style={[styles.addressInput, {width: (WINDOW_WIDTH/2)-30, marginTop:5}]}        
                                />
                            </View>
                        </View>

                        <View style={styles.rowSpaceBetween}>
                            <View style={{width: (WINDOW_WIDTH/2)-30}}>
                                <View>
                                    <Text style={styles.productDetailCategory}> ZIP CODE </Text>
                                    <Text style={styles.addrsErrorText}> {errors.pincode}</Text>
                                </View>
                                <TextInput
                                    value={pincode.trim()}
                                    onChangeText = {pincode => {this.setState({pincode})}}
                                    keyboardType='number-pad'
                                    maxLength={6}
                                    onChange ={(event) => this.handleValidation('pincode', event.nativeEvent.text)}
                                    onBlur ={() => this.handleValidation('pincode',this.state.pincode)}
                                    style={[styles.addressInput, {width: (WINDOW_WIDTH/2)-30, marginTop:5}]}        
                                />
                            </View>

                            <View style={{width: (WINDOW_WIDTH/2)-30}}>
                                <View>
                                    <Text style={styles.productDetailCategory}> COUNTRY  </Text>
                                    <Text style={styles.addrsErrorText}> {errors.country}</Text>
                                </View>
                                <TextInput 
                                    value={country.trim()}
                                    onChangeText = {country => {this.setState({country})}}
                                    onChange ={(event) => this.handleValidation('country',event.nativeEvent.text)}
                                    onBlur ={() => this.handleValidation('country',this.state.country)}
                                    style={[styles.addressInput, {width:(WINDOW_WIDTH/2)-30, marginTop:5}]}        
                                />
                            </View>
                        </View>
                    {/* </View> */}

                </ScrollView>

                <View style={{backgroundColor: StyleConstants.COLOR_FFFFFF}}>
                    <TouchableHighlight
                     style={{backgroundColor:StyleConstants.COLOR_E91C1A, height:70,margin:7, borderRadius:5,}}
                     onPress={this.handleSubmit} 
                     >
                        <Text style={[styles.buttonText, {color: StyleConstants.COLOR_FFFFFF, alignSelf: 'center',}]}> SAVE ADDRESS </Text>
                    </TouchableHighlight>
                </View>
                {(this.state.showLoader) && <Loader />}
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