import React, { Component } from 'react';
import {View, Text, ScrollView} from 'react-native';
import Header from '../../Common/Header';
import { StyleConstants } from '../../styles/Constants';
import {styles} from '../../styles/Styles';


class OrderList extends Component {

    goBack = () => this.props.navigation.goBack();

    render() {
        return (
            <View style={{flex: 1,}}>
                <Header iconName="arrow-left" handleLeftIconClick={this.goBack}  headerTitle="My Orders"  rightIconName="search"/>
                <ScrollView style={{padding: StyleConstants.PADDING}}>

                    <Text style={[styles.productDetailTitle, {marginBottom:0,}]}> ID: </Text>
                    <Text style={[ styles.productListName ,{alignSelf: 'flex-end'}]}> Rs. </Text>
                    <Text style={styles.productDetailMaterial}> Ordered Date: </Text>

                    <View style={{height: 0.9, backgroundColor:StyleConstants.COLOR_8E8E8E, margin: 10}}/>

                </ScrollView>

            </View>
        );
    }
}

export default OrderList;