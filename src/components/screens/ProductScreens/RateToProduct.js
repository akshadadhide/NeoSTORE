import React, { Component } from 'react';
import {View, Text, Modal,TouchableHighlight} from 'react-native';


export default class RateToProduct extends Component {

    state={
        modalVisible: true,
    }

    setModalVisible(visible){
        this.setState({modalVisible:visible});
    }


  render() {
    return (
        <View>
            <Modal
                animationType='slide'
                transparent={false}
                visible={this.state.modalVisible}
            >
                <View>
                    <Text> Product Tilte </Text>
                    <Text> Image </Text>
                    <Text> Stars </Text>

                    <TouchableHighlight onPress={ () => this.setModalVisible(!this.state.modalVisible)}>
                        <Text>RATE NOW</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        </View>
    );
  }
}
