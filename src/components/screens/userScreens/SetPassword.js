import React, { Component } from 'react';
import {ScrollView, View, Text, Button, ImageBackground, TouchableHighlight, TouchableOpacity} from 'react-native';
import { styles } from '../../styles/Styles';
import {Input, Item} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleConstants} from '../../styles/Constants';
import CustomHeader from '../../Common/Header';
import {userActions} from '../../../redux/actions/userActions';
import {connect} from 'react-redux';


class SetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otpCode: '',
            newPass : '',
            confirmPass: '',

            passIcon: 'eye',
            passwordHide: true,

            errors:{
                otpCodeError:'',
                newPassError:'',
                confirmPassError:'',

            }
        }
    }

    handleChange = (name, value) =>{
        const passwordRegex = /^[a-zA-Z0-9]$/;
        const {errors} = this.state;
        
        if(name == 'otpCode' && value == ''){
            this.setState(state => {
                return {
                    ...state,
                    errors: {
                    ...state.otpCodeError,
                    otpCodeError: '*Required'
                    }
                };
                })
        }
        if(name == 'otpCode' && value !== ''){
            this.setState(state => {
                return {
                    ...state,
                    errors: {
                    ...state.otpCodeError,
                    otpCodeError: ''
                    }
                };
                })
        }

        if(name == 'newPass' && value == ''){
            this.setState(state => {
                return {
                    ...state,
                    errors: {
                    ...state.newPassError,
                    newPassError: '*Required'
                    }
                };
                })
        }
        else if(name == 'newPass' && value != ''){
            if(!passwordRegex.test(value)){
                this.setState(state => {
                    return {
                        ...state,
                        errors: {
                        ...state.newPassError,
                        newPassError: '*Password should contain characters and numbers'
                        }
                    };
                }) 
            }
            else if(value.length < 8 || value.length > 12){
                this.setState(state => {
                    return {
                        ...state,
                        errors: {
                        ...state.newPassError,
                        newPassError: '*Password length should be 8 to 12 chars'
                        }
                    };
                })
            }
            else{
                this.setState(state => {
                    return {
                        ...state,
                        errors: {
                        ...state.newPassError,
                        newPassError: ''
                        }
                    };
                })
            }
    
        }
        

        if(name == 'confirmPass' && value == ''){
            this.setState(state => {
                return {
                    ...state,
                    errors: {
                    ...state.confirmPassError,
                    confirmPassError: '*Required'
                    }
                };
            })
        }
        else if(name == 'confirmPass' && value != ''){
            if(this.state.newPass !== this.state.confirmPass){
                this.setState(state => {
                    return {
                        ...state,
                        errors: {
                        ...state.confirmPassError,
                        confirmPassError: '*Both password should be same'
                        }
                    };
                })
                
            }
            else{
                this.setState(state => {
                    return {
                        ...state,
                        errors: {
                        ...state.confirmPassError,
                        confirmPassError: ''
                        }
                    };
                })
            }
        }
       

        console.log("Errors: ", errors)
    }
    
   
    goBack = () => this.props.navigation.goBack();

    setPasswordVisiblility = () => {
        if(this.state.passIcon === 'eye'){
            this.setState({passIcon: 'eye-slash', })
        }
        else{ 
            this.setState({passIcon: 'eye', })
        }
        this.setState({passwordHide: !this.state.passwordHide });
    }

    handleSubmit = () =>{
        const data ={
            otpCode: this.state.otpCode,
            newPass: this.state.newPass,
            confirmPass: this.state.confirmPass,
        }
        this.props.handleRecoverPassword(data, 'recoverPassword');
    }

    render() {
        const {otpCode, newPass, confirmPass} = this.state
        const {passIcon, passwordHide} = this.state;
        return (
            <ImageBackground source={require('../../../assets/images/background_img.jpeg')} style={{width: '100%', height: '100%'}}>
                <CustomHeader iconName="arrow-left" handleLeftIconClick={this.goBack} headerTitle="Set Password" />
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <View style={styles.container}>
                        <View style={{ flex: 1,}}>
                            <Text style={styles.brandName}>NeoSTORE</Text>

                            <Text style={styles.errorText}> {this.state.errors.otpCodeError} </Text>
                            <Item regular style={styles.textboxStyle}>
                                <Icon name='line-chart' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                                <Input value={otpCode} style={styles.inputBoxText} onChangeText={otpCode => {{this.setState({otpCode})};this.handleChange("otpCode",this.state.otpCode)} } onBlur={() => this.handleChange("otpCode",this.state.otpCode)} placeholder='Enter OTP' placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}/>
                            </Item>

                            <Text style={styles.errorText}> {this.state.errors.newPassError} </Text>
                            <Item regular style={styles.textboxStyle}>
                                <Icon name='lock' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                                <Input value={newPass} secureTextEntry={passwordHide} onChangeText={newPass => {{this.setState({newPass}); this.handleChange("newPass",this.state.newPass)}} } onBlur={() => this.handleChange("newPass",this.state.newPass)} style={styles.inputBoxText} placeholder='Enter new Password' placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}/>
                                <Icon active name={passIcon} style={[styles.textBoxIcon, {alignSelf:'flex-end'}]} size={StyleConstants.ICON_SIZE} onPress={this.setPasswordVisiblility}/>
                            </Item>

                            <Text style={styles.errorText}> {this.state.errors.confirmPassError} </Text>
                            <Item regular style={styles.textboxStyle}>
                                <Icon name='lock' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                                <Input value={confirmPass} secureTextEntry={passwordHide} onChangeText={confirmPass => {{this.setState({confirmPass}); this.handleChange("confirmPass",this.state.confirmPass)}} } onBlur={() => this.handleChange("confirmPass",this.state.confirmPass)} style={styles.inputBoxText} placeholder=' Enter Password again' placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}/>
                                <Icon active name={passIcon} style={[styles.textBoxIcon, {alignSelf:'flex-end'}]} size={StyleConstants.ICON_SIZE} onPress={this.setPasswordVisiblility}/>
                            </Item>

                            <TouchableHighlight style={styles.button} onPress={() => this.handleSubmit()}>
                                <Text style={styles.buttonText}> SUBMIT </Text>
                            </TouchableHighlight>

                        </View>

                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}

function mapState(state){
    const {recoverPasswordRes} = state.authReducer;
    return {recoverPasswordRes };
}
const actionCreators = {
    handleRecoverPassword: userActions.handleRecoverPassword,
};

export default connect(mapState, actionCreators)(SetPassword);