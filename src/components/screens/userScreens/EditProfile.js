import React, { Component } from 'react';
import {View, TouchableOpacity, Alert, ImageBackground, ScrollView, ActivityIndicator, Text, TouchableHighlight,Image, TextInput} from 'react-native';
import {Input, Item} from 'native-base';
import CustomHeader from '../../Common/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import {styles} from '../../styles/Styles';
import {StyleConstants} from '../../styles/Constants';
import {loggedInUserActions} from '../../../redux/actions/LoggedInUserActions';
import DatePicker from 'react-native-datepicker';
import {validation} from '../../../utils/Validation';
import {GET_USER_PROFILE_URLTYPE} from '../../../API/apiConstants';
import ImagePicker from 'react-native-image-picker';



class EditProfile extends Component {

    constructor(props){
        super(props);
        const {userProfile} =  this.props;

        this.state={
            user:{
                profile_img: userProfile.profile_img,
                first_name: userProfile.first_name,
                last_name: userProfile.last_name,
                email: userProfile.email,
                dob: userProfile.dob,
                phone_no: userProfile.phone_no,
                gender:'female',
            },

            calendarDisplay:'none',
    
        }
    }

    componentDidMount(){
        this.props.getUserProfile(GET_USER_PROFILE_URLTYPE);
    }

    goBack = () => this.props.navigation.goBack();

    uploadProfilePhoto = () =>{
        const {user} = this.state;
        console.log("In upload profile photo");
        const options = {
            title: 'Select image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response)=>{
            console.log("Res of ImagePicker: ", response);
            if(response.didCancel){
                console.log("User cancelled image picker");
            }
            else if(response.error){
                console.log("ImagePicker error: ", response.error);
            }
            else{
                const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({user:{...user, profile_img:source}});
                console.log("In upload profile photo, profile_img: ", this.state.user.profile_img);

            }
            
        });

        console.log("In upload profile photo, profile_img: ", this.state.user.profile_img);
        
        
    }

    submitHandler = () => {
        console.log("userData after edit: ", this.state.user);
        
        this.props.editProfile(this.state.user,'profile');

        const {editProfileRes} = this.props;
        console.log("In subHandler of EditProf, res:",editProfileRes);
        
        if(editProfileRes !== undefined){
            if(editProfileRes.status_code === 200){
                this.props.navigation.navigate('UserProfile');
            }
            else{
                alert(this.props.editProfileRes.message);
            }
        }
    
    }


    render() {
        const {userProfile} =  this.props;
        // console.log("In editProfile userProfile: ", userProfile);
        const {user} = this.state;

        const today = new Date();
        // console.log("today: ", today);
        

        return (
            <ImageBackground source={require('../../../assets/images/background_img.jpg')} style={{width: '100%', height: '100%'}}>
            <ScrollView>
                <CustomHeader iconName="arrow-left" handleLeftIconClick={this.goBack} headerTitle="Edit Profile" />
                <View style={styles.container}>

                    {(userProfile === undefined) ? (<ActivityIndicator color={StyleConstants.COLOR_FFFFFF} size="large" />):
                    ((userProfile.profile_img !== null)?
                        (<TouchableOpacity onPress={ () => this.uploadProfilePhoto()}>
                            <Image source={{uri: BASE_URL+userProfile.profile_img}} height={10} width={10} style={[styles.sidebarUserImage, {marginBottom: StyleConstants.PADDING,width:150, height:150 }]}/>
                         </TouchableOpacity>
                        )
                        :( (this.state.user.profile_img !== null)? 
                            (<TouchableOpacity onPress={ () => this.uploadProfilePhoto()}>
                                <Image source={user.profile_img} style={[styles.sidebarUserImage, {marginBottom: StyleConstants.PADDING,width:150, height:150 }]}/>
                            </TouchableOpacity>
                            ): 
                            (<TouchableOpacity style={[styles.sidebarUserLogo, {marginBottom: StyleConstants.PADDING,}]} onPress={ () => this.uploadProfilePhoto()}>
                                <Icon name="user-alt" color={StyleConstants.COLOR_000000} size={80} />
                            </TouchableOpacity>)
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
                                <DatePicker 
                                    date={this.state.user.dob}
                                    mode="date"
                                    // placeholder="select date"
                                    format="DD/MM/YYYY"
                                    minDate="1/1/1970"
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
                                            
                                          },
                                          dateText:{
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
