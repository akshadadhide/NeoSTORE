import React, { Component } from 'react';
import {ScrollView, View, Text, Alert, ImageBackground, TouchableHighlight, TouchableOpacity} from 'react-native';
import { styles } from '../../styles/Styles';
import {Input, Item} from 'native-base';
import CustomHeader from '../../Common/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleConstants} from '../../styles/Constants';
import {CHANGE_PASSWORD_URLTYPE} from '../../../API/apiConstants';
import {loggedInUserActions} from '../../../redux/actions/LoggedInUserActions';
import {connect} from 'react-redux';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state ={
            oldPass: '',
            newPass: '',
            confirmPass: '',

            passIcon: 'eye',
            passwordHide: true,

            errors:{
                oldPassError:'',
                newPassError:'',
                confirmPassError:'',

            }
        }
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

    handleChange = (name, value) =>{
        const passwordRegex = /^[a-zA-Z0-9]$/;
        const {errors} = this.state;
        
        if(name == 'oldPass' && value == ''){
            this.setState(state => {
                return {
                    ...state,
                    errors: {
                    ...state.oldPassError,
                    oldPassError: '*Required'
                    }
                };
                })
        }
        if(name == 'oldPass' && value !== ''){
            this.setState(state => {
                return {
                    ...state,
                    errors: {
                    ...state.oldPassError,
                    oldPassError: ''
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
    

    handleSubmit = async () =>{
        const data = {
            oldPass: this.state.oldPass,
            newPass: this.state.newPass,
            confirmPass: this.state.confirmPass,
        }
        await this.props.changePassword(data, CHANGE_PASSWORD_URLTYPE);
        const {changePasswordRes} = await this.props;
        console.log("changePassRes in compo: ", changePasswordRes);
        
        if(changePasswordRes){
            (changePasswordRes.status_code === 200)&&
            (Alert.alert(hangePasswordRes.message),  
            this.props.navigation.navigate('EditProfile')); 
        }
        else{
            Alert.alert(changePasswordRes.message);
        }
    }

    render() {
        const {passIcon, passwordHide} = this.state;
        const {oldPass, newPass, confirmPass} = this.state;
        return (
            <ImageBackground source={require('../../../assets/images/background_img.jpeg')} style={{width: '100%', height: '100%'}}>
                <CustomHeader iconName="arrow-left" handleLeftIconClick={this.goBack} headerTitle="Reset Password" />
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <View style={styles.container}>
                        <View style={{ flex: 1,}}>
                            <Text style={[styles.brandName, {alignSelf: 'center',}]}>NeoSTORE</Text>

                            <Text style={styles.errorText}> {this.state.errors.oldPassError} </Text>
                            <Item regular style={styles.textboxStyle}>
                                <Icon name='lock' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                                <Input value={oldPass} style={styles.inputBoxText} secureTextEntry={passwordHide} onChangeText={oldPass => {{this.setState({oldPass}); this.handleChange("oldPass",this.state.oldPass)}} } onBlur={() => this.handleChange("oldPass",this.state.oldPass)} placeholder='Current Password' placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}/>
                                <Icon active name={passIcon} style={[styles.textBoxIcon, {alignSelf:'flex-end'}]} size={StyleConstants.ICON_SIZE} onPress={this.setPasswordVisiblility}/>
                            </Item>

                            <Text style={styles.errorText}> {this.state.errors.newPassError} </Text>
                            <Item regular style={styles.textboxStyle}>
                                <Icon name='lock' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                                <Input value={newPass} secureTextEntry={passwordHide} onChangeText={newPass => {{this.setState({newPass}); this.handleChange("newPass",this.state.newPass)}} } onBlur={() => this.handleChange("newPass",this.state.newPass)} style={styles.inputBoxText} placeholder='New Password' placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}/>
                                <Icon active name={passIcon} style={[styles.textBoxIcon, {alignSelf:'flex-end'}]} size={StyleConstants.ICON_SIZE} onPress={this.setPasswordVisiblility}/>
                            </Item>

                            <Text style={styles.errorText}> {this.state.errors.confirmPassError} </Text>
                            <Item regular style={styles.textboxStyle}>
                                <Icon name='lock' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                                <Input value={confirmPass} secureTextEntry={passwordHide} onChangeText={confirmPass => {{this.setState({confirmPass}); this.handleChange("confirmPass",this.state.confirmPass)}} } onBlur={() => this.handleChange("confirmPass",this.state.confirmPass)} style={styles.inputBoxText} placeholder='Confirm Password' placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}/>
                                <Icon active name={passIcon} style={[styles.textBoxIcon, {alignSelf:'flex-end'}]} size={StyleConstants.ICON_SIZE} onPress={this.setPasswordVisiblility}/>
                            </Item>

                            <TouchableHighlight style={styles.button} onPress={() => this.handleSubmit()}>
                                <Text style={styles.buttonText}> RESET PASSWORD </Text>
                            </TouchableHighlight>

                        </View>

                    </View>
                </ScrollView>
            </ImageBackground>  
        );
    }
}

function mapState(state){
    const {changePasswordRes} = state.loggedInUserReducer;
    return {changePasswordRes};
}

const actionCreators = {
    changePassword: loggedInUserActions.changePassword,
}

export default connect(mapState, actionCreators)(ResetPassword);