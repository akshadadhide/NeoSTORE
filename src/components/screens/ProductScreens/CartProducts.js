import React, { Component } from 'react';
import {View, Text, ScrollView, FlatList, TouchableOpacity, ActivityIndicator, Image} from 'react-native';
import {connect} from 'react-redux';
import {cartAction} from '../../../redux/actions/cartAction';
import {GET_CART_DATA_URLTYPE, BASE_URL} from '../../../API/apiConstants';
import CustomHeader from '../../Common/Header';
import {styles, WINDOW_WIDTH} from '../../styles/Styles';
import {StyleConstants} from '../../styles/Constants';
import AsyncStorage from '@react-native-community/async-storage';


class CartProducts extends Component {
    constructor(props) {
        super(props);
        this.state={
            cartData:'',
        }
    }
    

    goBack = () => this.props.navigation.goBack();

    async componentDidMount(){
        // const type = GET_CART_DATA_URLTYPE;
        // this.props.getCartData(type);

        try {
            const myArray = await AsyncStorage.getItem('cartProducts');
            if (myArray !== null) {
                this.setState({cartData: JSON.parse(myArray)})
              console.log("In cart m: ",JSON.parse(myArray));
            }
            
        }
        catch (error) {
            console.log("Error: ", error);            
        }

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
    //    const {cartData, isLoading} = this.props;
        const{cartData} = this.state;
        // console.log("in component render", cartData,);
        let productInfo, totalCost;
        totalCost = (cartData !== '') ? this.calculateTotalCost(cartData) : 0;
        // console.log("productInfo", productInfo, "total", totalCost);
       
        return (
            <View style={{flex:1, }}>
                <CustomHeader iconName="arrow-left" handleLeftIconClick={this.goBack} headerTitle="My Carts"  rightIconName="search"/>
                {(cartData === undefined) ? (<ActivityIndicator />) :
                (<ScrollView>
                    <FlatList
                    data={cartData}
                    renderItem={ ({item,index}) => (
                        <TouchableOpacity key={item._id} onPress={() => {this.props.navigation.navigate('OrderSummary',{productDetails:[cartData[index]]})}}>
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
                    keyExtractor={(item) => {item._id}}
                    ItemSeparatorComponent={() => <View style={{height: 0.9, backgroundColor:StyleConstants.COLOR_8E8E8E, margin: 10}}/>}
                    />
                </ScrollView>)}
                

                <View style={[styles.rowSpaceBetween, {backgroundColor:StyleConstants.COLOR_FFFFFF ,borderTopColor: StyleConstants.COLOR_000000, padding:StyleConstants.PADDING,}]}>
                    <Text style={[styles.productDetailTitle, {marginBottom:0, padding:StyleConstants.PADDING}]}> Rs.{totalCost} </Text>
                    <TouchableOpacity style={[styles.TabNavButton, {backgroundColor:StyleConstants.COLOR_FE3F3F,} ]} 
                        onPress={ () =>  (cartData !== undefined) ?
                        (this.props.navigation.navigate('OrderSummary',{productDetails:cartData})):
                        (alert('Please first add product to cart')) } >
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