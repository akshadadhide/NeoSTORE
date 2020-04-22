import React, { Component } from 'react';
import { TouchableOpacity, View, Text} from 'react-native';
import {styles} from '../styles/Styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleConstants} from '../styles/Constants';

export default class ProductCard extends Component {
  render() {
    return (
        <TouchableOpacity  onPress={() => this.props.navigation.navigate('ProductList',{category:this.props.categoryName, category_id:this.props.category_id})} style={[styles.homeProductsCard, this.props.styleCard ]}>
            <Text style={[styles.homeProductsCardText , this.props.alignTitle]}>{this.props.categoryName}</Text>
            <Icon style={this.props.alignIcon} name={this.props.iconName} size={70} color={StyleConstants.COLOR_FFFFFF} />
        </TouchableOpacity>
    );
  }
}
