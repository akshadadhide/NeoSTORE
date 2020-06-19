import React, { Component } from 'react';
import {View, Text, Image,Alert, ScrollView, FlatList, TouchableOpacity, TouchableHighlight} from 'react-native';
// import {Picker} from '@react-native-community/picker';
import {Picker} from 'native-base';
import {BASE_URL} from '../../../API/apiConstants';
import {store} from '../../../redux/store';
import Header from '../../Common/Header';
import {styles} from '../../styles/Styles';
import {StyleConstants} from '../../styles/Constants';
import {WINDOW_WIDTH} from '../../styles/Styles';
import {orderActions} from '../../../redux/actions/orderAction';
import {PLACE_ORDER_URLTYPE} from '../../../API/apiConstants';
import {connect} from 'react-redux';
import { apiCall } from '../../../API/apiCall';
import Loader from '../../Common/Loader';

class OrderSummary extends Component {
    constructor(){
        super();
        this.state = {
            productCount:new Array(5),
            custAddress:'',
            showLoader:false,
        }

        this.handleOrderNow = this.handleOrderNow.bind(this);
    }
    componentDidMount(){
        apiCall(null,'GET','getCustAddress')
        .then((result)=> {
            // console.log("In compDidM, Addr:",result.customer_address), 
            this.setState({custAddress:result.customer_address})}
        )
        .catch(error => console.log("In compDidM, Addr error:",error))

        const {productDetails} = this.props.route.params;
        // console.log("len--- : ",productDetails.length);
        let arr=[productDetails.length];
        for(let i=0; i<productDetails.length; i++){
            // console.log("i: ",i);
            arr[i]=1;
        }
        this.setState({productCount:arr})

        // console.log("hjhbj: ",arr,"pdn fodksl: ",this.state.productCount);   
    }

    showLoader = () => { this.setState({ showLoader:true }); };
    hideLoader = () => { this.setState({ showLoader:false }); };

    handlePickerChange(index,itemValue){
        const { productCount } = this.state;
        productCount.splice(index, 1, itemValue);

        this.setState({ productCount: [...productCount] });
    }

    calculateTotalCost(){
        const {productDetails} = this.props.route.params;
        const {productCount} = this.state
        let totalCost=0;
        for(let i=0; i<productDetails.length; i++){
            totalCost = totalCost + (productDetails[i].product_cost * productCount[i]);
        }
        return totalCost;
    }

    goBack = () => this.props.navigation.goBack();

    handleAddress = (address) =>{
        let addrArr = Object.values(address);
        // console.log("In handleAddr of OrderSummary, addArr: ", addrArr);
        
        let customerAddress;
        for(let i=0; i<addrArr.length; i++){
            if(addrArr[i].isDeliveryAddress ===  true){
                customerAddress = addrArr[i].address+', '+addrArr[i].city+', '+addrArr[i].state+', '+addrArr[i].country+', '+addrArr[i].pincode;
                // console.log("custmerAdrr: ", customerAddress);
                return customerAddress;
            }
        }
    }

    handleOrderNow(){
        this.showLoader();
        // console.log("loader",this.state.showLoader);

        const {productDetails} = this.props.route.params;

        const type = PLACE_ORDER_URLTYPE;

        productDetails.map( (value,index) => {
            // console.log("Val: ",value, "index: ",index);
            
            const data = [{
                _id: value.product_id,
                product_id: value.product_id,
                quantity: this.state.productCount[index],
            },{flag : "checkout"}];
            // console.log("data-----", data);

            if(data !== undefined){
                this.props.placeOrder(data, type);
                const {res} = this.props;

                setTimeout(()=>{
                    this.hideLoader();
                    (res !== undefined) ? 
                    (Alert.alert(res.message)): 
                    Alert.alert("Something went wrong!!!try again");
                },5000);
            }
            else{
                this.hideLoader();
                Alert.alert("Something went wrong!!!Please try again")
            }
        });
    }

  render() {
    // console.log("render loader",this.state.showLoader);

    const userData = store.getState().authReducer.userData;
    const customerDetails = userData.customer_details;
    const {custAddress} = this.state;
    // const {product_name,product_id, product_material, product_image, product_cost} = this.props.route.params;
    const {productDetails} = this.props.route.params;
    // console.log("productDetails: ",productDetails);
    // product_id = productDetails[0].product_id;
    
    
    
    const address = custAddress !== undefined ? this.handleAddress(custAddress) : null
    // console.log("In render deliver add: ", address);
    // console.log("c---------: ",this.state.productCount, "len: ",productDetails.length);
    
    let totalCost = this.calculateTotalCost();
    // console.log("total cost: ",totalCost);
    
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
                
                <FlatList 
                data={productDetails}
                renderItem={ ({item,index}) => (
                    <View style={styles.orderSummaryView}>
                        <View key={index} style={styles.rowSpaceBetween}>
                            <Text style={[styles.productDetailTitle, {width:WINDOW_WIDTH/2.5, } ]}>{item.product_name} </Text>
                            <Image source={{uri: BASE_URL+item.product_image}} style={[styles.productDetailSubImage, {borderWidth:0, alignSelf:'flex-end', width:85, marginTop:0,}]} />
                        </View>
                        <View style={styles.rowSpaceBetween}>
                            <Text style={[styles.productDetailMaterial, {color:StyleConstants.COLOR_000000, width:WINDOW_WIDTH/2, }]}> {item.product_material} </Text>
                            <Text style={[styles.productDetailMaterial, {color:StyleConstants.COLOR_000000}]}> Rs. {this.state.productCount[index] * item.product_cost} </Text>
                        </View>
                        <Picker selectedValue={this.state.productCount[index]} mode='dropdown' style={{width:100, height:50}} onValueChange={ (itemValue) => this.handlePickerChange(index,itemValue)}>
                            <Picker.Item label='1' value={1} />
                            <Picker.Item label='2' value={2} />
                            <Picker.Item label='3' value={3} />
                            <Picker.Item label='4' value={4} />
                            <Picker.Item label='5' value={5} />
                        </Picker> 
                    </View> 
                )}
                keyExtractor={(item) => {return item._id}}
                />

                <View style={styles.orderSummaryView}>
                    <Text style={{color:StyleConstants.COLOR_333333, textDecorationLine:'underline', fontSize:StyleConstants.FONT_20}}> PRICE DETAILS </Text>
                    <View style={[styles.rowSpaceBetween,{padding:StyleConstants.PADDING}]}>
                        <Text style={{color:StyleConstants.COLOR_7F7F7F, fontSize: StyleConstants.FONT_20}}> Price </Text>
                        <Text style={{color:StyleConstants.COLOR_7F7F7F, fontSize: StyleConstants.FONT_20}}> {totalCost} </Text>
                    </View>
                </View>
            </ScrollView>

            <View style={[styles.rowSpaceBetween, {padding:StyleConstants.PADDING, backgroundColor:StyleConstants.COLOR_FFFFFF, }]}>
                <Text style={[styles.productDetailTitle,{color:StyleConstants.COLOR_282727, }]}> Rs.{totalCost} </Text>
                <TouchableOpacity style={[styles.TabNavButton, {backgroundColor:StyleConstants.COLOR_FE3F3F,} ]}
                    onPress={this.handleOrderNow}
                >
                    <Text style={styles.TabNavButtonText}> ORDER NOW </Text>
                </TouchableOpacity>
            </View>

            {(this.state.showLoader) && <Loader />}
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