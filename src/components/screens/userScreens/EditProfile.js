import React, { Component } from 'react';
import {View, TouchableOpacity,Platform, Alert, ImageBackground, ScrollView, ActivityIndicator, Text, TouchableHighlight,Image, TextInput} from 'react-native';
import {Input, Item} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import CustomHeader from '../../Common/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import {styles} from '../../styles/Styles';
import {StyleConstants} from '../../styles/Constants';
import {loggedInUserActions} from '../../../redux/actions/LoggedInUserActions';
import DatePicker from 'react-native-datepicker';
import {NAME_REGEX, customErrors, EMAIL_REGEX, MOBILE_REGEX} from '../../../utils/Validation';
import {GET_USER_PROFILE_URLTYPE, BASE_URL} from '../../../API/apiConstants';
import ImagePicker from 'react-native-image-picker';
import Loader from '../../Common/Loader';
import RNFetchBlob from 'rn-fetch-blob';


class EditProfile extends Component {

    constructor(props){
        super(props);
        this.state={
            user: '',
            errors:{},
            changedImage:'',
            selectedImage:'',
            calendarDisplay:'none',
            showLoader:false,
            userToken:'',
        }
    }

    async componentDidMount(){
        await this.props.getUserProfile(GET_USER_PROFILE_URLTYPE);
        const {userProfile} =  this.props;
        this.setState({user:userProfile});
        const token = await AsyncStorage.getItem('userToken');
        // console.log("token: ",token);
        this.setState({userToken:token});
    }

    goBack = () => this.props.navigation.goBack();
    showLoader = () => { this.setState({ showLoader:true }); };
    hideLoader = () => { this.setState({ showLoader:false }); };

    uploadProfilePhoto = () =>{
        const {user} = this.state;
        // console.log("In upload profile photo");
        const options = {
            title: 'Select image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response)=>{
            // console.log("Res of ImagePicker: ", response);
            if(response.didCancel){
                console.log("User cancelled image picker");
            }
            else if(response.error){
                console.log("ImagePicker error: ", response.error);
            }
            else{
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                let source = {uri: response.uri}
                this.setState({user:{...user,profile_img:source},changedImage:source,selectedImage:response});
            }
            
        });
        // console.log("In upload profile photo, profile_img: ", this.state.user.profile_img);   
        
    }

    handleValidation = (field_name) => {
        const {first_name, last_name,email,phone_no,dob} = this.state.user;
        let {errors} = this.state;
        let errorFlag = true;

        //first name validation
        if(field_name === 'first_name'){
            if(first_name.length === 0 || NAME_REGEX.test(first_name) === false){
                errorFlag =  true;
                const {valueMissing, wrongPattern} = customErrors.first_name;
                errors.first_name = first_name === '' ? valueMissing : wrongPattern;
            }
            else{
                errorFlag =  false;
                delete errors.first_name;
            }
        }

        //last name validation
        if(field_name === 'last_name'){
            if(last_name.length === 0 || NAME_REGEX.test(last_name) === false){
                errorFlag =  true;
                const {valueMissing, wrongPattern} = customErrors.last_name;
                errors.last_name = last_name === '' ? valueMissing : wrongPattern;
            }
            else{
                errorFlag =  false;
                delete errors.last_name;
            }
        }

         //email validation
         if(field_name === 'email'){
            if(email.length === 0 || EMAIL_REGEX.test(email) === false){
                errorFlag = true;
                const {valueMissing, wrongPattern} = customErrors.email;
                errors.email = email === '' ? valueMissing : wrongPattern;
            }
            else{
                errorFlag =  false;
                delete errors.email;
            }
        }

        //phone number
        if(field_name === 'phone_no'){
            if(phone_no.length === 0 || MOBILE_REGEX.test(phone_no) === false){
                errorFlag = true;
                const {valueMissing, wrongPattern} = customErrors.phone_no;
                errors.phone_no = phone_no === '' ? valueMissing : wrongPattern;
            }
            else{
                errorFlag =  false;
                delete errors.phone_no;
            }
        }

        //date of birth
        if(field_name === 'dob'){
            if(dob.length === 0){
                errorFlag = true;
                const {valueMissing} = customErrors.birthDate;
                errors.dob = valueMissing;
            }
            else{
                errorFlag = false;
                delete errors.dob;
            }
        }

        this.setState({errors});
        // console.log("Error: ",errors, " errFlag: ", errorFlag);
        return errorFlag;

    }

  
    //**image upload */
    upload = () => {
        const {user,selectedImage} = this.state;
        RNFetchBlob.fetch('PUT', BASE_URL+'profile', {
            Authorization : "Bearer "+this.state.userToken,
            otherHeader : "foo",
            'Content-Type' : 'multipart/form-data',
        }, [
            { name : 'profile_img', filename : selectedImage.fileName, type:selectedImage.type, data: RNFetchBlob.wrap(selectedImage.path)},
            { name : 'first_name', data : user.first_name},
            { name : 'last_name', data : user.last_name},
            { name : 'email', data : user.email},
            { name : 'dob', data : user.dob},
            { name : 'phone_no', data : user.phone_no},
            { name : 'gender', data : user.gender},
        ])
        .then( (response) => response.json())
        .then( (responseJson) => {
            this.hideLoader();
            // console.log("Response:=",responseJson);
            (responseJson.status_code === 200) ?
            (
                this.props.updateUserData(responseJson.customer_details),
                Alert.alert("Profile updated successfully!!!"),
                this.props.navigation.navigate('UserProfile')
            ):
            (Alert.alert("Something went wrong!!Please try again"))
            
        })
        .catch((err) => {
            this.hideLoader();
            // console.log("error=+= ",err);
            Alert.alert("Something went wrong!!Please try again");
        })
    }


    submitHandler = async () => {
        this.showLoader();
        // console.log("userData after edit: ", this.state.user);
        const {user,selectedImage} = this.state;
        const errorFlag = (this.handleValidation('first_name') || this.handleValidation('last_name') 
                            || this.handleValidation('email') || this.handleValidation('phone_no')
                            || this.handleValidation('dob')
                        );
        let data;
        if(user.profile_img !== null){
            if(selectedImage !== null && selectedImage !== '' && selectedImage !== undefined){
                if(errorFlag === false){
                    await this.upload();
                }
                else{
                    this.hideLoader();
                    Alert.alert("Please check all information is correctly filled");
                }
            }else{
                this.hideLoader();
                Alert.alert("Please select profile image");
            }
        }
        else{
            if(selectedImage !== null && selectedImage !== '' && selectedImage !== undefined){
                if(errorFlag === false){
                    await this.upload();
                }
                else{
                    this.hideLoader();
                    Alert.alert("Please check all information is correctly filled");
                }
            }else{
                data = {
                    // profile_img: user.profile_img,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    dob: user.dob,
                    phone_no: user.phone_no,
                    gender: user.gender,
                };
                if(errorFlag === false){
                    this.props.editProfile(data,'profile');
                        
                    setTimeout(()=> {
                        this.hideLoader();
                        const {editProfileRes} = this.props;
                        if(editProfileRes !== undefined){
                            if(editProfileRes.status_code === 200){
                                Alert.alert("Profile updated successfully!!!");
                                this.props.navigation.navigate('UserProfile');
                            }
                            else{
                                Alert.alert("Something went wrong!!Please try again");
                            }
                        }
                        else{
                            Alert.alert("Something went wrong!!Please try again");
                        }
                    },6000);
                }
                else{
                    this.hideLoader();
                    Alert.alert("Please check all information is correctly filled");
                }
            }
        }
    }


    render() {
        const {userProfile} =  this.props;
        // console.log("In editProfile userProfile: ", userProfile);
        const {first_name, last_name, email, phone_no} = this.state.user;
        const {user,errors} = this.state;

        
        const today = new Date();

        return (
            <ImageBackground source={require('../../../assets/images/background_img.jpg')} style={{width: '100%', height: '100%'}}>
            <ScrollView>
                <CustomHeader iconName="arrow-left" handleLeftIconClick={this.goBack} headerTitle="Edit Profile" />
                <View style={styles.container}>

                    {(userProfile === undefined) ? (<ActivityIndicator color={StyleConstants.COLOR_FFFFFF} size="large" />):
                    ((userProfile.profile_img !== null)?
                        ((this.state.changedImage === undefined || this.state.changedImage === '')?
                            (<TouchableOpacity onPress={ () => this.uploadProfilePhoto()}>
                                <Image source={{uri: BASE_URL+userProfile.profile_img}} height={10} width={10} style={[styles.sidebarUserImage, {marginBottom: StyleConstants.PADDING,}]}/>
                             </TouchableOpacity>
                            ):
                            (<TouchableOpacity onPress={ () => this.uploadProfilePhoto()}>
                                <Image source={this.state.changedImage} height={10} width={10} style={[styles.sidebarUserImage, {marginBottom: StyleConstants.PADDING,}]}/>
                             </TouchableOpacity>
                            )
                        )
                        :( (this.state.changedImage !== undefined && this.state.changedImage !== '')? 
                            (<TouchableOpacity onPress={ () => this.uploadProfilePhoto()}>
                                <Image source={this.state.changedImage} height={10} width={10} style={[styles.sidebarUserImage, {marginBottom: StyleConstants.PADDING,}]}/>
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
                            <Item regular style={[styles.textboxStyle, {marginBottom:0}]}>
                                <Icon active name='user-alt' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                                <Input
                                    value={first_name} 
                                    style={styles.inputBoxText}  
                                    onChangeText={ value => this.setState({user:{...user,first_name:value}}) }
                                    onBlur={() => this.handleValidation('first_name')}
                                />
                            </Item>
                            <Text style={styles.errorText}> {errors.first_name}</Text>
                            

                            <Item regular style={[styles.textboxStyle, {marginBottom:0}]}>
                                <Icon active name='user-alt' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                                <Input
                                    value={last_name} 
                                    style={styles.inputBoxText}  
                                    onChangeText={text =>
                                                this.setState(state => {
                                                return {
                                                    ...state,
                                                    user: {
                                                    ...state.user,
                                                    last_name: text
                                                    }
                                                };
                                    })
                                    }
                                    onBlur={() => this.handleValidation('last_name')}
                                />
                            </Item>
                            <Text style={styles.errorText}> {errors.last_name}</Text>


                            <Item regular style={[styles.textboxStyle, {marginBottom:0}]}>
                                <Icon active name='envelope' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                                <Input
                                    value={email} 
                                    style={styles.inputBoxText}  
                                    onChangeText={text =>
                                                this.setState(state => {
                                                return {
                                                    ...state,
                                                    user: {
                                                    ...state.user,
                                                    email: text
                                                    }
                                                };
                                    })
                                    } 
                                    onBlur={() => this.handleValidation('email')}
                                />
                            </Item>
                            <Text style={styles.errorText}> {errors.email}</Text>


                            <Item regular style={[styles.textboxStyle, {marginBottom:0}]}>
                                <Icon active name='mobile' style={styles.textBoxIcon} size={StyleConstants.ICON_SIZE}/>
                                <Input
                                    value={phone_no} 
                                    style={styles.inputBoxText}   
                                    onChangeText={text =>
                                                this.setState(state => {
                                                return {
                                                    ...state,
                                                    user: {
                                                    ...state.user,
                                                    phone_no: text
                                                    }
                                                };
                                    })
                                    }
                                    onBlur={() => this.handleValidation('phone_no')}
                                />
                            </Item>
                            <Text style={styles.errorText}> {errors.phone_no}</Text>


                            <Item regular style={styles.textboxStyle}>
                                <DatePicker 
                                    date={this.state.user.dob}
                                    mode="date"
                                    placeholder="select birth date"
                                    format="DD-MM-YYYY"
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
                                          },
                                          placeholderText:{
                                              fontSize: StyleConstants.FONT_18
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
                            
                            {/* {(JSON.stringify(user) !== JSON.stringify(userProfile)) && */}
                            {/* ( */}
                                <TouchableHighlight style={styles.button} disabled={JSON.stringify(user) === JSON.stringify(userProfile)} onPress={() => this.submitHandler()} >
                                    <Text style={styles.buttonText}> SUBMIT </Text>
                                </TouchableHighlight>
                            {/* ) */}
                            {/* } */}

                           

                        </View>)
                    }
                </View>
            </ScrollView>
            {(this.state.showLoader) && <Loader /> }
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
    updateUserData: loggedInUserActions.updateUserData,
}

export default connect(mapState,actionCreators)(EditProfile);
