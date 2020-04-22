import React, { Component } from 'react';
import {View, Text, ScrollView, FlatList, TouchableOpacity, ActivityIndicator, Image} from 'react-native';
import {connect} from 'react-redux';
import {cartAction} from '../../../redux/actions/cartAction';
import {GET_CART_DATA_URLTYPE, BASE_URL} from '../../../API/apiConstants';
import CustomHeader from '../../Common/Header';
import {styles, WINDOW_WIDTH} from '../../styles/Styles';
import {StyleConstants} from '../../styles/Constants';

class CartProducts extends Component {

    goBack = () => this.props.navigation.goBack();

    componentDidMount(){
        const type = GET_CART_DATA_URLTYPE;
        this.props.getCartData(type);
    }

    calculateTotalCost = (productInfo) => {
        let costArr, totalCost=0;
        costArr = productInfo.map(value => value.product_cost);
        let len =  costArr.length;

        for(let i=0; i<len; i++){
            totalCost = totalCost + costArr[i];
        }
        return totalCost;        
    }

    render() {
       const {cartData, isLoading} = this.props;
       console.log("in component", cartData, "isloading", isLoading);
       let productInfo, totalCost;
       (cartData !== undefined && isLoading === false)?
       (productInfo = cartData, totalCost = this.calculateTotalCost(cartData) ):null
       console.log("productInfo", productInfo, "total", totalCost);
    //    console.log("Prod Image: ", productInfo.category_id.product_image);
       
       
       
        return (
            <View style={{flex:1, }}>
                <CustomHeader iconName="arrow-left" handleLeftIconClick={this.goBack} headerTitle="My Carts"  rightIconName="search"/>
                {(isLoading !== false) ? (<ActivityIndicator />) :
                (<ScrollView>
                    <FlatList
                    data={productInfo}
                    renderItem={ ({item}) => (
                        <TouchableOpacity>
                            <View style={styles.productListView}>
                                <View style={{marginRight:5,}}>
                                    <Image
                                        style={{width: 80, height: 80}}
                                        source={{uri: BASE_URL+item.category_id.product_image}}
                                    />
                                </View>
                                <View>
                                    <Text style={[styles.productDetailTitle, {marginBottom:0,}]}> {item.product_name} </Text>
                                    <Text style={styles.productDetailMaterial}> ({item.product_material}) </Text>
                                    <Text style={[styles.productDetailMaterial, {marginLeft:WINDOW_WIDTH/2.5}]}> Rs.{item.product_cost} </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => {item.product_id}}
                    ItemSeparatorComponent={() => <View style={{height: 0.9, backgroundColor:StyleConstants.COLOR_8E8E8E, margin: 10}}/>}
                    />
                </ScrollView>)}
                

                <View style={[styles.rowSpaceBetween, {backgroundColor:StyleConstants.COLOR_FFFFFF ,borderTopColor: StyleConstants.COLOR_000000, padding:StyleConstants.PADDING,}]}>
                    <Text style={[styles.productDetailTitle, {marginBottom:0, padding:StyleConstants.PADDING}]}> Rs.{totalCost} </Text>
                    <TouchableOpacity style={[styles.TabNavButton, {backgroundColor:StyleConstants.COLOR_FE3F3F,} ]} 
                        onPress={ () =>  (productInfo !== undefined) ?
                        (this.props.navigation.navigate('OrderSummary',{product_name:productInfo.product_name, product_id: productInfo.product_id, product_material:productInfo.product_material, 
                            product_image:productInfo.category_id.product_image, product_cost:productInfo.product_cost})):
                        (alert('Please Login first')) } >
                        <Text style={styles.TabNavButtonText}> ORDER NOW </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

function mapState(state){
    const {cartData, isLoading} = state.cartReducer;
    return {cartData, isLoading};
}

const actionCrators = {
    getCartData: cartAction.getCartData
}

export default connect(mapState,actionCrators)(CartProducts); 