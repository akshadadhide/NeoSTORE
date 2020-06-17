import React, { Component } from 'react';
import {View, Text, Alert, ScrollView, FlatList, Picker, TouchableOpacity, ActivityIndicator, Image} from 'react-native';
import {connect} from 'react-redux';
import {cartAction} from '../../../redux/actions/cartAction';
import {GET_CART_DATA_URLTYPE, BASE_URL} from '../../../API/apiConstants';
import CustomHeader from '../../Common/Header';
import {styles, WINDOW_WIDTH} from '../../styles/Styles';
import {StyleConstants} from '../../styles/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../Common/Loader';


class CartProducts extends Component {
    constructor(props) {
        super(props);
        this.state={
            cartData:'',
            productCount:new Array(50),
            showLoader:false,

        }
    }

    goBack = () => this.props.navigation.goBack();
    showLoader = () => { this.setState({ showLoader:true }); };
    hideLoader = () => { this.setState({ showLoader:false }); };

    handlePickerChange(index,itemValue){
        const { productCount } = this.state;
        productCount.splice(index, 1, itemValue);
        this.setState({ productCount: [...productCount] });
    }

    async componentDidMount(){
        const type = GET_CART_DATA_URLTYPE;
        await this.props.getCartData(type);
        const {cartData} = await this.props;
        // console.log("cartData:----",cartData);
        
        try {
            const myArray = await AsyncStorage.getItem('cartProducts');
            if (myArray !== null) {
                let cartProducts = cartData.concat(JSON.parse(myArray));
                this.setState({cartData: cartProducts})
                // console.log("In cart m: ",JSON.parse(myArray), "cartProducts==",cartProducts);
            } 
            else{
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
            try {
                const myArray = await AsyncStorage.getItem('cartProducts');
                if (myArray !== null) {
                    let cartProducts = cartData.concat(JSON.parse(myArray));
                    this.setState({cartData: cartProducts})
                //   console.log("In cart m: ",JSON.parse(myArray), "cartProducts==",cartProducts);
                }
                else{
                    this.setState({cartData: cartData})
                } 
            }
            catch (error) {
                console.log("Error: ", error);            
            }
        }

    }

    handleDeleteProduct = (product_id) => {
        this.showLoader();
        let type = `deleteCustomerCart/${product_id}`;
        this.props.deleteCartProduct(type);
        const {deleteCartResult} = this.props;
        console.log("deleteCartResult: ",deleteCartResult);

        setTimeout(()=>{
            this.hideLoader();
            if(deleteCartResult !== undefined){
                Alert.alert(deleteCartResult.message);
            }
            else{
                Alert.alert("Something went wrong!!Please try again");
            }
        },5000);
        
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
        const{cartData} = this.state;
        // console.log("in component render cartD---", cartData);

        let totalCost;
        totalCost = (cartData !== '' && cartData !== undefined) ? this.calculateTotalCost(cartData) : 0;
       
        return (
            <View style={{flex:1, }}>
                <CustomHeader iconName="arrow-left" handleLeftIconClick={this.goBack} headerTitle="My Carts"  rightIconName="search"/>
                {(cartData === '') ? (<ActivityIndicator size='large' />) :
                (<ScrollView>
                    <FlatList
                    data={cartData}
                    renderItem={ ({item,index}) => (
                        <TouchableOpacity key={item.product_id} onPress={() => {this.props.navigation.navigate('OrderSummary',{productDetails:[cartData[index]]})}}>
                            <View style={styles.productListView}>
                                <View style={{marginRight:5,}}>
                                    <Image
                                        style={{width: 80, height: 80}}
                                        source={{uri: BASE_URL+item.product_image}}
                                    />
                                </View>
                                <View>
                                    <Text style={[styles.productDetailTitle, {marginBottom:0,}]}> {item.product_name} </Text>
                                    <Text style={styles.productDetailMaterial}> ({item.product_material}) </Text>
                                    <Text style={[styles.productDetailMaterial, {marginLeft:WINDOW_WIDTH/2.5}]}> Rs.{item.product_cost} </Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row',marginLeft:90}}>
                                <Picker selectedValue={this.state.productCount[index]} mode='dropdown' style={{width:100, height:50}} onValueChange={ (itemValue) => this.handlePickerChange(index,itemValue)}>
                                    <Picker.Item label='1' value={1} />
                                    <Picker.Item label='2' value={2} />
                                    <Picker.Item label='3' value={3} />
                                    <Picker.Item label='4' value={4} />
                                    <Picker.Item label='5' value={5} />
                                </Picker>

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
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => {item.product_id}}
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