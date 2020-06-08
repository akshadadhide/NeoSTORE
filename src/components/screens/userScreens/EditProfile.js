import React, { Component } from 'react';
import {View, TouchableOpacity,ImageBackground, ScrollView, ActivityIndicator, Text, TouchableHighlight, TextInput} from 'react-native';
import {Input, Item} from 'native-base';
import CustomHeader from '../../Common/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import {styles} from '../../styles/Styles';
import {StyleConstants} from '../../styles/Constants';
import {loggedInUserActions} from '../../../redux/actions/LoggedInUserActions';
import DatePicker from 'react-native-datepicker';
import validation from '../../../utils/Validation';
import {GET_USER_PROFILE_URLTYPE} from '../../../API/apiConstants';



class EditProfile extends Component {

    constructor(props){
        super(props);
        const {userProfile} =  this.props;

        this.state={
            user:{
                profile_img: '',
                first_name: userProfile.first_name,
                last_name: userProfile.last_name,
                email: userProfile.email,
                dob: userProfile.dob,
                phone_no: userProfile.phone_no,
                gender:userProfile.gender,
            },

            calendarDisplay:'none',
    
        }
    }

    componentDidMount(){
        this.props.getUserProfile(GET_USER_PROFILE_URLTYPE);
    }

    goBack = () => this.props.navigation.goBack();

    submitHandler = () => {
        console.log("userData after edit: ", this.state.user);
        
        this.props.editProfile(this.state.user, 'profile');

        const {editProfileRes} = this.props;

        if(editProfileRes.status_code === 200){
            this.props.navigation.navigate('UserProfile');
        }
        else{
            alert(this.props.editProfileRes.message);
        }
    }


    render() {
        const {userProfile} =  this.props;
        console.log("In editProfile userProfile: ", userProfile);
        const {user} = this.state;

        const today = new Date();

        return (
            <ImageBackground source={require('../../../assets/images/background_img.jpg')} style={{width: '100%', height: '100%'}}>
            <ScrollView>
                <CustomHeader iconName="arrow-left" handleLeftIconClick={this.goBack} headerTitle="Edit Profile" />
                <View style={styles.container}>

                    {(userProfile === undefined) ? (<ActivityIndicator color={StyleConstants.COLOR_FFFFFF} size="large" />):
                    ((userProfile.profile_img !== null)?
                        (<Image source={{uri: BASE_URL+userProfile.profile_img}} height={10} width={10} style={[styles.sidebarUserImage, {marginBottom: StyleConstants.PADDING, }]}/>)
                        :(  <TouchableOpacity style={[styles.sidebarUserLogo, {marginBottom: StyleConstants.PADDING,}]}>
                                <Icon name="user-alt" color={StyleConstants.COLOR_000000} size={80} />
                            </TouchableOpacity>
                        )
                    )
                    }
                
                    {(userProfile !== undefined) &&
                        (<View>
                            <Item regular style={styles.textboxStyle}>
                                <Icon active name='user-alt' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                                <Input
                                    value={user.first_name} 
                                    style={styles.inputBoxText}  
                                    onChange={text =>
                                                this.setState(state => {
                                                return {
                                                    ...state,
                                                    user: {
                                                    ...state.user,
                                                    first_name: text
                                                    }
                                                };
                                                })} 
                                    // placeholder={userProfile.first_name} 
                                    // placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}
                                />
                            </Item>

                            <Item regular style={styles.textboxStyle}>
                                <Icon active name='user-alt' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                                <Input
                                    value={user.last_name} 
                                    style={styles.inputBoxText}  
                                    onChange={text =>
                                                this.setState(state => {
                                                return {
                                                    ...state,
                                                    user: {
                                                    ...state.user,
                                                    last_name: text
                                                    }
                                                };
                                                })}
                                    // placeholder={userProfile.last_name} 
                                    // placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE} 
                                />
                            </Item>

                            <Item regular style={styles.textboxStyle}>
                                <Icon active name='envelope' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                                <Input
                                    value={user.email} 
                                    style={styles.inputBoxText}
                                    // placeholder={userProfile.email} 
                                    // placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}   
                                    onChange={text =>
                                                this.setState(state => {
                                                return {
                                                    ...state,
                                                    user: {
                                                    ...state.user,
                                                    email: text
                                                    }
                                                };
                                                })} 
                                    onBlur={() => validation('email', this.state.user.email)}
                                />
                            </Item>

                            <Item regular style={styles.textboxStyle}>
                                <Icon active name='mobile' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                                <Input
                                    value={user.phone_no} 
                                    style={styles.inputBoxText}
                                    // placeholder={userProfile.phone_no} 
                                    // placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}   
                                    onChange={text =>
                                                this.setState(state => {
                                                return {
                                                    ...state,
                                                    user: {
                                                    ...state.user,
                                                    phone_no: text
                                                    }
                                                };
                                                })} 
                                    onBlur={() => validation('phone_no', this.state.user.phone_no)}
                                />
                            </Item>

                            <Item regular style={styles.textboxStyle}>
                                {/* <Icon active name='calendar-day' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE} onPress={() => {(this.state.calendarDisplay === 'none')?(this.setState({calendarDisplay:'flex'})):(this.setState({calendarDisplay:'none'})) } } />
                                <Input
                                    value={user.dob} 
                                    style={styles.inputBoxText} 
                                    // placeholder={userProfile.dob} 
                                    // placeholderTextColor={StyleConstants.COLOR_RGBA_WHITE}  
                                /> */}
                            
                                <DatePicker 
                                    style={styles.inputBoxText}
                                    date={this.state.user.dob}
                                    mode="date"
                                    // placeholder="select date"
                                    format="YYYY-MM-DD"
                                    minDate="1970-1-1"
                                    maxDate={today}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0
                                          },
                                          dateInput: {
                                            marginLeft: 36,
                                            borderWidth: 0,
                                            color: StyleConstants.COLOR_FFFFFF,
                                            fontSize: StyleConstants.FONT_18,
                                            fontWeight:StyleConstants.FONT_MEDIUM,
                                          }
                                    }}
                                    onDateChange={ dob => this.setState(state =>{
                                                                return {
                                                                    ...state,
                                                                    user: {
                                                                        ...state.user,
                                                                        dob: dob
                                                                    }
                                                                };
                                                        })
                                                    
                                    }

                                />
                            </Item>

                            <TouchableHighlight style={styles.button} onPress={() => this.submitHandler()} >
                                <Text style={styles.buttonText}> SUBMIT </Text>
                            </TouchableHighlight>

                           

                        </View>)
                    }
                </View>
            </ScrollView>
            </ImageBackground>
        );
    }
}

function mapState(state) {
    const { userProfile, editProfileRes } = state.loggedInUserReducer;
    return { userProfile, editProfileRes };
}

const actionCreators = {
    getUserProfile: loggedInUserActions.getUserProfile,
    editProfile: loggedInUserActions.editProfile,
}

export default connect(mapState,actionCreators)(EditProfile);
