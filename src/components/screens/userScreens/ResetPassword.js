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
import { customErrors } from '../../../utils/Validation';
import Loader from '../../Common/Loader';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state ={
            oldPass: '',
            newPass: '',
            confirmPass: '',

            // passIcon: 'eye',
            // passwordHide: true,
            passIcon: ['eye','eye','eye'],
            passwordHide: [true,true,true],

            showLoader:false,
            errors:{},
        }
    }
    
    showLoader = () => { this.setState({ showLoader:true }); };
    hideLoader = () => { this.setState({ showLoader:false }); };

    goBack = () => this.props.navigation.goBack();

    setPasswordVisiblility = (i) => {
        const {passIcon,passwordHide} = this.state; 
        if(this.state.passIcon[i] === 'eye'){
            passIcon.splice(i,1,'eye-slash');
            this.setState({passIcon: [...passIcon]});
        }
        else{ 
            passIcon.splice(i,1,'eye');
            this.setState({passIcon: [...passIcon]});
        }

        passwordHide.splice(i,1,!this.state.passwordHide[i]);
        this.setState({passwordHide: [...passwordHide]});
    }
    
    handleValidation = (field_name) => {
        const {oldPass,newPass,confirmPass} = this.state;
        let {errors} = this.state;
        let errorFlag = true;

        //old password
        if(field_name === 'oldPass'){
            if(oldPass === ''){
                errorFlag = true;
                const {valueMissing} = customErrors.pass;
                errors.oldPass = valueMissing
            }
            else{
                errorFlag = false;
                delete errors.oldPass;
            }
        }

        //new password
        if(field_name === 'newPass'){
            if(newPass.length < 8 || newPass.length > 12){
                errorFlag = true;
                const {valueMissing, minLength} = customErrors.pass;
                errors.newPass = newPass === '' ? valueMissing : minLength;
            }
            if(confirmPass.length !== 0 && newPass !== confirmPass){
                errorFlag = true;
                const {diffPassword} = customErrors.confirmPass;
                errors.confirmPass = diffPassword;
            }
            else{
                errorFlag = false;
                delete errors.newPass;
            }
        }

        //confirm new password
        if(field_name === 'confirmPass'){
            if(confirmPass.length === 0 || newPass !== confirmPass){
                errorFlag = true;
                const {valueMissing, diffPassword} = customErrors.confirmPass;
                errors.confirmPass = confirmPass === '' ? valueMissing : diffPassword;
            }
            else{
                errorFlag =  false;
                delete errors.confirmPass;
            }
        }

        this.setState({errors});
        // console.log("Error: ",errors, " errFlag: ", errorFlag);
        return errorFlag;
    }

    handleSubmit = async () =>{
        this.showLoader();
        const data = {
            oldPass: this.state.oldPass,
            newPass: this.state.newPass,
            confirmPass: this.state.confirmPass,
        }
        const errorFlag = this.handleValidation('oldPass') || this.handleValidation('newPass') || this.handleValidation('confirmPass');
        // console.log("EF----",errorFlag);
        
        if(errorFlag === false){
            await this.props.changePassword(data, CHANGE_PASSWORD_URLTYPE);
            const {changePasswordRes} = await this.props;
            // console.log("changePassRes in compo: ", changePasswordRes);
            
            setTimeout(()=>{
                this.hideLoader();
                if(changePasswordRes !== undefined){
                    (changePasswordRes.status_code === 200)?
                    (
                        Alert.alert(changePasswordRes.message),  
                        this.props.navigation.navigate('Login')
                    ) :
                    (
                        Alert.alert(changePasswordRes.message)
                    )
                }
                else{
                    Alert.alert('Something went wrong!!Please try again');
                }
            },3000);
            
        }
        else{
            this.hideLoader();
            Alert.alert("Check all information is properly filled!!");
        }
    }

    render() {
        const {passIcon, passwordHide,errors} = this.state;
        const {oldPass, newPass, confirmPass} = this.state;
        return (
            <ImageBackground source={require('../../../assets/images/background_img.jpg')} style={{width: '100%', height: '100%'}}>
                <CustomHeader iconName="arrow-left" handleLeftIconClick={this.goBack} headerTitle="Reset Password" />
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <View style={styles.container}>
                        <Text style={[styles.brandName, {alignSelf: 'center',}]}>NeoSTORE</Text>

                        <Item regular style={styles.textboxStyle}>
                            <Icon name='lock' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                            <Input 
                                value={oldPass} 
                                style={styles.inputBoxText} 
                                secureTextEntry={passwordHide[0]} 
                                onChangeText={oldPass => {this.setState({oldPass})}}
                                onBlur={() => this.handleValidation("oldPass")} 
                                placeholder='Current Password' 
                                placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}
                            />
                            <Icon active name={passIcon[0]} style={[styles.textBoxIcon, {alignSelf:'flex-end'}]} size={StyleConstants.ICON_SIZE} onPress={() => this.setPasswordVisiblility(0)}/>
                        </Item>
                        <Text style={styles.errorText}> {errors.oldPass} </Text>

                        <Item regular style={styles.textboxStyle}>
                            <Icon name='lock' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                            <Input 
                                value={newPass} 
                                secureTextEntry={passwordHide[1]} 
                                onChangeText={newPass => {this.setState({newPass})} }
                                onBlur={() => this.handleValidation("newPass")}
                                onKeyPress={() => this.handleValidation("newPass")} 
                                style={styles.inputBoxText} 
                                placeholder='New Password' 
                                placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}
                            />
                            <Icon active name={passIcon[1]} style={[styles.textBoxIcon, {alignSelf:'flex-end'}]} size={StyleConstants.ICON_SIZE} onPress={() => this.setPasswordVisiblility(1)}/>
                        </Item>
                        <Text style={styles.errorText}> {errors.newPass} </Text>

                        <Item regular style={styles.textboxStyle}>
                            <Icon name='lock' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                            <Input 
                                value={confirmPass} 
                                secureTextEntry={passwordHide[2]} 
                                onChangeText={confirmPass => {this.setState({confirmPass})} } 
                                onBlur={() => this.handleValidation("confirmPass")} 
                                onKeyPress={() => this.handleValidation("confirmPass")} 
                                style={styles.inputBoxText} 
                                placeholder='Confirm Password' 
                                placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}
                            />
                            <Icon active name={passIcon[2]} style={[styles.textBoxIcon, {alignSelf:'flex-end'}]} size={StyleConstants.ICON_SIZE} onPress={() => this.setPasswordVisiblility(2)}/>
                        </Item>
                        <Text style={styles.errorText}> {errors.confirmPass} </Text>

                        <TouchableHighlight style={styles.button} onPress={() => this.handleSubmit()}>
                            <Text style={styles.buttonText}> RESET PASSWORD </Text>
                        </TouchableHighlight>

                    </View>
                    {(this.state.showLoader) && <Loader />}

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