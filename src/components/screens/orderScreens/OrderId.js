import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Header from '../../Common/Header';
import { orderActions } from '../../../redux/actions/orderAction';
import {connect} from 'react-redux';
import { styles } from '../../styles/Styles';

class OrderId extends Component {

  componentDidMount(){
    const {orderId,productDetails} = this.props.route.params;
    console.log("Id: ",orderId, "productDetails: ",productDetails);
    // const type = 'getCustomerOrderInDetail/'+orderId;
    // this.props.getCustomerOrderInDetail(type);
    // const {OrderInDetail} = this.props;
    // console.log("In render, OrderInDetail: ",OrderInDetail);
  }

  goBack = () => this.props.navigation.goBack();

  render() {
    const {orderId,productDetails} = this.props.route.params;
    console.log("Id: ",orderId, "productDetails: ",productDetails);
  

    return (
      <View>
          <Header iconName="arrow-left" handleLeftIconClick={this.goBack}  headerTitle={productDetails.product_details[0].order_id}  rightIconName="search"/>
          <View style={styles.rowSpaceBetween}>
              <View>
                  <Image source={uri} />
              </View>
              <View>

              </View>
          </View>
      </View>
    );
  }
}

export default OrderId;

// function mapState(state){
//     const {OrderInDetail, isLoading} = state.orderReducer;
//     return {OrderInDetail, isLoading};
// }
// const actionCreators = {
//     getCustomerOrderInDetail: orderActions.getCustomerOrderInDetail,
// }

// export default connect(mapState,actionCreators)(OrderId);
