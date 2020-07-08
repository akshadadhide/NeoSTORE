import React, { Component } from 'react';
import {View, Text, ScrollView, FlatList,TouchableOpacity,ActivityIndicator} from 'react-native';
import Header from '../../Common/Header';
import { StyleConstants } from '../../styles/Constants';
import {styles} from '../../styles/Styles';
import { orderActions } from '../../../redux/actions/orderAction';
import {connect} from 'react-redux'

/**
 * This is the orderList screen
 * This screen shows the list of orders placed by user
*/

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList:'',
        }
    }
    

    goBack = () => this.props.navigation.goBack();

    componentDidMount(){
        this.props.getOrderDetails('getOrderDetails');
        const {orderDetails} = this.props;
        (orderDetails !== undefined) && this.setState({orderList:orderDetails});
    }

    //to update the state with current redux state
    componentDidUpdate(prevProps) {
        if (this.props.orderDetails !== prevProps.orderDetails) {
            this.setState({orderList: this.props.orderDetails});
        }
    }

    /**
     * Function to handle the searching functionality
     * @param {string} searchText this is the text (order) to search in the list
    */
    searchHandler = (searchText) =>{
        const {orderDetails} = this.props;
        const {orderList} = this.state;
        let newData;

        (orderList !== '' && searchText !== '') ?
        (
         newData = orderDetails.filter(item =>{
            const itemData = `${item.product_details[0].order_id.toLowerCase()}`;
            const searchTxt = searchText.toLowerCase();

            return itemData.indexOf(searchTxt) > -1;
        }),
        this.setState({orderList: newData})
        ) : 
        (
            this.setState({orderList: orderDetails})
        );
    }

    render() {
        const {orderDetails,isLoading} = this.props;
        const {orderList} = this.state;
        
        return (
            <View style={{flex: 1,}}>
                <Header iconName="arrow-left" handleLeftIconClick={this.goBack}  headerTitle="My Orders"  rightIconName="search" handleRightIconClick={this.searchHandler}/>
                
                {(orderDetails == undefined) ? 
                (<ActivityIndicator size='large' />):
                (
                <View style={{padding: StyleConstants.PADDING, marginBottom:70}}>
                    <FlatList
                    data={(orderList.length <= 0 && orderDetails !== undefined)?(orderDetails):(orderList)}
                    renderItem={ ({item}) => (
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('OrderDetails',{productDetails:item})}>
                            <Text style={[styles.productDetailTitle, {marginBottom:0,}]}> ID: {item.product_details[0].order_id} </Text>
                            <Text style={[ styles.productListName ,{alignSelf: 'flex-end'}]}> Rs. {item.product_details[0].total_productCost} </Text>
                            <Text style={styles.productDetailMaterial}> Ordered Date: {new Date(item.product_details[0].createdAt).toDateString()} </Text> 
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item,index) => item._id}
                    ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor:StyleConstants.COLOR_9E0100,margin: 10}}/>}
                    />

                    <View style={{height: 1, backgroundColor:StyleConstants.COLOR_9E0100,margin: 10}}/>
                </View>
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