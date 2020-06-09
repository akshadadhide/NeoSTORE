import PropTypes from "prop-types";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, Button, TouchableHighlight, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import {Input, Item, Radio, CheckBox} from 'native-base';
import { styles } from '../../styles/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleConstants} from '../../styles/Constants';
import {validation} from '../../../utils/Validation';
// import {validatePassword} from '../../../utils/Validation';
import {Services} from '../../../API/Services';
import { userActions } from "../../../redux/actions/userActions";


class Register extends Component {

    constructor(){
        super();
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            pass: '',
            confirmPass: '',
            gender: '',
            phone_no: '',
            
            inputProp: 'regular',

            passIcon: 'eye',
            passwordHide: true,
        }
        this.handleRegister = this.handleRegister.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
    }

    setPasswordVisiblility = () => {
        if(this.state.passIcon === 'eye'){
            this.setState({passIcon: 'eye-slash', })
        }
        else{ 
            this.setState({passIcon: 'eye', })
        }
        this.setState({passwordHide: !this.state.passwordHide });
    }

    validatePassword(){
        const {pass, confirmPass} = this.state;
        if(confirmPass === ''){
            alert("Please Confirm the password");
        }
        else if(pass !== confirmPass){
            console.log("in val--- pass:-", pass, " cpass:-", confirmPass);
            alert("Both Password should be same");
        }
    }

    handleRegister(){
        const logData = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            pass: this.state.pass,
            confirmPass: this.state.confirmPass,
            gender: this.state.gender,
            phone_no: this.state.phone_no,
        }
        console.log("form data", logData);

            if(validation){
                this.props.register(logData,'register');
                const {isRegistered, registrationResult} = this.props;
                // console.log("isReg:",isRegistered, "regRes:",registrationResult);
                
                if(isRegistered === true && registrationResult.status_code === 200 ){
                    Alert.alert(registrationResult.message);
                    this.props.navigation.navigate('Login');
                }
                else{
                    Alert.alert(registrationResult.message);
                }
            }
            else{
                Alert.alert('Please check all information is properly filled');
            }
            
    }   

    render() {
        const {first_name, last_name, email, pass, confirmPass, phone_no, gender} = this.state;
        const {passIcon, passwordHide} =  this.state;
        
        return (
            <ImageBackground source={require('../../../assets/images/background_img.jpg')} style={{width: '100%', height: '100%'}}>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.brandName}>NeoSTORE</Text>

                    <Item regular style={styles.textboxStyle}>
                        <Icon active name='user' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                        <Input value={first_name} style={styles.inputBoxText} 
                                onChangeText={first_name => {this.setState({ first_name }) }} 
                                onBlur={ () => validation('first_name', this.state.first_name.trim())} 
                                placeholder='First Name' 
                                placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}/>
                        
                    </Item>

                    <Item regular style={styles.textboxStyle}>
                        <Icon active name='user' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                        <Input value={last_name} style={styles.inputBoxText} onChangeText={last_name => {this.setState({ last_name }) }} onBlur={ () => validation('last_name', this.state.last_name.trim())} placeholder='Last name' placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}/>
                    </Item>

                    <Item regular style={styles.textboxStyle}>
                        <Icon active name='envelope' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                        <Input value={email} style={styles.inputBoxText} onChangeText={email => {this.setState({ email }) }} onBlur={ () => validation('email', this.state.email.trim())} placeholder='Email' placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}/>
                    </Item>

                    <Item regular style={styles.textboxStyle}>
                        <Icon active name='lock' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                        <Input value={pass} secureTextEntry={passwordHide} style={styles.inputBoxText} onChangeText={pass => {this.setState({pass}) }}  onBlur={ () => validation('password', this.state.pass)} placeholder='Password' placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}/>
                        <Icon active name={passIcon} style={[styles.textBoxIcon, {alignSelf:'flex-end'}]} size={StyleConstants.ICON_SIZE} onPress={this.setPasswordVisiblility}/>
                    </Item>

                    <Item regular style={styles.textboxStyle}>
                        <Icon active name='lock' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                        <Input value={confirmPass} secureTextEntry={passwordHide} style={styles.inputBoxText} onChangeText={confirmPass => {this.setState({ confirmPass }) }} onBlur={this.validatePassword} onChange={() => this.validatePassword} placeholder='Confirm Password' placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}/>
                        <Icon active name={passIcon} style={[styles.textBoxIcon, {alignSelf:'flex-end'}]} size={StyleConstants.ICON_SIZE} onPress={this.setPasswordVisiblility}/>
                    </Item>

                    <View style={styles.genderContainer}>
                        <Text style={styles.linkText}> Gender </Text>
                        <Radio color={StyleConstants.COLOR_FFFFFF}  onPress={() => this.setState({ gender: 'M' })} selected={gender == 'M'}/> 
                        <Text style={styles.linkText}> Male </Text>
                        <Radio color={StyleConstants.COLOR_FFFFFF} onPress={() => this.setState({ gender: 'F' })} selected={gender == 'F'}/> 
                        <Text style={styles.linkText}> Female </Text>
                    </View>
                    
                    <Item regular style={styles.textboxStyle}>
                        <Icon active name='mobile' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                        <Input value={phone_no} style={styles.inputBoxText} onChangeText={phone_no => {this.setState({ phone_no }) }} onBlur={ () => validation('phone_no', this.state.phone_no.trim())} placeholder='Phone Number' placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}/>
                    </Item>

                    <View style={{flexDirection:'row'}}>
                        <CheckBox checked={true}  style={styles.checkboxStyle}/>
                        <Text style={[styles.linkText,{fontSize:StyleConstants.FONT_13}]}> I agree the </Text>
                        <TouchableOpacity onPress={() => Alert.alert("Terms and conditions:")}>
                                <Text style={[styles.linkText,{fontSize:StyleConstants.FONT_13, textDecorationLine:'underline'}]}> Terms and Conditions</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <TouchableHighlight disabled={this.state.disabledSubmit} style={styles.button} onPress={this.handleRegister} >
                        <Text style={styles.buttonText}> REGISTER </Text>
                    </TouchableHighlight>

                </View>
            </ScrollView>
            </ImageBackground>
        );
    }
}

Register.propTypes = {
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    confirm_password: PropTypes.string,
    gender: PropTypes.string,
    phone_no: PropTypes.number,
}

function mapState(state){
    const {isRegistered, registrationResult } = state.authReducer
    return {isRegistered, registrationResult};
}

const actionCreators = {
    register: userActions.register,
}

export default connect(mapState, actionCreators)(Register);