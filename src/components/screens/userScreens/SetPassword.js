import React, { Component } from 'react';
import {ScrollView, View, Text, Alert, ImageBackground, TouchableHighlight, TouchableOpacity} from 'react-native';
import { styles } from '../../styles/Styles';
import {Input, Item} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleConstants} from '../../styles/Constants';
import CustomHeader from '../../Common/Header';
import {userActions} from '../../../redux/actions/userActions';
import {connect} from 'react-redux';
import { customErrors } from '../../../utils/Validation';
import Loader from '../../Common/Loader';


class SetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otpCode: '',
            newPass : '',
            confirmPass: '',

            passIcon: ['eye','eye'],
            passwordHide: [true,true],

            errors:{},
            showLoader:false,

            // errors:{
            //     otpCodeError:'',
            //     newPassError:'',
            //     confirmPassError:'',

            // }
        }
    }

    // handleChange = (name, value) =>{
    //     const passwordRegex = /^[a-zA-Z0-9]$/;
    //     const {errors} = this.state;
        
    //     if(name == 'otpCode' && value == ''){
    //         this.setState(state => {
    //             return {
    //                 ...state,
    //                 errors: {
    //                 ...state.otpCodeError,
    //                 otpCodeError: '*Required'
    //                 }
    //             };
    //             })
    //     }
    //     if(name == 'otpCode' && value !== ''){
    //         this.setState(state => {
    //             return {
    //                 ...state,
    //                 errors: {
    //                 ...state.otpCodeError,
    //                 otpCodeError: ''
    //                 }
    //             };
    //             })
    //     }

    //     if(name == 'newPass' && value == ''){
    //         this.setState(state => {
    //             return {
    //                 ...state,
    //                 errors: {
    //                 ...state.newPassError,
    //                 newPassError: '*Required'
    //                 }
    //             };
    //             })
    //     }
    //     else if(name == 'newPass' && value != ''){
    //         if(!passwordRegex.test(value)){
    //             this.setState(state => {
    //                 return {
    //                     ...state,
    //                     errors: {
    //                     ...state.newPassError,
    //                     newPassError: '*Password should contain characters and numbers'
    //                     }
    //                 };
    //             }) 
    //         }
    //         else if(value.length < 8 || value.length > 12){
    //             this.setState(state => {
    //                 return {
    //                     ...state,
    //                     errors: {
    //                     ...state.newPassError,
    //                     newPassError: '*Password length should be 8 to 12 chars'
    //                     }
    //                 };
    //             })
    //         }
    //         else{
    //             this.setState(state => {
    //                 return {
    //                     ...state,
    //                     errors: {
    //                     ...state.newPassError,
    //                     newPassError: ''
    //                     }
    //                 };
    //             })
    //         }
    
    //     }
        

    //     if(name == 'confirmPass' && value == ''){
    //         this.setState(state => {
    //             return {
    //                 ...state,
    //                 errors: {
    //                 ...state.confirmPassError,
    //                 confirmPassError: '*Required'
    //                 }
    //             };
    //         })
    //     }
    //     else if(name == 'confirmPass' && value != ''){
    //         if(this.state.newPass !== this.state.confirmPass){
    //             this.setState(state => {
    //                 return {
    //                     ...state,
    //                     errors: {
    //                     ...state.confirmPassError,
    //                     confirmPassError: '*Both password should be same'
    //                     }
    //                 };
    //             })
                
    //         }
    //         else{
    //             this.setState(state => {
    //                 return {
    //                     ...state,
    //                     errors: {
    //                     ...state.confirmPassError,
    //                     confirmPassError: ''
    //                     }
    //                 };
    //             })
    //         }
    //     }
       

    //     console.log("Errors: ", errors)
    // }
    
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

    //=============================
    handleValidation = (field_name) => {
        const {otpCode,newPass,confirmPass} = this.state;
        let {errors} = this.state;
        let errorFlag = true;

        //old password
        if(field_name === 'otpCode'){
            if(otpCode === ''){
                errorFlag = true;
                const {valueMissing} = customErrors.otpCode;
                errors.otpCode = valueMissing
            }
            else{
                errorFlag = false;
                delete errors.otpCode;
            }
        }

        //new password
        if(field_name === 'newPass'){
            if(newPass.length < 8 || newPass.length > 12){
                errorFlag = true;
                const {valueMissing, minLength} = customErrors.pass;
                errors.newPass = newPass === '' ? valueMissing : minLength;
            }
            else if(confirmPass.length !== 0 && newPass !== confirmPass){
                errorFlag = true;
                const {diffPassword} = customErrors.confirmPass;
                errors.confirmPass = diffPassword;
            }
            else{
                errorFlag = false;
                delete errors.newPass;
                delete errors.confirmPass;
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
        console.log("Error: ",errors, " errFlag: ", errorFlag);
        return errorFlag;
    }
    //=============================

    // setPasswordVisiblility = () => {
    //     if(this.state.passIcon === 'eye'){
    //         this.setState({passIcon: 'eye-slash', })
    //     }
    //     else{ 
    //         this.setState({passIcon: 'eye', })
    //     }
    //     this.setState({passwordHide: !this.state.passwordHide });
    // }

    handleSubmit = () =>{
        this.showLoader()
        const data ={
            otpCode: this.state.otpCode,
            newPass: this.state.newPass,
            confirmPass: this.state.confirmPass,
        }
        const errorFlag = this.handleValidation('otpCode') && this.handleValidation('newPass') && this.handleValidation('confirmPass');
        console.log("EF----",errorFlag);

        if(errorFlag === false){
            this.props.handleRecoverPassword(data, 'recoverPassword');
            const {recoverPasswordRes} = this.props;
            console.log("recoverPasswordRes: ",recoverPasswordRes);

            setTimeout(()=>{
                this.hideLoader();
                if(recoverPasswordRes !== undefined){
                    (recoverPasswordRes.status_code === 200) ?
                    (
                        Alert.alert(recoverPasswordRes.message),
                        this.props.navigation.navigate('Login')
                    ):
                    (
                        Alert.alert(recoverPasswordRes.message)
                    )
                }
                else{
                    Alert.alert("Something went wrong!!!Please try again")
                }

            },3000);
            
            
        }
        else{
            this.hideLoader();
            Alert.alert("Please check all the information is properly filled"); 
        }
    }

    render() {
        const {otpCode, newPass, confirmPass} = this.state
        const {passIcon, passwordHide,errors} = this.state;
        return (
            <ImageBackground source={require('../../../assets/images/background_img.jpg')} style={{width: '100%', height: '100%'}}>
                <CustomHeader iconName="arrow-left" handleLeftIconClick={this.goBack} headerTitle="Set Password" />
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <View style={styles.container}>
                        <Text style={styles.brandName}>NeoSTORE</Text>

                        <Item regular style={styles.textboxStyle}>
                            <Icon name='line-chart' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                            <Input 
                                value={otpCode} 
                                style={styles.inputBoxText} 
                                onChangeText={otpCode => {this.setState({otpCode})} } 
                                onBlur={() => this.handleValidation("otpCode")} 
                                placeholder='Enter OTP' 
                                placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}
                            />
                        </Item>
                        <Text style={styles.errorText}> {errors.otpCode} </Text>


                        <Item regular style={styles.textboxStyle}>
                            <Icon name='lock' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                            <Input 
                                value={newPass} 
                                secureTextEntry={passwordHide[0]} 
                                onChangeText={newPass => {this.setState({newPass});} } 
                                onBlur={() => this.handleValidation("newPass")} 
                                onKeyPress={() => this.handleValidation("newPass")} 
                                style={styles.inputBoxText} 
                                placeholder='Enter new Password' 
                                placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}
                            />
                            <Icon active name={passIcon[0]} style={[styles.textBoxIcon, {alignSelf:'flex-end'}]} size={StyleConstants.ICON_SIZE} onPress={() => this.setPasswordVisiblility(0)}/>
                        </Item>
                        <Text style={styles.errorText}> {errors.newPass} </Text>


                        <Item regular style={styles.textboxStyle}>
                            <Icon name='lock' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                            <Input 
                                value={confirmPass} 
                                secureTextEntry={passwordHide[1]} 
                                onChangeText={confirmPass => {this.setState({confirmPass});} } 
                                onBlur={() => this.handleValidation("confirmPass")} 
                                onKeyPress={() => this.handleValidation("confirmPass")} 
                                style={styles.inputBoxText} 
                                placeholder=' Enter Password again' 
                                placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}
                            />
                            <Icon active name={passIcon[1]} style={[styles.textBoxIcon, {alignSelf:'flex-end'}]} size={StyleConstants.ICON_SIZE} onPress={() => this.setPasswordVisiblility(1)}/>
                        </Item>
                        <Text style={styles.errorText}> {errors.confirmPass} </Text>


                        <TouchableHighlight style={styles.button} onPress={() => this.handleSubmit()}>
                            <Text style={styles.buttonText}> SUBMIT </Text>
                        </TouchableHighlight>

                        {(this.state.showLoader) && <Loader />}
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