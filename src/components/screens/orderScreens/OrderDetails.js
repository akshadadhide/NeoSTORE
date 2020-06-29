import React, { Component } from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import Header from '../../Common/Header';
import { StyleConstants } from '../../styles/Constants';
import {styles, WINDOW_WIDTH} from '../../styles/Styles';
import { BASE_URL } from '../../../API/apiConstants';


class OrderDetails extends Component {

    goBack = () => this.props.navigation.goBack();

    render() {
        const {productDetails} = this.props.route.params;
        // console.log("productDetails: ",productDetails);
        const orderInfo = productDetails.product_details[0];
        const productInfo = orderInfo.product_details[0];


        return (
            <View style={{flex: 1,}}>
                <Header iconName="arrow-left" handleLeftIconClick={this.goBack}  headerTitle={orderInfo.order_id}/>
                <ScrollView style={{padding: StyleConstants.PADDING}}>

                    <View style={styles.rowSpaceBetween}>
                        <View>
                        <Image
                            style={{width: 80, height: 80}}
                            source={{uri: BASE_URL+productInfo.product_image}}
                        />
                        </View>
                        <View style={{width: WINDOW_WIDTH-130}}>
                            <Text style={[styles.productDetailTitle, {marginBottom:0,}]}> {productInfo.product_name} </Text>  
                            <Text style={styles.productDetailMaterial}> {productInfo.product_material} </Text>
                            <View style={styles.rowSpaceBetween}>
                                <Text style={styles.productDetailMaterial}> QTY: {orderInfo.quantity} </Text>
                                <Text style={styles.productDetailMaterial}> Rs.{(productInfo.product_cost) * (orderInfo.quantity)} </Text>
                            </View>

                        </View>
                    </View>
                    <View style={{height: 1, backgroundColor:StyleConstants.COLOR_8E8E8E, marginTop:5}}/>

                </ScrollView>

                <View style={[styles.rowSpaceBetween, {backgroundColor:StyleConstants.COLOR_FFFFFF ,borderTopColor: StyleConstants.COLOR_000000,}]}>
                    <Text style={[styles.productDetailTitle, {marginBottom:0, padding:StyleConstants.PADDING}]}> Total </Text>
                    <Text style={[styles.productDetailTitle, {marginBottom:0,padding:StyleConstants.PADDING,}]}> Rs. {productInfo.product_cost * orderInfo.quantity}</Text>
                </View>

            </View>
        );
    }
}

export default OrderDetails;