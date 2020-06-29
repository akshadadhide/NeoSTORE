import React, {Component} from 'react';
import {Text,View, TextInput, StyleSheet, Button} from 'react-native';
import {Header, Left, Body, Right} from 'native-base';
import {styles, WINDOW_WIDTH} from '../styles/Styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleConstants} from '../styles/Constants';
import SearchHeader from 'react-native-search-header';

class CustomHeader extends Component {

    constructor(props){
        super(props);
        this.searchHeaderRef = null;
        this.state = {
            iconShown: 'flex',
            textboxShown: 'none',
            searchInput: '',
        }
    }

    render(){
        const {searchInput} = this.state;
       
        return (
            <View>
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
                                (this.props.rightIconName === 'search') && (this.searchHeaderRef.show()),
                                (this.props.rightIconName === 'plus') ? this.props.handleAddAddr() : null
                                }
                            }
                        />
                    </Right>
                </Header>

                <SearchHeader
                    ref = { searchHeaderRef => { this.searchHeaderRef = searchHeaderRef }}
                    placeholder = 'Search...'
                    placeholderColor = 'gray'
                    // pinnedSuggestions = {[ `sofa`, `Chair`, `Study table` ]}
                    suggestionHistoryEntryRollOverCount={7}
                    enableSuggestion={false}
                    autoCorrect={true}
                    entryAnimation='from-right-side'
                    // onGetAutocompletions = {async (text) => {
                    //     if (text) {
                    //         const response = await fetch(`http://suggestqueries.google.com/complete/search?client=firefox&q=${text}`, {
                    //             method: `get`
                    //         });
                    //         const data = await response.json();
                    //         return data[1];
                    //     } else {
                    //         return [];
                    //     }
                    // }}
                    onSearch = {(event) => {
                        // console.log("onS",event.nativeEvent.text);
                        this.props.handleRightIconClick(event.nativeEvent.text)
                    }}
                    style = {{
                        header: {
                            height: 50,
                            marginTop: 2,
                            marginHorizontal: 9,
                            borderRadius: 19,
                            backgroundColor: `#fdfdfd`
                        },
                        input: {
                            fontSize: 16,
                            margin: 0,
                            padding: 0,
                            borderRadius: 0,
                            backgroundColor: `transparent`
                        }
                    }}
                />
            </View>
        );
    }
};


export default CustomHeader;