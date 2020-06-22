import PropTypes from "prop-types";
import React, { Component } from 'react';
import {ScrollView,Alert, View, Text, ActivityIndicator, StyleSheet, ImageBackground, TouchableHighlight, TouchableOpacity} from 'react-native';
import { styles } from '../../styles/Styles';
import {Input, Item} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleConstants} from '../../styles/Constants';
import {validation, EMAIL_REGEX, customErrors} from '../../../utils/Validation';
import { userActions } from "../../../redux/actions/userActions";
import { connect } from 'react-redux';
import Loader from "../../Common/Loader";



class Login extends Component {
    constructor(){
        super();
        this.state = {
            email:'',
            pass:'',
            errorMsg:'',
            errors:{},

            passIcon: 'eye',
            passwordHide: true,

            showLoader:false,
            
        }
        this.handleLogin = this.handleLogin.bind(this);
    }

    showLoader = () => { this.setState({ showLoader:true }); };
    hideLoader = () => { this.setState({ showLoader:false }); };


    setPasswordVisiblility = () => {
        if(this.state.passIcon === 'eye'){
            this.setState({passIcon: 'eye-slash', })
        }
        else{ 
            this.setState({passIcon: 'eye', })
        }
        this.setState({passwordHide: !this.state.passwordHide });
    }

    handleValidation = (field_name) => {
        const {email, pass} = this.state;
        let {errors} = this.state;
    
        let errorFlag = false;
    
        // console.log("e: ",email, "pass: ",pass);
        
        //email validation
        if(field_name === 'email'){
            if(email.length === 0 || EMAIL_REGEX.test(email) === false){
            errorFlag = true;
            const {valueMissing, wrongPattern} = customErrors.email;
            errors.email = email === '' ? valueMissing : wrongPattern;
            }
            else{
            delete errors.email;
            }
        }
        
        //password validation
        if(field_name === 'pass'){
            if(pass.length < 8 || pass.length > 12){
                errorFlag = true;
                const {valueMissing, minLength} = customErrors.pass;
                errors.pass = pass === '' ? valueMissing : minLength;
            }
            else{
                delete errors.pass
            }
        }

        this.setState({errors}); 
        return errorFlag;
          
    }

    async handleLogin(){
        this.showLoader();
        let {errors} = this.state;
        
        const logData = {
            email: this.state.email,
            pass: this.state.pass,
        };

        const errorFlag = this.handleValidation('email') || this.handleValidation('pass');
       
        if(errorFlag === false){
            await this.props.login(logData, 'login');
            const { isLogin, userData } = this.props;
            
            if(isLogin == true && userData.status_code === 200){
                this.props.navigation.navigate('Home');
            }
            else{
                errors.submitError = userData.message !== undefined ? userData.message : 'Something went wrong'
                this.setState({errors});
            }
            
        }
        else{
           Alert.alert('Please check all the information is properlly filled');
        }
        this.hideLoader();

    }


    render() {
        const {email, pass} = this.state;
        const {passIcon, passwordHide} =  this.state;
        const {errors} = this.state;


        return (
            <ImageBackground source={require('../../../assets/images/background_img.jpg')} style={{width: '100%', height: '100%'}}>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <View style={styles.container}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.brandName}>NeoSTORE</Text>

                        <Text style={styles.errorText}>{(this.state.errors.submitError !== undefined) && this.state.errors.submitError}</Text>

                        <Item regular style={styles.textboxStyle}>
                            <Icon name='user' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                            <Input value={email.trim()} style={styles.inputBoxText} onChangeText={email => this.setState({email}) } onBlur={ () => this.handleValidation('email')} placeholder='Username' placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}/>
                        </Item>
                        <Text style={styles.errorText}> {errors.email}</Text>


                        <Item regular style={styles.textboxStyle}>
                            <Icon name='lock' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                            <Input value={pass} secureTextEntry={passwordHide} style={styles.inputBoxText} onChangeText={pass => this.setState({pass}) } onBlur={() => this.handleValidation('pass')} placeholder='Password' placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}/>
                            <Icon active name={passIcon} style={[styles.textBoxIcon, {alignSelf:'flex-end'}]} size={StyleConstants.ICON_SIZE} onPress={this.setPasswordVisiblility}/>
                        </Item>
                        <Text style={styles.errorText}> {errors.pass}</Text>



                        <TouchableHighlight style={styles.button} onPress={this.handleLogin}>
                            <Text style={styles.buttonText}> LOGIN </Text>
                        </TouchableHighlight>

                        <TouchableOpacity onPress={()  => this.props.navigation.navigate('ForgotPassword')}>
                            <Text style={styles.linkText}> Forgot Password? </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',padding: 20,}}>
                    
                        <View style={{ flex: 4, alignItems: 'space-between', }}>
                            <Text style={[styles.linkText,{fontSize: StyleConstants.FONT_18}]}> DON'T HAVE AN ACCOUNT?</Text>
                        </View>

                        <View style={{flex: 1, alignItems: 'space-between',  }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={{backgroundColor:StyleConstants.COLOR_BB0100, padding:StyleConstants.PADDING}}>
                                <Icon name="plus" size={35} color={StyleConstants.COLOR_FFFFFF}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {(this.state.showLoader) && (<Loader />)}
            </ScrollView>
            </ImageBackground>
        );
    }
}

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
 
}

function mapState(state) {
    const { isLogin, userData} = state.authReducer;
    return { isLogin, userData };
}
const actionCreators = {
    login: userActions.login,
};



const connectedLoginPage = connect(mapState, actionCreators)(Login);

export {connectedLoginPage as Login}