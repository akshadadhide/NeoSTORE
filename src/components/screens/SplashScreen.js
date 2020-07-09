import React, { Component} from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import {styles} from '../styles/Styles';

class SplashScreen extends Component {
   
    
    componentDidMount(){
        setTimeout(()=>this.props.navigation.navigate('Login'), 1000);
    }

  render() {
    return (
        <View style={styles.splashContainer}>
            <Text style={styles.whiteText}> Welcome to</Text>
            <Text style={[styles.whiteText,styles.brandName]}> NeoSTORE </Text>
            <ActivityIndicator size="large" color="#ffffff"  />

        </View>
    );
  }
}


export default SplashScreen;







