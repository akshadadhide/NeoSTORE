import React, { Component } from 'react';
import {View, Text, ScrollView} from 'react-native';
import Header from '../../Common/Header';
import { StyleConstants } from '../../styles/Constants';
import {styles} from '../../styles/Styles';


class OrderDetails extends Component {

    goBack = () => this.props.navigation.goBack();

    render() {
        return (
            <View style={{flex: 1,}}>
                <Header iconName="arrow-left" handleLeftIconClick={this.goBack}  headerTitle="OrderNum"  rightIconName="search"/>
                <ScrollView style={{padding: StyleConstants.PADDING}}>

                    <View style={styles.rowSpaceBetween}>
                        <View></View>
                        <View>
                            <Text style={[styles.productDetailTitle, {marginBottom:0,}]}> Product Name </Text>
                            <Text style={styles.productDetailMaterial}> (material) </Text>
                            <View style={styles.rowSpaceBetween}>
                                <Text style={styles.productDetailMaterial}> QTY: </Text>
                                <Text style={styles.productDetailMaterial}> Rs.Price </Text>
                            </View>

                        </View>
                    </View>
                    <View style={{height: 0.9, backgroundColor:StyleConstants.COLOR_8E8E8E, margin: 10}}/>

                </ScrollView>

                <View style={[styles.rowSpaceBetween, {backgroundColor:StyleConstants.COLOR_FFFFFF ,borderTopColor: StyleConstants.COLOR_000000,}]}>
                    <Text style={[styles.productDetailTitle, {marginBottom:0, padding:StyleConstants.PADDING}]}> Total </Text>
                    <Text style={[styles.productDetailTitle, {marginBottom:0,padding:StyleConstants.PADDING,}]}> Rs price</Text>
                </View>

            </View>
        );
    }
}

export default OrderDetails;