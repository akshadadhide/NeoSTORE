import PropTypes from "prop-types";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text,RefreshControl, ActivityIndicator, TouchableHighlight, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import {Input, Item, Radio, CheckBox} from 'native-base';
import { styles, WINDOW_HEIGHT } from '../../styles/Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleConstants} from '../../styles/Constants';
import {validation, NAME_REGEX, customErrors, MOBILE_REGEX, PASSWORD_REGEX, EMAIL_REGEX} from '../../../utils/Validation';
import { userActions } from "../../../redux/actions/userActions";
import Loader from "../../Common/Loader";
import Modal from 'react-native-modal';


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
            isChecked: false,

            errors:{},
            isRefreshing: false,
            passIcon: 'eye',
            passwordHide: true,
            confirmPassIcon: 'eye',
            confirmPasswordHide: true,
            modalVisible: false,
            showLoader:false,

        }
        this.handleRegister = this.handleRegister.bind(this);
    }
    
    showLoader = () => { this.setState({ showLoader:true }); };
    hideLoader = () => { this.setState({ showLoader:false }); };

    /** 
     * function to handle the visibility of terms and condotions modal
     * @param {boolean} visible this is the true or false value to set the modal visibility
    */
    setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}
    
    onRefresh = () => {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            this.forceUpdate();
            this.setState({isRefreshing:false});
        },2000);

    }

    /** 
     * function to show and hide the password onPress of icon
     * @param {string} name this is the name of the icon to handle the onPress and visibility of password
    */
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

    /** 
     * function to handle the validation
     * @param {string} field_name this is the input field name
     * @param {string / number} value this is the input field value
    */
    handleValidation = (field_name, value) => {
        const {first_name, last_name, phone_no, email, pass, confirmPass,gender} = this.state;
        let {errors} = this.state;
        let errorFlag = true;
        
        //first name validation
        if(field_name === 'first_name'){
            if(value === '' || NAME_REGEX.test(value) === false){
                errorFlag =  true;
                const {valueMissing, wrongPattern} = customErrors.first_name;
                errors.first_name = value === '' ? valueMissing : wrongPattern;
            }
            else{
                errorFlag =  false;
                delete errors.first_name;
            }
        }

         //last name validation
        if(field_name === 'last_name'){
            if(value === '' || NAME_REGEX.test(value) === false){
                errorFlag =  true;
                const {valueMissing, wrongPattern} = customErrors.last_name;
                errors.last_name = value === '' ? valueMissing : wrongPattern;
            }
            else{
                errorFlag =  false;
                delete errors.last_name;
            }
        }

        //phone number validation
        if(field_name === 'phone_no'){
            
            if(value === '' || MOBILE_REGEX.test(value) === false){
                errorFlag = true;
                const {valueMissing, wrongPattern} = customErrors.phone_no;
                errors.phone_no = value === '' ? valueMissing : wrongPattern;
            }
            else{
                errorFlag =  false;
                delete errors.phone_no;
            }
        }

        //email validation
        if(field_name === 'email'){
            if(value === '' || EMAIL_REGEX.test(value) === false){
                errorFlag = true;
                const {valueMissing, wrongPattern} = customErrors.email;
                errors.email = value === '' ? valueMissing : wrongPattern;
            }
            else{
                errorFlag =  false;
                delete errors.email;
            }
        }
      
        //password validation
        if(field_name === 'pass'){
            if(value === ''){
                errorFlag = true;
                const {valueMissing, minLength} = customErrors.pass;
                errors.pass = value === '' ? valueMissing : minLength;
            }
            else{
                errorFlag =  false;
                delete errors.pass;
            }

            if(value !== confirmPass && confirmPass.length > 0){
                errorFlag = true;
                const {diffPassword} = customErrors.confirmPass;
                errors.confirmPass = diffPassword;
            }
            else{
                errorFlag =  false;
                delete errors.confirmPass;
            }
        }

        //confirm password validation
        if(field_name === 'confirmPass'){
            if(value === '' || pass !== value){
                errorFlag = true;
                const {valueMissing, diffPassword} = customErrors.confirmPass;
                errors.confirmPass = value === '' ? valueMissing : diffPassword;
            }
            else{
                errorFlag =  false;
                delete errors.confirmPass;
            }
        }

        //gender validation
        if(field_name === 'gender'){
            if(gender === ''){
                errorFlag = true;
                const {valueMissing} = customErrors.gender;
                errors.gender = gender === '' ? valueMissing : '';
            }
            else{
                errorFlag =  false;
                delete errors.gender;
            }
        }
       
      this.setState({errors});
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

        const errorFlag = (this.handleValidation('first_name',logData.first_name) || this.handleValidation('last_name',logData.last_name) || this.handleValidation('email',logData.email)
                            || this.handleValidation('pass',logData.pass) || this.handleValidation('confirmPass',logData.confirmPass) || this.handleValidation('phone_no',logData.phone_no)
                            || this.handleValidation('gender')
        );

        if(errorFlag === false){
            if(this.state.isChecked === true){
                this.props.register(logData,'register');
                const {registrationResult} = this.props;
                
                setTimeout(()=>{
                    this.hideLoader();
                    if(registrationResult.status_code === 200 ){
                        (registrationResult.message !== undefined && registrationResult.message !== '') && Alert.alert(registrationResult.message);
                        this.props.navigation.navigate('Login');
                    }
                    else{
                        
                        (registrationResult.message !== undefined && registrationResult.message !== '') ? 
                        (Alert.alert(registrationResult.message)) :
                        (Alert.alert("Something went wrong!!Please try again"));
                    }
                },5000);
            }else{
                this.hideLoader();
                Alert.alert('Please select the terms and conditions');
            }
            
        }
        else{
            this.hideLoader();
            Alert.alert('Please check all information is properly filled');
        } 
            
    }   

    render() {
        const {first_name, last_name, email, pass, confirmPass, phone_no, gender} = this.state;
        const {passIcon, passwordHide, confirmPassIcon, confirmPasswordHide} =  this.state;
        const {errors} = this.state;
        
        return (
            <ImageBackground source={require('../../../assets/images/background_img.jpg')} style={{width: '100%', height: '100%'}}>
            <ScrollView 
                refreshControl={
                    <RefreshControl enabled={true} refreshing={this.state.isRefreshing} onRefresh={this.onRefresh} />
                }
            >
                <View style={styles.container}>
                    <Text style={styles.brandName}>NeoSTORE</Text>

                    {/* modal starts  */}
                    <Modal
						animationType={'fade'}
						transparent={true}
						visible={this.state.modalVisible}
						onBackButtonPress={ () => this.setModalVisible(!this.state.modalVisible)}
						style={{backgroundColor:'white', maxHeight:WINDOW_HEIGHT - 200, justifyContent:'center', alignItems:'center', borderRadius:15, marginTop:WINDOW_HEIGHT/8 }}
					>
                        <ScrollView>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center',padding:20, }}>
                            <Text>
                                You acknowledge that you are responsible for any Content you may submit via the
                                Website, including the legality, reliability, appropriateness, originality and copyright of any
                                such Content. You may not upload to, distribute or otherwise publish through the Website
                                any Content that
                            </Text>
                            <Text> 
                                (i),false, fraudulent, libellous, defamatory, obscene, threatening, invasive
                                of privacy or publicity rights, infringing on intellectual property rights, abusive, illegal or
                                otherwise objectionable; 
                            </Text>
                            <Text>
                                (ii) may constitute or encourage a criminal offence, violate the
                                rights of any party or otherwise give rise to liability or violate any law; or 
                            </Text>
                            <Text>
                                (iii) may contain software viruses, chain letters, mass mailings, or any form of "spam." You may not use a
                                false email address or other identifying information, impersonate any person or entity or
                                otherwise mislead as to the origin of any content.
                            </Text>
                            <TouchableHighlight 
								style={[styles.TabNavButton, {backgroundColor:StyleConstants.COLOR_FE3F3F, marginTop:50, } ]} 
								onPress={ () => this.setModalVisible(false)}>
									<Text style={styles.TabNavButtonText}>OK</Text>
							</TouchableHighlight>
                        </View>
                        </ScrollView>
                    </Modal>
                    {/* modal ends  */}

                    <Item regular style={[styles.textboxStyle,{marginBottom:0}]}>
                        <Icon active name='user' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                        <Input 
                            value={first_name.trim()} 
                            style={styles.inputBoxText} 
                            onChangeText={value => {this.setState({ first_name: value }) }} 
                            onChange={event => this.handleValidation('first_name', event.nativeEvent.text)}
                            onBlur={() => this.handleValidation('first_name', this.state.first_name)} 
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
                            onChangeText={value => {this.setState({ last_name: value }) }}
                            onChange={(event) => this.handleValidation('last_name', event.nativeEvent.text)} 
                            onBlur={() => this.handleValidation('last_name',this.state.last_name)} 
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
                            onChangeText={value => {this.setState({ email: value }) }}
                            onChange={(event) => this.handleValidation('email', event.nativeEvent.text)} 
                            onBlur={() => this.handleValidation('email', this.state.email)} 
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
                            onChangeText={value => {this.setState({pass: value}) }} 
                            onChange={(event) => this.handleValidation('pass', event.nativeEvent.text)}  
                            onBlur={() => this.handleValidation('pass', this.state.pass)} 
                            // onKeyPress={() => this.handleValidation('pass', this.state.pass)}
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
                            onChangeText={value => {this.setState({ confirmPass: value }) }} 
                            onChange={(event) => this.handleValidation('confirmPass', event.nativeEvent.text)}
                            onBlur={() => this.handleValidation('confirmPass', this.state.confirmPass)} 
                            // onKeyPress={() => this.handleValidation('confirmPass',this.state.confirmPass)} 
                            placeholder='Confirm Password' 
                            placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}
                        />
                        <Icon active name={confirmPassIcon} style={[styles.textBoxIcon, {alignSelf:'flex-end'}]} size={StyleConstants.ICON_SIZE} onPress={() => this.setPasswordVisiblility('confirmPassIcon')}/>
                    </Item>
                    <Text style={styles.errorText}> {errors.confirmPass}</Text>


                    <View style={styles.genderContainer}>
                        <Text style={styles.linkText}> Gender </Text>
                        <Radio color={StyleConstants.COLOR_FFFFFF}  onPress={() => {this.setState({ gender: 'M' }), this.handleValidation('gender')}} selected={gender == 'M'}/> 
                        <Text style={styles.linkText}> Male </Text>
                        <Radio color={StyleConstants.COLOR_FFFFFF} onPress={() => {this.setState({ gender: 'F' }), this.handleValidation('gender')}} selected={gender == 'F'}/> 
                        <Text style={styles.linkText}> Female </Text>
                    </View>
                    <Text style={styles.errorText}> {errors.gender}</Text>

                    
                    <Item regular style={[styles.textboxStyle,{marginBottom:0}]}>
                        <Icon active name='mobile' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                        <Input 
                            value={phone_no.trim()} 
                            style={styles.inputBoxText} 
                            keyboardType='phone-pad' 
                            maxLength={10}
                            onChangeText={value => {this.setState({ phone_no: value }) }}
                            onChange={(event) => this.handleValidation('phone_no',event.nativeEvent.text)} 
                            onBlur={() => this.handleValidation('phone_no',this.state.phone_no)} 
                            placeholder='Phone Number' 
                            placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}
                        />
                    </Item>
                    <Text style={styles.errorText}> {errors.phone_no}</Text>


                    <View style={{flexDirection:'row'}}>
                        <CheckBox checked={this.state.isChecked} color="green" style={styles.checkboxStyle} onPress={ ()=> this.setState({isChecked:!this.state.isChecked})} />
                        <Text style={[styles.linkText,{fontSize:StyleConstants.FONT_13}]}> I agree the </Text>
                        <TouchableOpacity onPress={() => this.setModalVisible(true) }>
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