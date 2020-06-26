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
        // const searchHeaderRef = React.useRef(null);
       
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
                                // (this.props.rightIconName === 'search') && (this.setState({textboxShown:'flex', iconShown:'none'})),
                                (this.props.rightIconName === 'search') && (this.searchHeaderRef.show()),
                                (this.props.rightIconName === 'plus') ? this.props.handleAddAddr() : null
                                }
                            }
                            // onPress={this.props.handleRightIconClick}
                        />
                        {/* <TextInput value={searchInput} onChangeText={searchInput => this.setState({searchInput}) } onSubmitEditing={() => this.props.handleRightIconClick(searchInput)} placeholder="Search" placeholderTextColor={StyleConstants.COLOR_FFFFFF} style={[styles.searchInputBox,{display:this.state.textboxShown,}]}/> */}
                    </Right>
                </Header>

                <SearchHeader
                    ref = { searchHeaderRef => { this.searchHeaderRef = searchHeaderRef }}
                    placeholder = 'Search...'
                    placeholderColor = 'gray'
                    // pinnedSuggestions = {[ `sofa`, `Chair`, `Study table` ]}
                    suggestionHistoryEntryRollOverCount={7}
                    enableSuggestion={true}
                    entryAnimation='from-right-side'
                    onClear = {() => {
                        console.log(`Clearing input!`);
                    }}
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
                    onFocus =  {(event) => {
                        console.log("focus",event);
                    }}
                    onBlur =  {(event) => {
                        console.log("blur",event);
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

const pageStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f5fcff'
    },
    status: {
        zIndex: 10,
        elevation: 2,
        width: WINDOW_WIDTH,
        height: 21,
        backgroundColor: '#0097a7'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        width: WINDOW_WIDTH,
        height: 56,
        marginBottom: 6,
        backgroundColor: '#00bcd4'
    },
    label: {
        flexGrow: 1,
        fontSize: 20,
        fontWeight: `600`,
        textAlign: `left`,
        marginVertical: 8,
        paddingVertical: 3,
        color: `#f5fcff`,
        backgroundColor: `transparent`
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 130,
        height: 40,
        marginTop: 40,
        borderRadius: 2,
        backgroundColor: `#ff5722`
    }
});

export default CustomHeader;