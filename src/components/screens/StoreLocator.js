import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native';
import {Header, Left, Body, Right, CheckBox ,Picker,} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {styles, WINDOW_HEIGHT} from '../styles/Styles';
import {StyleConstants} from '../styles/Constants';
import CustomHeader from '../Common/Header';
import MapView, {PROVIDER_GOOGLE, Marker, Callout}  from 'react-native-maps';

class StoreLocator extends Component {

    constructor(props){
        super(props);
        this.state = {
            markers: [
                {
                    title: 'Neosoft Technologies Pune',
                    coordinates: {
                      latitude: 18.509161,
                      longitude: 73.738687
                    },
                },
                {
                    title: 'Neosoft Technologies Mumbai',
                    coordinates: {
                      latitude: 19.024428,
                      longitude: 72.844279
                    },
                },
                {
                    title: 'NeoSOFT Technologies Mumbai',
                    coordinates: {
                      latitude: 19.019011,
                      longitude: 72.828490
                    },
                },
                {
                    title: 'Neosoft Technologies Rabale',
                    coordinates: {
                      latitude: 19.142068,
                      longitude: 73.008822
                    },
                },
            ],
            region: {
                latitude: 18.509161,
                longitude: 73.744279,
                latitudeDelta: 1.04864195044303443,
                longitudeDelta: 2.040142817690068,
            },
            isStoreShown: false,
            storeIcon: 'sign-out-alt',
        }

        this.backHandlerButton = this.backHandlerButton.bind(this);
    }

    backHandlerButton({navigation}){
        navigation.goBack();
    }

    storeIconHandler = () =>{
        this.setState({isStoreShown: !this.state.isStoreShown});

        if(this.state.storeIcon === 'sign-out-alt'){
            this.setState({storeIcon: 'sign-in-alt'})
        }
        else{
            this.setState({storeIcon: 'sign-out-alt'})
        }

    }

    goBack = () => this.props.navigation.goBack();

    searchHandler = (searchText) =>{
        this.props.navigation.navigate('ProductSearchRes',{searchText:searchText});
    }

    render() {
        const {markers, isStoreShown, region} = this.state;
        
        return (
            <View>
                <CustomHeader iconName='arrow-left' handleLeftIconClick={this.goBack} headerTitle='Store Locator' rightIconName='search' handleRightIconClick={this.searchHandler} />

                <Header style={{backgroundColor:'#006699'}}>
                    <Left>
                        <Icon name={this.state.storeIcon} size={25} color={StyleConstants.COLOR_FFFFFF} 
                            onPress={ () =>{this.storeIconHandler()} }
                        />
                    </Left>
                    <Body>
                    <Text numberOfLines={1} style={{fontSize: StyleConstants.FONT_20,color: StyleConstants.COLOR_FFFFFF,}}> Stores </Text>
                    </Body>
                    {/* <Right>
                        <Icon name='share-alt' size={25} color={StyleConstants.COLOR_FFFFFF} />
                    </Right> */}
                </Header>

                {(isStoreShown === false) &&
                (<View style={{height: WINDOW_HEIGHT - 140,}}>
                    <MapView
                        provider = {PROVIDER_GOOGLE}
                        initialRegion={region}
                        style={{ ...StyleSheet.absoluteFillObject}}
                        zoomTapEnabled={false}
                        showsUserLocation={true}
                        followUserLocation={true}
                    >
                        {this.state.markers.map((marker,index) => { 
                            return <Marker
                            key={index}
                                coordinate = {{
                                    latitude: marker.coordinates.latitude,
                                    longitude: marker.coordinates.longitude,
                                }}
                                title = {marker.title}
                            />
                        }) 
                        } 
                        
                    </MapView>
                </View>) }

                {(isStoreShown) && 
                (
                    <View>
                        <View style={{flexDirection:'row', margin: StyleConstants.MARGIN_15}}>
                            <CheckBox checked={true}  style={[styles.checkboxStyle,]} color={StyleConstants.COLOR_E91C1A}/>
                            <Text style={[styles.productListName ,{marginLeft: StyleConstants.MARGIN_15}]}>Untitled layer</Text>
                        </View>

                        <View style={{marginLeft: 100, }}>
                            {markers.map((marker) => {
                            return   <View style={{flexDirection:'row', padding: StyleConstants.PADDING_10}}>
                                        <Icon name="map-marker-alt" size={20} color={StyleConstants.COLOR_E91C1A} />
                                        <TouchableOpacity 
                                            onPress={() => {
                                                    this.setState({
                                                        isStoreShown: !isStoreShown, 
                                                        region:{
                                                                latitude: marker.coordinates.latitude,
                                                                longitude: marker.coordinates.longitude,
                                                                latitudeDelta: 0.04864195044303443,
                                                                longitudeDelta: 0.040142817690068,
                                                        }
                                                    });
                                                }}
                                        >
                                            <Text> {marker.title} </Text>
                                        </TouchableOpacity> 
                                    </View> 
                            })
                            }

                        </View>

                    </View>
                )}

            </View>
        );
    }
}


export default StoreLocator;