import React, { Component } from 'react';
import {View, Text, ScrollView, TextInput, TouchableHighlight, Alert} from 'react-native';
import CustomHeader from '../../Common/Header';
import { styles, WINDOW_WIDTH } from '../../styles/Styles';
import { StyleConstants } from '../../styles/Constants';
import AddressValidation from '../../../utils/AddrValidation';
import {loggedInUserActions} from '../../../redux/actions/LoggedInUserActions';
import {connect} from 'react-redux';

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
            
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    goBack = () => this.props.navigation.goBack();

    handleValidation = (fieldName, value) =>{
        const errorMsg = AddressValidation(fieldName, value);
        this.setState({errorMsg: errorMsg});
        console.log("error msg", errorMsg);
        
    }

    async handleSubmit(){
        const address = {
            address: this.state.address,
            pincode: this.state.pincode,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
        }
        await this.props.addAddress(address,'address');
        const {addAddrResponse} = this.props;

        if(addAddrResponse.status_code === 200){
            this.props.navigation.navigate('AddressList');
        }
        else{
            Alert.alert('Something went wrong');
        }

        
    }

    render() {
        const {address, pincode, city, state, country } = this.state;
        console.log(address, pincode, city);
        

        return (
            <View style={{flex:1}}>
                <CustomHeader iconName="arrow-left" handleLeftIconClick={this.goBack} headerTitle="Add Address" rightIconName="search"/>

                <ScrollView style={{flex:1,  backgroundColor:StyleConstants.COLOR_EDEDED}}>

                    <View style={{padding: StyleConstants.PADDING,}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.productDetailCategory}> Address </Text>
                            <Text> {this.state.errorMsg}</Text>
                        </View>
                        <TextInput 
                            value={address}
                            style={[styles.addressInput, {height: 150}]}
                            onChangeText = {address => {this.setState({address})}}
                            onBlur ={() => this.handleValidation('address', this.state.address.trim())}
                        />

                        {/* <Text style={styles.productDetailCategory}> Landmark </Text>
                        <TextInput 
                            style={styles.addressInput}
                        /> */}

                        <View style={styles.rowSpaceBetween}>
                            <View>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.productDetailCategory}> City </Text>
                                    <Text> {this.state.errorMsg}</Text>
                                </View> 
                                <TextInput 
                                    value={city}
                                    onChangeText = {city => {this.setState({city})}}
                                    onBlur ={() => this.handleValidation('city', this.state.city.trim())}
                                    style={[styles.addressInput, {width: WINDOW_WIDTH/2.5}]}        
                                />
                            </View>

                            <View>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.productDetailCategory}> State </Text>
                                    <Text> {this.state.errorMsg}</Text>
                                </View>
                                <TextInput 
                                    value={state}
                                    onChangeText = {state => {this.setState({state})}}
                                    onBlur ={() => this.handleValidation('state', this.state.state.trim())}
                                    style={[styles.addressInput, {width: WINDOW_WIDTH/2.5}]}        
                                />
                            </View>
                        </View>

                        <View style={styles.rowSpaceBetween}>
                            <View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={styles.productDetailCategory}> ZIP CODE </Text>
                                <Text> {this.state.errorMsg}</Text>
                            </View>
                                <TextInput
                                    value={pincode}
                                    onChangeText = {pincode => {this.setState({pincode})}}
                                    onBlur ={() => this.handleValidation('pincode', this.state.pincode.trim())}
                                    style={[styles.addressInput, {width: WINDOW_WIDTH/2.5}]}        
                                />
                            </View>

                            <View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={styles.productDetailCategory}> COUNTRY  </Text>
                                <Text> {this.state.errorMsg}</Text>
                            </View>
                                <TextInput 
                                    value={country}
                                    onChangeText = {country => {this.setState({country})}}
                                    onBlur ={() => this.handleValidation('country', this.state.country.trim())}
                                    style={[styles.addressInput, {width: WINDOW_WIDTH/2.5}]}        
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