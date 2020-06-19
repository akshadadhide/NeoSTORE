import React, { Component } from 'react';
import {ScrollView, View, Text, Alert, ImageBackground, TouchableHighlight, TouchableOpacity} from 'react-native';
import { styles } from '../../styles/Styles';
import {Input, Item} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleConstants} from '../../styles/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import {userActions} from '../../../redux/actions/userActions';
import {connect} from 'react-redux';
import Loader from '../../Common/Loader';

class ForgotPassword extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            showLoader:false,
        }
    }

    showLoader = () => { this.setState({ showLoader:true }); };
    hideLoader = () => { this.setState({ showLoader:false }); };

    onSubmit = async() =>{
        this.showLoader();
        const {email} = this.state;
        // console.log("email ifj",email);
       // {email:this.state.email}
       const data={
           email:this.state.email
       }
        
        if(email !== ''){
            await this.props.handleForgotPassword(data,'forgotPassword');
            const {forgotPasswordRes} = await this.props;
            // console.log("In forgot pass compo", forgotPasswordRes);

            setTimeout(()=> {
                this.hideLoader();
                if(forgotPasswordRes !== undefined){
                    if(forgotPasswordRes.status_code === 200){
                        Alert.alert(forgotPasswordRes.message);
                        AsyncStorage.setItem('userToken',forgotPasswordRes.token);
                        this.props.navigation.navigate('SetPassword');
                    }
                    else{
                        Alert.alert(forgotPasswordRes.error_message);
                    }   
                }
                else {
                    Alert.alert('Something went wrong!!');
                }
            },3000);
            
        }
        else{
            this.hideLoader();
            Alert.alert('Please enter the userid i.e. email');
        }
    }

    render() {
        const {email} = this.state;
        return (
            <ImageBackground source={require('../../../assets/images/background_img.jpg')} style={{width: '100%', height: '100%'}}>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <View style={styles.container}>
                        <View style={{ flex: 1,}}>
                            <Text style={styles.brandName}>NeoSTORE</Text>

                            <Text style={[styles.inputBoxText, {fontSize: StyleConstants.FONT_20, marginBottom:20, fontWeight:StyleConstants.FONT_BOLD}]}> Forgot Password? </Text>
                            <Item regular style={styles.textboxStyle}>
                                <Icon name='user' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                                <Input 
                                    value={email.trim()} 
                                    style={styles.inputBoxText} 
                                    onChangeText={email => this.setState({email}) } 
                                    placeholder='Enter userid' 
                                    placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}
                                />
                            </Item>

                            <TouchableHighlight style={styles.button} onPress={() => this.onSubmit() }>
                                <Text style={styles.buttonText}> SUBMIT </Text>
                            </TouchableHighlight>

                        </View>
                        {(this.state.showLoader) && <Loader />}
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}

function mapState(state) {
    const { forgotPasswordRes} = state.authReducer;
    return { forgotPasswordRes };
}
const actionCreators = {
    handleForgotPassword: userActions.handleForgotPassword,
};


export default connect(mapState, actionCreators)(ForgotPassword);