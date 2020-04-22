import React, { Component } from 'react';
import {View, Text, Image, Picker, ScrollView, Button, TouchableOpacity, TouchableHighlight} from 'react-native';
import {BASE_URL} from '../../../API/apiConstants';
import {store} from '../../../redux/store';
import Header from '../../Common/Header';
import {styles} from '../../styles/Styles';
import {StyleConstants} from '../../styles/Constants';
import {WINDOW_WIDTH} from '../../styles/Styles';
import {orderActions} from '../../../redux/actions/orderAction';
import {PLACE_ORDER_URLTYPE} from '../../../API/apiConstants';
import {connect} from 'react-redux';

class OrderSummary extends Component {
    constructor(){
        super();
        this.state ={
            productCount:'1',
        }
    }

    goBack = () => this.props.navigation.goBack();

    handleAddress = (address) =>{
        let addrArr = Object.values(address);
        let customerAddress;
        for(let i=0; i<addrArr.length; i++){
            if(addrArr[i].isDeliveryAddress ===  true){
                customerAddress = addrArr[i].address+', '+addrArr[i].city+', '+addrArr[i].state+', '+addrArr[i].country+', '+addrArr[i].pincode;
                console.log("custmerAdrr: ", customerAddress);
                return customerAddress;
            }
        }
    }

  render() {
    const userData = store.getState().authReducer.userData;
    const customerDetails = userData.customer_details;
    const {product_name,product_id, product_material, product_image, product_cost} = this.props.route.params;
    const type = PLACE_ORDER_URLTYPE;
    const data = {
        product_id: product_id,
        quantity: 1,
    }
    const address =  this.handleAddress(userData.customer_address);
    

    return (
      <View style={{flex:1,}}>
            <Header iconName="arrow-left" handleLeftIconClick={this.goBack} headerTitle="Order Summary"  />
            <ScrollView>
                <View style={styles.orderSummaryView}>
                    <Text style={styles.productDetailTitle}> {customerDetails.first_name} {customerDetails.last_name} </Text>
                    <Text style={[styles.productDetailMaterial, {color:StyleConstants.COLOR_000000,}]}> {address} </Text>
                    <TouchableHighlight style={{backgroundColor:StyleConstants.COLOR_FE3F3F, padding:StyleConstants.PADDING, margin: StyleConstants.MARGIN_15, borderRadius:5, }}
                        onPress={() => this.props.navigation.navigate('AddressList',{custName: customerDetails.first_name+" "+customerDetails.last_name})}
                    >
                        <Text style={styles.TabNavButtonText}> Change Or Add Address </Text>
                    </TouchableHighlight>
                </View>
                
                <View style={styles.orderSummaryView}>
                    <View style={styles.rowSpaceBetween}>
                        <Text style={[styles.productDetailTitle, {width:WINDOW_WIDTH/2.5, } ]}>{product_name} </Text>
                        <Image source={{uri: BASE_URL+product_image}} style={[styles.productDetailSubImage, {borderWidth:0, alignSelf:'flex-end', width:85, marginTop:0,}]} />
                    </View>
                    <View style={styles.rowSpaceBetween}>
                        <Text style={[styles.productDetailMaterial, {color:StyleConstants.COLOR_000000, width:WINDOW_WIDTH/2, }]}> {product_material} </Text>
                        <Text style={[styles.productDetailMaterial, {color:StyleConstants.COLOR_000000}]}> Rs. {product_cost} </Text>
                    </View>
                    {/* <Picker selectedValue={this.state.productCount} mode='dropdown' style={{width:100, height:50}} onValueChange={ (itemValue, itemIndex) => this.setState({productCount:itemValue})}>
                        <Picker.Item lable='1' value='1' />
                        <Picker.Item lable='2' value='2' />
                        <Picker.Item lable='3' value='3' />
                    </Picker>  */}
                </View>

                <View style={styles.orderSummaryView}>
                    <Text style={{color:StyleConstants.COLOR_333333, textDecorationLine:'underline', fontSize:StyleConstants.FONT_20}}> PRICE DETAILS </Text>
                    <View style={[styles.rowSpaceBetween,{padding:StyleConstants.PADDING}]}>
                        <Text style={{color:StyleConstants.COLOR_7F7F7F, fontSize: StyleConstants.FONT_20}}> Price </Text>
                        <Text style={{color:StyleConstants.COLOR_7F7F7F, fontSize: StyleConstants.FONT_20}}> {product_cost} </Text>
                    </View>
                </View>
            </ScrollView>

            <View style={[styles.rowSpaceBetween, {padding:StyleConstants.PADDING, backgroundColor:StyleConstants.COLOR_FFFFFF, }]}>
                <Text style={[styles.productDetailTitle,{color:StyleConstants.COLOR_282727, }]}> Rs.{product_cost} </Text>
                {/* <Button title="Order Now" color={StyleConstants.COLOR_FE3F3F} style={{padding:35, height:40, width:60, }} /> */}
                <TouchableOpacity style={[styles.TabNavButton, {backgroundColor:StyleConstants.COLOR_FE3F3F,} ]}
                    onPress={() => this.props.placeOrder(data, type)}
                >
                    <Text style={styles.TabNavButtonText}> ORDER NOW </Text>
                </TouchableOpacity>
            </View>
      </View>
    );
  }
}

function mapState(state){
    const { res } = state.orderReducer;
    return {res};
}

const actionCreators = {
    placeOrder: orderActions.placeOrder,
};

export default connect(mapState, actionCreators)(OrderSummary);