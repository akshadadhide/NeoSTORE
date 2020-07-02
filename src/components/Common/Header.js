import React, {Component} from 'react';
import {Text,View, TextInput, StyleSheet, Button,StatusBar, SafeAreaView} from 'react-native';
import {Header, Left, Body, Right} from 'native-base';
import {styles, WINDOW_WIDTH} from '../styles/Styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleConstants} from '../styles/Constants';
import SearchHeader from 'react-native-search-header';
import {Autocomplete, withKeyboardAwareScrollView} from 'react-native-dropdown-autocomplete';
import { BASE_URL } from '../../API/apiConstants';
import shortid from 'shortid';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class CustomHeader extends Component {

    constructor(props){
        super(props);
        this.searchHeaderRef = null;
        this.state = {
            searchInput: '',
        }
    }

    handleSelectItem =  (item,index) =>{
        console.log("in Ha");
        const {onDropdownClose} = this.props;
        onDropdownClose();
        console.log("item: ",item);
    }

    render(){
        const {searchInput} = this.state;
        // const autocompletes = [...Array(10).keys()];
        // const apiUrl =  `${BASE_URL}getAllProductsInAscending`;
        // console.log("apiUrl: ",apiUrl);

        // const data = ['study table','office chair', 'sofa', 'yoga chair'];
        
        // const {scrollToInput, onDropdownClose, onDropdownShow} = this.props;

        return (
            <View>
                <StatusBar barStyle = 'light-content' />
                <Header style={{backgroundColor:StyleConstants.COLOR_E91C1A}}>
                    <Left>
                        <Icon name={this.props.iconName} size={25} color={StyleConstants.COLOR_FFFFFF} onPress={this.props.handleLeftIconClick}/>
                    </Left>
                    <Body>
                        <Text numberOfLines={1} style={styles.headerText}>{this.props.headerTitle}</Text>
                    </Body>
                    <Right>
                        <Icon name={this.props.rightIconName} size={25} color={StyleConstants.COLOR_FFFFFF} 
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

                {/* *********************** */}
                {/* <View style={pageStyles.autocompletesContainer}>
                    <SafeAreaView> */}
                        {/* {autocompletes.map(() => ( */}
                            {/* <Autocomplete 
                                key={shortid.generate()}
                                style={pageStyles.input}
                                scrollToInput={(ev) => scrollToInput(ev)}
                                handleSelectItem={(item,id) => this.handleSelectItem(item,id)}
                                onDropdownClose={() => onDropdownClose()}
                                onDropdownShow={() => onDropdownShow()}
                                // fetchDataUrl={apiUrl}
                                minimumCharactersCount={2}
                                highlightText={true}
                                // valueExtractor={item => item.product_name}
                                // rightContent={true}
                                // rightTextExtractor={item => item.product_material}
                                data={data} 
                                valueExtractor={item => item}
                                resetOnSelect={true}
                            /> */}
                        {/* ))} */}
                    {/* </SafeAreaView>
                </View> */}
                {/* ************************* */}

            </View>
        );
    }
};

const pageStyles = StyleSheet.create({
    autocompletesContainer: {
      paddingTop: 0,
      zIndex: 1,
      width: "100%",
      paddingHorizontal: 8,
    },
    input: {maxHeight: 40},
    inputContainer: {
      display: "flex",
      flexShrink: 0,
      flexGrow: 0,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      borderBottomWidth: 1,
      borderColor: "#c7c6c1",
      paddingVertical: 13,
      paddingLeft: 12,
      paddingRight: "5%",
      width: "100%",
      justifyContent: "flex-start",
    },
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
    },
    plus: {
      position: "absolute",
      left: 15,
      top: 10,
    },
  });


export default CustomHeader;