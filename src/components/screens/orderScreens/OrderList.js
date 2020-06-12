import React, { Component } from 'react';
import {View, Text, ScrollView, FlatList,TouchableOpacity,ActivityIndicator} from 'react-native';
import Header from '../../Common/Header';
import { StyleConstants } from '../../styles/Constants';
import {styles} from '../../styles/Styles';
import { orderActions } from '../../../redux/actions/orderAction';
import {connect} from 'react-redux'


class OrderList extends Component {

    goBack = () => this.props.navigation.goBack();

    componentDidMount(){
        this.props.getOrderDetails('getOrderDetails');
        const {orderDetails} = this.props;
        console.log("orderDetails: ", orderDetails);
    }
    // componentDidUpdate(prevProps){
    //     if(this.props.orderDetails !== prevProps.orderDetails){
    //         // this.props.getOrderDetails('getOrderDetails');
    //         const {orderDetails} = this.props;
    //         console.log("jhhk: ",orderDetails);
    //     }
    // }

    render() {
        const {orderDetails,isLoading} = this.props;
        console.log("In render orderDetails: ", orderDetails, 'isLoading: ',isLoading);
        
        
        return (
            <View style={{flex: 1,}}>
                <Header iconName="arrow-left" handleLeftIconClick={this.goBack}  headerTitle="My Orders"  rightIconName="search"/>
                
                {(orderDetails === undefined && isLoading === true) ? 
                (<ActivityIndicator size='large' />):
                (
                <ScrollView style={{padding: StyleConstants.PADDING}}>
                    <FlatList
                    data={orderDetails}
                    renderItem={ ({item}) => (
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('OrderDetails',{productDetails:item})}>
                            <Text style={[styles.productDetailTitle, {marginBottom:0,}]}> ID: {item.product_details[0].order_id} </Text>
                            <Text style={[ styles.productListName ,{alignSelf: 'flex-end'}]}> Rs. {item.product_details[0].total_productCost} </Text>
                            <Text style={styles.productDetailMaterial}> Ordered Date:  </Text> 
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item,index) => item.product_id}
                    ItemSeparatorComponent={() => <View style={{height: 0.5, backgroundColor:StyleConstants.COLOR_9E0100,margin: 10}}/>}
                    />

                    <View style={{height: 0.5, backgroundColor:StyleConstants.COLOR_9E0100,margin: 10}}/>
                </ScrollView>
                )}
            </View>
        );
    }
}

function mapState(state){
    const {orderDetails, isLoading} = state.orderReducer;
    return {orderDetails, isLoading};
}
const actionCreators = {
    getOrderDetails: orderActions.getOrderDetails,
};

export default connect(mapState,actionCreators)(OrderList);