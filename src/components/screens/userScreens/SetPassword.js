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

    //validation
    handleValidation = (field_name,value) => {
        const {otpCode,newPass,confirmPass} = this.state;
        let {errors} = this.state;
        let errorFlag = true;

        //old password
        if(field_name === 'otpCode'){
            if(value === ''){
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
            if(value.length < 8 || value.length > 12){
                errorFlag = true;
                const {valueMissing, minLength} = customErrors.pass;
                errors.newPass = value === '' ? valueMissing : minLength;
            }
            else{
                errorFlag = false;
                delete errors.newPass;
            }
            if(confirmPass.length !== 0 && value !== confirmPass){
                errorFlag = true;
                const {diffPassword} = customErrors.confirmPass;
                errors.confirmPass = diffPassword;
            }
            else{
                errorFlag = false;
                delete errors.confirmPass;
            }
        }

        //confirm new password
        if(field_name === 'confirmPass'){
            if(value === '' || newPass !== value){
                errorFlag = true;
                const {valueMissing, diffPassword} = customErrors.confirmPass;
                errors.confirmPass = value === '' ? valueMissing : diffPassword;
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

    handleSubmit = () =>{
        this.showLoader()
        const data ={
            otpCode: this.state.otpCode,
            newPass: this.state.newPass,
            confirmPass: this.state.confirmPass,
        }
        const errorFlag = this.handleValidation('otpCode',this.state.otpCode) || this.handleValidation('newPass',this.state.newPass) ||
                         this.handleValidation('confirmPass',this.state.confirmPass);

        if(errorFlag === false){
            this.props.handleRecoverPassword(data, 'recoverPassword');

            setTimeout(() => {
                const {recoverPasswordRes} = this.props;
                this.hideLoader();
                if(recoverPasswordRes !== undefined){
                    (recoverPasswordRes.status_code === 200) ?
                    (
                        alert(recoverPasswordRes.message),
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
                                onBlur={() => this.handleValidation("otpCode",this.state.otpCode)} 
                                onChange={event => this.handleValidation("otpCode", event.nativeEvent.text)} 
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
                                onBlur={() => this.handleValidation("newPass",this.state.newPass)} 
                                onKeyPress={() => this.handleValidation("newPass",this.state.newPass)} 
                                onChange={event => this.handleValidation("newPass",event.nativeEvent.text)} 
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
                                onBlur={() => this.handleValidation("confirmPass",this.state.confirmPass)} 
                                onKeyPress={() => this.handleValidation("confirmPass",this.state.confirmPass)}
                                onChange={event => this.handleValidation("confirmPass",event.nativeEvent.text)} 
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