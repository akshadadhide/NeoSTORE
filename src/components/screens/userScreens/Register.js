import PropTypes from "prop-types";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, ActivityIndicator, TouchableHighlight, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import {Input, Item, Radio, CheckBox} from 'native-base';
import { styles } from '../../styles/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleConstants} from '../../styles/Constants';
import {validation, NAME_REGEX, customErrors, MOBILE_REGEX, PASSWORD_REGEX, EMAIL_REGEX} from '../../../utils/Validation';
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

            errors:{},
            
            inputProp: 'regular',

            passIcon: 'eye',
            passwordHide: true,
        }
        this.handleRegister = this.handleRegister.bind(this);
        // this.validatePassword = this.validatePassword.bind(this);
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

    // validatePassword(){
    //     const {pass, confirmPass} = this.state;
    //     if(confirmPass === ''){
    //         alert("Please Confirm the password");
    //     }
    //     else if(pass !== confirmPass){
    //         console.log("in val--- pass:-", pass, " cpass:-", confirmPass);
    //         alert("Both Password should be same");
    //     }
    // }

    /*validation*/
    handleValidation = () => {
        console.log("In validation");
        const {first_name, last_name, phone_no, email, pass, confirmPass,gender} = this.state;
        let {errors} = this.state;
        let errorFlag = false;

        //first name validation
        if(first_name.length === 0 || NAME_REGEX.test(first_name) === false){
            errorFlag =  true;
            const {valueMissing, wrongPattern} = customErrors.first_name;
            errors.first_name = first_name === '' ? valueMissing : wrongPattern;
        }
        else{
            delete errors.first_name;
        }

         //last name validation
         if(last_name.length === 0 || NAME_REGEX.test(last_name) === false){
            errorFlag =  true;
            const {valueMissing, wrongPattern} = customErrors.last_name;
            errors.last_name = last_name === '' ? valueMissing : wrongPattern;
        }
        else{
            delete errors.last_name;
        }

        //phone number validation
        if(phone_no.length === 0 || MOBILE_REGEX.test(phone_no) === false){
            errorFlag = true;
            const {valueMissing, wrongPattern} = customErrors.phone_no;
            errors.phone_no = phone_no === '' ? valueMissing : wrongPattern;
        }
        else{
            delete errors.phone_no;
        }

        //email validation
        if(email.length === 0 || EMAIL_REGEX.test(email) === false){
            errorFlag = true;
            const {valueMissing, wrongPattern} = customErrors.email;
            errors.email = email === '' ? valueMissing : wrongPattern;
        }
        else{
            delete errors.email;
        }
      
        console.log("pass: ", pass, "length: ",pass.length);
        
        //password validation
        if(pass.length < 8 || pass.length > 12){
            errorFlag = true;
            const {valueMissing, minLength} = customErrors.pass;
            errors.pass = pass === '' ? valueMissing : minLength;
        }
        else if(PASSWORD_REGEX.test(pass)){
            errorFlag = true;
            const {wrongPattern} = customErrors.pass;
            errors.pass = wrongPattern;
        }
        else{
            delete errors.pass;
        }

        //confirm password validation
        if(confirmPass.length === 0 || pass !== confirmPass){
            errorFlag = true;
            const {valueMissing, diffPassword} = customErrors.confirmPass;
            errors.confirmPass = confirmPass === '' ? valueMissing : diffPassword;
        }
        else{
            delete errors.confirmPass;
        }

        //gender validation
        if(gender.length === 0){
            errorFlag = true;
            const {valueMissing} = customErrors.gender;
            errors.gender = gender === '' ? valueMissing : '';
        }
        else{
            delete errors.gender;
        }

       
      this.setState({errors});
      console.log("Error: ",errors, " errFlag: ", errorFlag);
      return errorFlag;
      
  
    }
    /*validation*/

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

        let {errors} = this.state;
        const errorFlag = this.handleValidation();
        console.log("Err Flag in submit: ", errorFlag);


            if(errorFlag === false){
                this.props.register(logData,'register');
                const {isRegistered, registrationResult} = this.props;
                // console.log("isReg:",isRegistered, "regRes:",registrationResult);
                
                if(isRegistered === true && registrationResult.status_code === 200 ){
                    // Alert.alert(registrationResult.message);
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
        const {errors} = this.state;

        
        return (
            <ImageBackground source={require('../../../assets/images/background_img.jpg')} style={{width: '100%', height: '100%'}}>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.brandName}>NeoSTORE</Text>
                    {/* <Text style={styles.errorText}>{errors.submitError}</Text> */}

                    <Item regular style={styles.textboxStyle}>
                        <Icon active name='user' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                        <Input value={first_name} style={styles.inputBoxText} 
                                onChangeText={first_name => {this.setState({ first_name }) }} 
                                onBlur={this.handleValidation} 
                                placeholder='First Name' 
                                placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}
                        />
                        
                    </Item>
                    <Text style={styles.errorText}> {errors.first_name}</Text>


                    <Item regular style={styles.textboxStyle}>
                        <Icon active name='user' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                        <Input 
                            value={last_name} 
                            style={styles.inputBoxText} 
                            onChangeText={last_name => {this.setState({ last_name }) }} 
                            onBlur={this.handleValidation} 
                            placeholder='Last name' 
                            placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}
                        />
                    </Item>
                    <Text style={styles.errorText}> {errors.last_name}</Text>


                    <Item regular style={styles.textboxStyle}>
                        <Icon active name='envelope' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                        <Input 
                            value={email} 
                            style={styles.inputBoxText} 
                            keyboardType='email-address' 
                            onChangeText={email => {this.setState({ email }) }} 
                            onBlur={this.handleValidation} 
                            placeholder='Email' 
                            placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}
                        />
                    </Item>
                    <Text style={styles.errorText}> {errors.email}</Text>


                    <Item regular style={styles.textboxStyle}>
                        <Icon active name='lock' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                        <Input 
                            value={pass} 
                            secureTextEntry={passwordHide} 
                            style={styles.inputBoxText} 
                            onChangeText={pass => {this.setState({pass}) }}  
                            onBlur={this.handleValidation} 
                            placeholder='Password' 
                            placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}
                        />
                        <Icon active name={passIcon} style={[styles.textBoxIcon, {alignSelf:'flex-end'}]} size={StyleConstants.ICON_SIZE} onPress={this.setPasswordVisiblility}/>
                    </Item>
                    <Text style={styles.errorText}> {errors.pass}</Text>


                    <Item regular style={styles.textboxStyle}>
                        <Icon active name='lock' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                        <Input 
                            value={confirmPass} 
                            secureTextEntry={passwordHide} 
                            style={styles.inputBoxText} 
                            onChangeText={confirmPass => {this.setState({ confirmPass }) }} 
                            onBlur={this.handleValidation} 
                            placeholder='Confirm Password' 
                            placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}
                        />
                        <Icon active name={passIcon} style={[styles.textBoxIcon, {alignSelf:'flex-end'}]} size={StyleConstants.ICON_SIZE} onPress={this.setPasswordVisiblility}/>
                    </Item>
                    <Text style={styles.errorText}> {errors.confirmPass}</Text>


                    <View style={styles.genderContainer}>
                        <Text style={styles.linkText}> Gender </Text>
                        <Radio color={StyleConstants.COLOR_FFFFFF}  onPress={() => this.setState({ gender: 'M' })} selected={gender == 'M'}/> 
                        <Text style={styles.linkText}> Male </Text>
                        <Radio color={StyleConstants.COLOR_FFFFFF} onPress={() => this.setState({ gender: 'F' })} selected={gender == 'F'}/> 
                        <Text style={styles.linkText}> Female </Text>
                    </View>
                    <Text style={styles.errorText}> {errors.gender}</Text>

                    
                    <Item regular style={styles.textboxStyle}>
                        <Icon active name='mobile' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                        <Input 
                            value={phone_no} 
                            style={styles.inputBoxText} 
                            keyboardType='phone-pad' 
                            onChangeText={phone_no => {this.setState({ phone_no }) }} 
                            onBlur={this.handleValidation} 
                            placeholder='Phone Number' 
                            placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}
                        />
                    </Item>
                    <Text style={styles.errorText}> {errors.phone_no}</Text>


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