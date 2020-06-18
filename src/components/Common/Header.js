import React, {Component} from 'react';
import {Text, TextInput} from 'react-native';
import {Header, Left, Body, Right} from 'native-base';
import {styles} from '../styles/Styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleConstants} from '../styles/Constants';

class CustomHeader extends Component {

    constructor(props){
        super(props);
        this.state = {
            iconShown: 'flex',
            textboxShown: 'none',
            searchInput: '',
        }
    }

    render(){
        const {searchInput} = this.state;
        
       
        return (
            <Header style={{backgroundColor:StyleConstants.COLOR_E91C1A}}>
                <Left>
                    <Icon name={this.props.iconName} size={25} color={StyleConstants.COLOR_FFFFFF} onPress={this.props.handleLeftIconClick}/>
                </Left>
                <Body>
                <Text numberOfLines={1} style={styles.headerText}>{this.props.headerTitle}</Text>
                </Body>
                <Right>
                    <Icon name={this.props.rightIconName} size={25} color={StyleConstants.COLOR_FFFFFF} style={{display:this.state.iconShown}} 
                        onPress={ ()=>{
                            (this.props.rightIconName === 'search') && (this.setState({textboxShown:'flex', iconShown:'none'})),
                            (this.props.rightIconName === 'plus') ? this.props.handleAddAddr() : null
                            }
                        }
                    />
                    <TextInput value={searchInput} onChangeText={searchInput => this.setState({searchInput}) } onSubmitEditing={() => this.props.handleRightIconClick(searchInput)} placeholder="Search" placeholderTextColor={StyleConstants.COLOR_FFFFFF} style={[styles.searchInputBox,{display:this.state.textboxShown,}]}/>
                </Right>
            </Header>
        );
    }
};

export default CustomHeader;