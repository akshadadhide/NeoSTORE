import React, { Component } from 'react';
import {View, Text, ScrollView, TouchableWithoutFeedback, FlatList, TouchableHighlight} from 'react-native';
import {Radio} from 'native-base';
import CustomHeader from '../../Common/Header';
import { styles, WINDOW_WIDTH } from '../../styles/Styles';
import { StyleConstants } from '../../styles/Constants';
import {GET_ADDR_URLTYPE, SAVE_ADDR_URLTYPE} from '../../../API/apiConstants';
import {loggedInUserActions} from '../../../redux/actions/LoggedInUserActions';
import {connect} from 'react-redux';

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
            addr: '',

        }
    }
    

    componentDidMount(){
        this.props.getAddress(GET_ADDR_URLTYPE);
    }

    goBack = () => this.props.navigation.goBack();

    addAddress = () => { console.log("In addAdress");
     this.props.navigation.navigate('AddAddress');}

    handleSaveAddress = () =>{
        console.log("Sel customer add: ", this.state.custmorAddress);
        this.props.saveAddress(this.state.custmorAddress, SAVE_ADDR_URLTYPE);
        
    }


  render() {
      const {custmorAddress, addr} = this.state;
    //   const {address, pincode, city, state, country} = this.state.custmorAddress;
      const {custName} = this.props.route.params;
      const {addressList} = this.props;
      console.log("addr  List: ", addressList);
      let customer_address;
      (addressList !== undefined)&&(customer_address = addressList.customer_address);
     
    return (
        <View style={{flex:1}}>
            <CustomHeader iconName="arrow-left" handleLeftIconClick={this.goBack} headerTitle="Address List" handleRightIconClick={this.addAddress} rightIconName="plus"/>

            <ScrollView style={{padding: StyleConstants.PADDING}}>
                <Text style={[styles.productDetailCategory, {marginBottom: StyleConstants.MARGIN_15,}]}> Shipping Address </Text>
                <Text style={[styles.productDetailTitle, {paddingLeft:StyleConstants.PADDING_10,}]}> {custName} </Text>

                <FlatList
                    data={customer_address}
                    renderItem={ ({item}) =>(
                        <View style={{flexDirection:'row', alignItems:'center'}}>
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
                                style={{marginRight:10}}
                            /> 
                            <Text style={styles.productListName}> {item.address}, {item.city}, {item.state}, {item.pincode}, {item.country} </Text>
                        </View>
                    )}
                    keyExtractor={item => {item.address_id}}
                    ItemSeparatorComponent={() => <View style={{height: 0.9, backgroundColor:StyleConstants.COLOR_8E8E8E, margin: StyleConstants.MARGIN_15}}/> }
                />
                

            </ScrollView>

            <View style={{backgroundColor: StyleConstants.COLOR_FFFFFF}}>
                <TouchableHighlight 
                    style={styles.saveAdrrButton} 
                    onPress = { () => this.handleSaveAddress()}
                >
                    <Text style={[styles.buttonText, {color: StyleConstants.COLOR_FFFFFF, alignSelf: 'center',}]}> SAVE ADDRESS </Text>
                </TouchableHighlight>
            </View>
        </View>
    );
  }
}

function mapState(state){
    const {addressList} = state.loggedInUserReducer;
    return {addressList};
}

const actionCreators = {
    getAddress: loggedInUserActions.getAddress,
    saveAddress: loggedInUserActions.saveAddress,
}

export default connect(mapState, actionCreators)(AddressList);
