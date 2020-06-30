import React, { Component } from 'react';
import {View, Text, ScrollView, Alert, FlatList, TouchableHighlight, RefreshControl} from 'react-native';
import {Radio} from 'native-base';
import CustomHeader from '../../Common/Header';
import { styles, WINDOW_WIDTH } from '../../styles/Styles';
import { StyleConstants } from '../../styles/Constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {GET_ADDR_URLTYPE, SAVE_ADDR_URLTYPE} from '../../../API/apiConstants';
import {loggedInUserActions} from '../../../redux/actions/LoggedInUserActions';
import {connect} from 'react-redux';
import Loader from '../../Common/Loader';

class AddressList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            custmorAddress:{
                address_id: '',
                address: '',
                pincode :'',
                city:'',
                state:'',
                country:'',
                isDeliveryAddress:false,
            },
            addressListArr:'',
            addr: '',
            showLoader:false,
            isRefreshing: false,
        }
    }
    
    showLoader = () => { this.setState({ showLoader:true }); };
    hideLoader = () => { this.setState({ showLoader:false }); };

    componentDidMount(){
        this.props.getAddress(GET_ADDR_URLTYPE);
        const {addressList} = this.props;
        this.setState({addressListArr:addressList});
    }
    componentDidUpdate(prevProps){
        if(this.props.addressList !== prevProps.addressList){
            // console.log("inbuidk");
            this.setState({addressListArr:this.props.addressList});

        }
    }

    onRefresh = () => {
        this.setState({isRefreshing: true});
        this.props.getAddress(GET_ADDR_URLTYPE);
        setTimeout(() => {
            this.forceUpdate();
            this.setState({addressListArr:this.props.addressList});
            this.setState({isRefreshing:false});
        },3000);

    }

    goBack = () => this.props.navigation.goBack();

    addAddress = () => { 
        // console.log("In addAdress");
     this.props.navigation.navigate('AddAddress');}

    handleSaveAddress = async() =>{
        this.showLoader();
        // console.log("loader: ",this.state.showLoader);
        
        // console.log("Sel customer add: ", this.state.custmorAddress);
        if(this.state.custmorAddress.address_id !== '' && this.state.custmorAddress.address_id !== undefined){
            await this.props.saveAddress(this.state.custmorAddress, SAVE_ADDR_URLTYPE);
            
            setTimeout(()=>{
                const {saveAddressResponse} = this.props;
                this.hideLoader();
                if(saveAddressResponse !== undefined){
                    if(saveAddressResponse.status_code === 200){
                        this.props.navigation.navigate('OrderSummary')
                        Alert.alert("Address saved successfully");
                        
                    }
                    else{
                        Alert.alert(saveAddressResponse.message);
                    }
                }
                else{
                    this.hideLoader();
                    Alert.alert("something went wrong!! try again")
                }
            },6000);
        }else{
            this.hideLoader();
            Alert.alert("Please select the address. To add new address click on plus icon");
        }
    }

    handleDeleteAddress = (address_id) => {
        this.showLoader();
        let type = `deladdress/${address_id}`;

        if(address_id !== undefined){
            this.props.deleteAddress(type);
            // console.log("deleteAddrRes: ",deleteAddrRes);

            setTimeout(()=>{
                const {deleteAddrRes} = this.props;
                this.hideLoader();
                if(deleteAddrRes !== undefined){
                    Alert.alert(deleteAddrRes.message);
                    this.props.getAddress(GET_ADDR_URLTYPE);
                }
                else{
                    Alert.alert("Something went wrong!!!Please try again");
                }
            },5000);
        }
        else{
            this.hideLoader();
            Alert.alert("Something went wrong!!!Please try again");
        }
    }


  render() {
    // console.log("loader in render: ",this.state.showLoader);

      const {custmorAddress, addr} = this.state;
    //   const {address, pincode, city, state, country} = this.state.custmorAddress;
      const {custName} = this.props.route.params;
      const {addressList} = this.props;
    //   console.log("addr  List: ", addressList);
      let customer_address;
      (this.state.addressListArr !== undefined && this.state.addressListArr !== '')&&(customer_address = this.state.addressListArr.customer_address);
     
    return (
        <View style={{flex:1}}>
            <CustomHeader iconName="arrow-left" handleLeftIconClick={this.goBack} headerTitle="Address List" handleAddAddr={this.addAddress} rightIconName="plus"/>

            <ScrollView 
                refreshControl = {
                    <RefreshControl refreshing={this.state.isRefreshing} onRefresh={() => this.onRefresh()} />
                }
            >
                <Text style={[styles.productDetailCategory, {marginBottom: StyleConstants.MARGIN_15,}]}> Shipping Address </Text>
                <Text style={[styles.productDetailTitle, {paddingLeft:StyleConstants.PADDING_10,}]}> {custName} </Text>
                <View style={{height: 5, backgroundColor:StyleConstants.COLOR_8E8E8E, margin: StyleConstants.MARGIN_15}}/>

                <FlatList
                    data={customer_address}
                    renderItem={ ({item}) =>(
                        <View key={item.address_id.toString()} style={{flexDirection:'row', alignItems:'center', padding:StyleConstants.PADDING, width: WINDOW_WIDTH - 30}}>
                            <View style={styles.rowSpaceBetween}>
                                <View>
                                    <Radio 
                                        onPress={() => {this.setState({addr: item.address+', '+item.city+', '+item.state+', '+item.pincode+', '+item.country });
                                                    this.setState({ 
                                                        custmorAddress:{ 
                                                            // ...custmorAddress,
                                                            address_id: item.address_id,  
                                                            address: item.address,
                                                            pincode:item.pincode,
                                                            city:item.city,
                                                            state:item.state,
                                                            country:item.country,
                                                            isDeliveryAddress: true,
                                                        }
                                                    })
                                                }
                                        } 
                                        selected={addr == item.address+', '+item.city+', '+item.state+', '+item.pincode+', '+item.country } 
                                        style={{marginRight:10,paddingBottom:StyleConstants.PADDING_10}}
                                    />
                                    <Icon 
                                        name="trash-alt" 
                                        size={25} 
                                        onPress={() => 
                                                Alert.alert(
                                                    'Delete Address',
                                                    'Do you want to delete Address?',
                                                    [
                                                    {text: 'Cancel', onPress: () => {return null}},
                                                    {text: 'Confirm', onPress: () =>{ 
                                                        this.handleDeleteAddress(item.address_id)
                                                    }},
                                                    ],
                                                    { cancelable: false }
                                                )  
                                        } 
                                    />
                                </View>
                                <View style={{paddingRight:StyleConstants.PADDING_10}}>
                                    <Text style={[styles.productListName,{paddingRight:StyleConstants.PADDING_10}]}> {item.address}, {item.city}, {item.state}, {item.pincode}, {item.country} </Text>
                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={item => {return item.address_id.toString()}}
                    ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor:StyleConstants.COLOR_8E8E8E, margin: StyleConstants.MARGIN_15}}/> }
                />
                

            </ScrollView>

            <View style={{backgroundColor: StyleConstants.COLOR_FFFFFF,marginTop:30}}>
                <TouchableHighlight 
                    style={styles.saveAdrrButton} 
                    onPress = { () => this.handleSaveAddress()}
                >
                    <Text style={[styles.buttonText, {color: StyleConstants.COLOR_FFFFFF, alignSelf: 'center',}]}> SAVE ADDRESS </Text>
                </TouchableHighlight>
            </View>
            { (this.state.showLoader) && <Loader />}
        </View>
    );
  }
}

function mapState(state){
    const {addressList,saveAddressResponse,deleteAddrRes} = state.loggedInUserReducer;
    return {addressList,saveAddressResponse,deleteAddrRes};
}

const actionCreators = {
    getAddress: loggedInUserActions.getAddress,
    saveAddress: loggedInUserActions.saveAddress,
    deleteAddress: loggedInUserActions.deleteAddress,
}

export default connect(mapState, actionCreators)(AddressList);
