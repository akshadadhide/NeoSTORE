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
import Loader from "../../Common/Loader";


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
            confirmPassIcon: 'eye',
            confirmPasswordHide: true,

            showLoader:false,

        }
        this.handleRegister = this.handleRegister.bind(this);
        // this.validatePassword = this.validatePassword.bind(this);
    }

    showLoader = () => { this.setState({ showLoader:true }); };
    hideLoader = () => { this.setState({ showLoader:false }); };

    setPasswordVisiblility = (name) => {

        if(name === 'passIcon'){
            if(this.state.passIcon === 'eye'){
                this.setState({passIcon: 'eye-slash', })
            }
            else{ 
                this.setState({passIcon: 'eye', })
            }
            this.setState({passwordHide: !this.state.passwordHide });
        }
        else if(name === 'confirmPassIcon'){
            if(this.state.confirmPassIcon === 'eye'){
                this.setState({confirmPassIcon: 'eye-slash', })
            }
            else{ 
                this.setState({confirmPassIcon: 'eye', })
            }
            this.setState({confirmPasswordHide: !this.state.confirmPasswordHide });
        }
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
    handleValidation = (field_name) => {
        console.log("In validation");
        const {first_name, last_name, phone_no, email, pass, confirmPass,gender} = this.state;
        let {errors} = this.state;
        let errorFlag = true;

        //first name validation
        if(field_name === 'first_name'){
            if(first_name.length === 0 || NAME_REGEX.test(first_name) === false){
                errorFlag =  true;
                const {valueMissing, wrongPattern} = customErrors.first_name;
                errors.first_name = first_name === '' ? valueMissing : wrongPattern;
            }
            else{
                errorFlag =  false;
                delete errors.first_name;
            }
        }

         //last name validation
        if(field_name === 'last_name'){
            if(last_name.length === 0 || NAME_REGEX.test(last_name) === false){
                errorFlag =  true;
                const {valueMissing, wrongPattern} = customErrors.last_name;
                errors.last_name = last_name === '' ? valueMissing : wrongPattern;
            }
            else{
                errorFlag =  false;
                delete errors.last_name;
            }
        }

        //phone number validation
        if(field_name === 'phone_no'){
            if(phone_no.length === 0 || MOBILE_REGEX.test(phone_no) === false){
                errorFlag = true;
                const {valueMissing, wrongPattern} = customErrors.phone_no;
                errors.phone_no = phone_no === '' ? valueMissing : wrongPattern;
            }
            else{
                errorFlag =  false;
                delete errors.phone_no;
            }
        }

        //email validation
        if(field_name === 'email'){
            if(email.length === 0 || EMAIL_REGEX.test(email) === false){
                errorFlag = true;
                const {valueMissing, wrongPattern} = customErrors.email;
                errors.email = email === '' ? valueMissing : wrongPattern;
            }
            else{
                errorFlag =  false;
                delete errors.email;
            }
        }
      
        console.log("pass: ", pass, "length: ",pass.length);
        
        //password validation
        if(field_name === 'pass'){
            if(pass.length < 8 || pass.length > 12){
                errorFlag = true;
                const {valueMissing, minLength} = customErrors.pass;
                errors.pass = pass === '' ? valueMissing : minLength;
            }
            else{
                errorFlag =  false;
                delete errors.pass;
            }
        }

        //confirm password validation
        if(field_name === 'confirmPass'){
            if(confirmPass.length === 0 || pass !== confirmPass){
                errorFlag = true;
                const {valueMissing, diffPassword} = customErrors.confirmPass;
                errors.confirmPass = confirmPass === '' ? valueMissing : diffPassword;
            }
            else{
                errorFlag =  false;
                delete errors.confirmPass;
            }
        }

        //gender validation
        if(gender.length === 0){
            errorFlag = true;
            const {valueMissing} = customErrors.gender;
            errors.gender = gender === '' ? valueMissing : '';
        }
        else{
            errorFlag =  false;
            delete errors.gender;
        }

       
      this.setState({errors});
      console.log("Error: ",errors, " errFlag: ", errorFlag);
      return errorFlag;
      
  
    }
    /*validation*/

    handleRegister(){
        this.showLoader();
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
        this.hideLoader();
            
    }   

    render() {
        const {first_name, last_name, email, pass, confirmPass, phone_no, gender} = this.state;
        const {passIcon, passwordHide, confirmPassIcon, confirmPasswordHide} =  this.state;
        const {errors} = this.state;

        
        return (
            <ImageBackground source={require('../../../assets/images/background_img.jpg')} style={{width: '100%', height: '100%'}}>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.brandName}>NeoSTORE</Text>
                    {/* <Text style={styles.errorText}>{errors.submitError}</Text> */}

                    <Item regular style={[styles.textboxStyle,{marginBottom:0}]}>
                        <Icon active name='user' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                        <Input value={first_name.trim()} style={styles.inputBoxText} 
                                onChangeText={first_name => {this.setState({ first_name }) }} 
                                onBlur={() => this.handleValidation('first_name')} 
                                placeholder='First Name' 
                                placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}
                        />
                        
                    </Item>
                    <Text style={styles.errorText}> {errors.first_name}</Text>


                    <Item regular style={[styles.textboxStyle,{marginBottom:0}]}>
                        <Icon active name='user' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                        <Input 
                            value={last_name.trim()} 
                            style={styles.inputBoxText} 
                            onChangeText={last_name => {this.setState({ last_name }) }} 
                            onBlur={() => this.handleValidation('last_name')} 
                            placeholder='Last name' 
                            placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}
                        />
                    </Item>
                    <Text style={styles.errorText}> {errors.last_name}</Text>


                    <Item regular style={[styles.textboxStyle,{marginBottom:0}]}>
                        <Icon active name='envelope' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                        <Input 
                            value={email.trim()} 
                            style={styles.inputBoxText} 
                            keyboardType='email-address' 
                            onChangeText={email => {this.setState({ email }) }} 
                            onBlur={() => this.handleValidation('email')} 
                            placeholder='Email' 
                            placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}
                        />
                    </Item>
                    <Text style={styles.errorText}> {errors.email}</Text>


                    <Item regular style={[styles.textboxStyle,{marginBottom:0}]}>
                        <Icon active name='lock' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                        <Input 
                            value={pass} 
                            secureTextEntry={passwordHide} 
                            style={styles.inputBoxText} 
                            onChangeText={pass => {this.setState({pass}) }}  
                            onBlur={() => this.handleValidation('pass')} 
                            placeholder='Password' 
                            placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}
                        />
                        <Icon active name={passIcon} style={[styles.textBoxIcon, {alignSelf:'flex-end'}]} size={StyleConstants.ICON_SIZE} onPress={() => this.setPasswordVisiblility('passIcon')}/>
                    </Item>
                    <Text style={styles.errorText}> {errors.pass}</Text>


                    <Item regular style={[styles.textboxStyle,{marginBottom:0}]}>
                        <Icon active name='lock' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                        <Input 
                            value={confirmPass} 
                            secureTextEntry={confirmPasswordHide} 
                            style={styles.inputBoxText} 
                            onChangeText={confirmPass => {this.setState({ confirmPass }) }} 
                            onBlur={() => this.handleValidation('confirmPass')} 
                            placeholder='Confirm Password' 
                            placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}
                        />
                        <Icon active name={confirmPassIcon} style={[styles.textBoxIcon, {alignSelf:'flex-end'}]} size={StyleConstants.ICON_SIZE} onPress={() => this.setPasswordVisiblility('confirmPassIcon')}/>
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

                    
                    <Item regular style={[styles.textboxStyle,{marginBottom:0}]}>
                        <Icon active name='mobile' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                        <Input 
                            value={phone_no.trim()} 
                            style={styles.inputBoxText} 
                            keyboardType='phone-pad' 
                            onChangeText={phone_no => {this.setState({ phone_no }) }} 
                            onBlur={() => this.handleValidation('phone_no')} 
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

        { this.state.showLoader && <Loader /> }
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