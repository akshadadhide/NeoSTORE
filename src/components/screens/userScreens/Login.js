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

    handleValidation = (field_name,value) => {
        const {email, pass} = this.state;
        let {errors} = this.state;
    
        let errorFlag = false;
    
        // console.log("e: ",email, "pass: ",pass);
        
        //email validation
        if(field_name === 'email'){
            if(value === '' || EMAIL_REGEX.test(value) === false){
                errorFlag = true;
                const {valueMissing, wrongPattern} = customErrors.email;
                errors.email = value === '' ? valueMissing : wrongPattern;
            }
            else{
                delete errors.email;
            }
        }
        
        //password validation
        if(field_name === 'pass'){
            if(value === ''){
                errorFlag = true;
                const {valueMissing} = customErrors.pass;
                errors.pass = valueMissing;
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

        const errorFlag = this.handleValidation('email',this.state.email) || this.handleValidation('pass',this.state.pass);
       
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
                            <Input 
                                value={email.trim()} 
                                style={styles.inputBoxText} 
                                onChangeText={(email) => {this.setState({email})} } 
                                onChange={event => this.handleValidation('email',event.nativeEvent.text)}
                                onBlur={ () => this.handleValidation('email',this.state.email)} 
                                placeholder='Username' 
                                placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}
                                keyboardType="email-address"
                            />
                        </Item>
                        <Text style={styles.errorText}> {errors.email}</Text>


                        <Item regular style={styles.textboxStyle}>
                            <Icon name='lock' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                            <Input 
                                value={pass} 
                                secureTextEntry={passwordHide} 
                                style={styles.inputBoxText} 
                                onChangeText={pass => this.setState({pass}) } 
                                onChange={event => this.handleValidation('pass',event.nativeEvent.text)}
                                onBlur={() => this.handleValidation('pass',this.state.pass)} 
                                placeholder='Password' 
                                placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}
                            />
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

                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={styles.rowSpaceBetween}>
                            <Text style={[styles.linkText,{fontSize: StyleConstants.FONT_18, paddingRight: StyleConstants.PADDING}]}> DON'T HAVE AN ACCOUNT?</Text>
                            <Icon name="plus" size={35} color={StyleConstants.COLOR_FFFFFF}/>
                        </TouchableOpacity>
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