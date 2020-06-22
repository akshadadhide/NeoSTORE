import React, { Component } from 'react';
import {View, TouchableOpacity,ImageBackground, ScrollView, ActivityIndicator, Text, TouchableHighlight, Image} from 'react-native';
import {Input, Item} from 'native-base';
import CustomHeader from '../../Common/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import {styles} from '../../styles/Styles';
import {StyleConstants} from '../../styles/Constants';
import {loggedInUserActions} from '../../../redux/actions/LoggedInUserActions';
import {GET_USER_PROFILE_URLTYPE,BASE_URL} from '../../../API/apiConstants';


class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userProfile:'',
        }
    }
    
    componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', async() => {
            await this.props.getUserProfile(GET_USER_PROFILE_URLTYPE);
            const {userProfile} =  this.props;
            // console.log("In userProfile: ", userProfile);
            this.setState({userProfile:userProfile});
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    componentDidUpdate(prevProps){
        console.log("ifghg");
        if(this.props.userProfile !== prevProps.userProfile){
            console.log("in if---");
            this.setState({userProfile:this.props.userProfile});
        }   
    }

    goBack = () => this.props.navigation.goBack();

    render() {
        const {userProfile} = this.state;
        console.log("userProfile: ",userProfile);
        
        return (
            <ImageBackground source={require('../../../assets/images/background_img.jpg')} style={{width: '100%', height: '100%'}}>
            <ScrollView>
    
                <CustomHeader iconName="arrow-left" handleLeftIconClick={this.goBack}  headerTitle="My Account" />
                <View style={styles.container}>

                    {(userProfile === undefined) ? (<ActivityIndicator color={StyleConstants.COLOR_FFFFFF} size="large" />):
                    ((userProfile.profile_img !== null)?
                        (<Image source={{uri: BASE_URL+userProfile.profile_img}} height={10} width={10} style={[styles.sidebarUserImage, {marginBottom: StyleConstants.PADDING,}]}/>)
                        :(  <View style={[styles.sidebarUserLogo, {marginBottom: StyleConstants.PADDING,}]}>
                                <Icon name="user-alt" color={StyleConstants.COLOR_000000} size={80} />
                            </View>
                        )
                    )
                    }
                
                    {(userProfile !== undefined) &&
                        (<View>
                            <Item regular style={[styles.textboxStyle,{marginBottom:StyleConstants.MARGIN_25}]}>
                                <Icon active name='user' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                                <Input disabled style={styles.inputBoxText} placeholder={userProfile.first_name} placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}/>
                            </Item>

                            <Item regular style={[styles.textboxStyle,{marginBottom:StyleConstants.MARGIN_25}]}>
                                <Icon active name='user' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                                <Input disabled style={styles.inputBoxText}  placeholder={userProfile.last_name} placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}/>
                            </Item>

                            <Item regular style={[styles.textboxStyle,{marginBottom:StyleConstants.MARGIN_25}]}>
                                <Icon active name='envelope' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                                <Input disabled style={styles.inputBoxText} placeholder={userProfile.email} placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}/>
                            </Item>

                            <Item regular style={[styles.textboxStyle,{marginBottom:StyleConstants.MARGIN_25}]}>
                                <Icon active name='mobile' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                                <Input disabled style={styles.inputBoxText} placeholder={userProfile.phone_no} placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}/>
                            </Item>

                            <Item regular style={[styles.textboxStyle,{marginBottom:StyleConstants.MARGIN_25}]}>
                                <Icon active name='calendar' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                                <Input disabled style={styles.inputBoxText} placeholder={(userProfile.dob === null)? 'Birth date' :userProfile.dob} placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}/>
                            </Item>

                            <TouchableHighlight style={styles.button} onPress={() => {this.props.navigation.navigate('EditProfile')}} >
                                <Text style={styles.buttonText}> EDIT PROFILE </Text>
                            </TouchableHighlight>

                           

                        </View>)
                    }
                </View>
            </ScrollView>
            <View>
                <TouchableHighlight style={{backgroundColor: StyleConstants.COLOR_FFFFFF, padding: StyleConstants.PADDING_10, justifyContent:'center', alignItems:'center',}} onPress={() => {this.props.navigation.navigate('ResetPassword')}} >
                    <Text style={styles.productDetailTitle}> RESET PASSWORD </Text>
                </TouchableHighlight>
            </View>
            </ImageBackground>
        );
    }
}

function mapState(state) {
    const { userProfile } = state.loggedInUserReducer;
    return { userProfile };
}

const actionCreators = {
    getUserProfile: loggedInUserActions.getUserProfile,
}

export default connect(mapState,actionCreators)(UserProfile);