import React, { Component } from 'react';
import {View, Text, Alert, ScrollView, FlatList, TouchableOpacity, ActivityIndicator, Image} from 'react-native';
import {Picker} from 'native-base';
import { DrawerActions } from '@react-navigation/native';
import {connect} from 'react-redux';
import {cartAction} from '../../../redux/actions/cartAction';
import {GET_CART_DATA_URLTYPE, BASE_URL} from '../../../API/apiConstants';
import CustomHeader from '../../Common/Header';
import {styles, WINDOW_WIDTH} from '../../styles/Styles';
import {StyleConstants} from '../../styles/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../Common/Loader';

/**
 * This is the cart products screen 
 * which shows the list of products which are added in the cart
*/

class CartProducts extends Component {
    constructor(props) {
        super(props);
        this.state={
            cartData:'',
            productCount:new Array(50),
            showLoader:false,

        }
    }

    goBack = () => {
        this.props.navigation.goBack();
        this.props.navigation.dispatch(DrawerActions.closeDrawer());

    }
    showLoader = () => { this.setState({ showLoader:true }); };
    hideLoader = () => { this.setState({ showLoader:false }); };

    // handlePickerChange(index,itemValue){
    //     const { productCount } = this.state;
    //     productCount.splice(index, 1, itemValue);
    //     this.setState({ productCount: [...productCount] });
    // }

    componentDidMount(){
        this.getCart();
    }

    // function to get the cart data from API
    getCart = async() =>{
        const type = GET_CART_DATA_URLTYPE;
        await this.props.getCartData(type);
        const {cartData} = await this.props;
        this.setCartData(cartData); 
    }

    /**
     * function to store the cart data into the state
     * @param {array} cartData this is the array of objects of cart products
    */
    setCartData = async(cartData) => {
        
        try {
            const myArray = await AsyncStorage.getItem('cartProducts');
           
            if (myArray !== null && (cartData !== undefined && cartData !== '')) {
                let cartProducts = cartData.concat(JSON.parse(myArray));
                this.setState({cartData: cartProducts})
            } 
            if(myArray !== null && (cartData === undefined || cartData === '')){
                this.setState({cartData:JSON.parse(myArray)})
            }
            if(myArray === null && (cartData !== undefined && cartData !== '')){
                this.setState({cartData: cartData})
            }
        }
        catch (error) {
            console.log("Error: ", error);            
        }
    }

    async componentDidUpdate(prevProps){
        if(this.props.cartData !== prevProps.cartData){
            const {cartData} = this.props;
            this.setCartData(cartData);
        }
    }

    /**
     * function to handle the delete product from cart
     * @param {string} product_id this is the id of the product which you want to delete
    */
    handleDeleteProduct = async(product_id) => {
        this.showLoader();
        let type = `deleteCustomerCart/${product_id}`;
        this.props.deleteCartProduct(type);
        let productArray = await AsyncStorage.getItem('cartProducts');

        setTimeout(async()=>{
            const {deleteCartResult} = this.props;
            this.hideLoader();
            if(deleteCartResult !== undefined){
                if(deleteCartResult.message === "Product not in the cart"){
                    if(productArray !== null){
                        let newProductArray = JSON.parse(productArray);
                        let modifiedArray = newProductArray.filter((value)=>{
                            return value.product_id !== product_id;
                        });                        
                        AsyncStorage.setItem('cartProducts',JSON.stringify(modifiedArray));
                        Alert.alert("Product deleted Successfully!!");
                        this.getCart();
                    }
               
                }
                else{
                    Alert.alert(deleteCartResult.message);
                    this.getCart();
                }
            }
            else{
                Alert.alert("Something went wrong!!Please try again");
            }
        },6000);
    }

    /** 
     * function to calculate the total cost of all cart products
     * @param {array} cartData this is the array of cart products
    */
    calculateTotalCost = (cartData) => {
        let totalCost=0;
        if(cartData !== undefined && cartData !== ''){
            let costArr = cartData.map((value) => {return value.product_cost})
            let len =  costArr.length;

            for(let i=0; i<len; i++){
                totalCost = totalCost + costArr[i];
            }
        }
        else{
            totalCost = 0;
        }
        return totalCost;        
    }

    render() {
        const{cartData} = this.state;
        let totalCost;
        totalCost =this.calculateTotalCost(cartData);
       
        return (
            <View style={{flex:1, }}>
                <CustomHeader iconName="arrow-left" handleLeftIconClick={this.goBack} headerTitle="My Carts" />
                {
                 (cartData !== undefined && cartData !== '') ? 
                 
                (
                    (cartData === '') ? 
                    (<ActivityIndicator size='large' />) :
                    (<ScrollView contentContainerStyle={{flex:1, padding: StyleConstants.PADDING}}>
                        <FlatList
                        data={cartData}
                        renderItem={ ({item,index}) => (
                            <TouchableOpacity key={index} onPress={() => {this.props.navigation.navigate('OrderSummary',{productDetails:[cartData[index]]})}}>
                                <View style={[styles.productListView, {padding:0}]}>
                                    <View style={{paddingRight:10,}}>
                                        <Image
                                            style={{width: 80, height: 80}}
                                            source={{uri: BASE_URL+item.product_image}}
                                        />
                                    </View>
                                    <View style={{width: (WINDOW_WIDTH - 120)}}>
                                        <Text style={[styles.productDetailTitle, {marginBottom:0,}]}> {item.product_name} </Text>
                                        <Text style={styles.productDetailMaterial}> ({item.product_material}) </Text>
                                        {/* <Text style={[styles.productDetailMaterial, {marginLeft:WINDOW_WIDTH/2.5}]}> Rs.{item.product_cost} </Text> */}
                                    </View>
                                </View>
                                <View style={[styles.rowSpaceBetween, {padding: StyleConstants.PADDING}]}>
                                    <TouchableOpacity 
                                        style={[styles.TabNavButton, {width:70,height:35,backgroundColor:StyleConstants.COLOR_FE3F3F,} ]} 
                                        onPress={() => 
                                            Alert.alert(
                                                'Delete Product',
                                                'Do you want to delete product from cart?',
                                                [
                                                {text: 'Cancel', onPress: () => {return null}},
                                                {text: 'Confirm', onPress: () =>{ 
                                                    this.handleDeleteProduct(item.product_id);
                                                }},
                                                ],
                                                { cancelable: false }
                                            ) 
                                        } 
                                    >
                                        <Text style={[styles.TabNavButtonText,{fontSize: StyleConstants.FONT_16}]}> Delete </Text>
                                    </TouchableOpacity>
                                    <Text style={[styles.productDetailMaterial,]}> Rs.{item.product_cost} </Text> 
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => {return item.product_id.toString()}}
                        ItemSeparatorComponent={() => <View style={{height: 0.9, backgroundColor:StyleConstants.COLOR_8E8E8E, margin: 10}}/>}
                        />
                    </ScrollView>)
                ) : 
                (   <ScrollView>
                        <Text style={[styles.productListCost,{textAlign:'center'}]}> Your cart is empty!! </Text>
                    </ScrollView>
                )
                }
                

                <View style={[styles.rowSpaceBetween, {backgroundColor:StyleConstants.COLOR_FFFFFF ,borderTopColor: StyleConstants.COLOR_000000, padding:StyleConstants.PADDING,}]}>
                    <Text style={[styles.productDetailTitle, {marginBottom:0, padding:StyleConstants.PADDING}]}> Rs.{totalCost} </Text>
                    <TouchableOpacity style={[styles.TabNavButton, {backgroundColor:StyleConstants.COLOR_FE3F3F,} ]} 
                        onPress={ () =>  (cartData !== undefined) ?
                        (this.props.navigation.navigate('OrderSummary',{productDetails:cartData})):
                        (alert('Please first add product to cart')) } >
                        <Text style={styles.TabNavButtonText}> ORDER NOW </Text>
                    </TouchableOpacity>
                </View>

                {(this.state.showLoader) && <Loader />}
            </View>
        );
    }
}

function mapState(state){
    const {cartData, isLoading,deleteCartResult} = state.cartReducer;
    return {cartData, isLoading,deleteCartResult};
}

const actionCrators = {
    getCartData: cartAction.getCartData,
    deleteCartProduct: cartAction.deleteCartProduct
}

export default connect(mapState,actionCrators)(CartProducts); 