import React from 'react';
import {Text, Image, View, TouchableHighlight, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleConstants} from './src/components/styles/Constants';
import  { styles } from './src/components/styles/Styles';
import {BASE_URL} from './src/API/apiConstants';
import {store} from './src/redux/store';
import { apiCall } from './src/API/apiCall';
import { DrawerActions } from '@react-navigation/native';

let userToken,customerInfo, cartCount=0;

const getUserToken = async() =>{
    userToken = await AsyncStorage.getItem('userToken');
    // console.log("getUserToken: ", userToken);
    customer = await AsyncStorage.getItem('customerInfo');
    customerInfo = JSON.parse(customer);
    return userToken;
}

const getCartCount = async() => {
    const myArray = await AsyncStorage.getItem('cartProducts');

    let cartData;

    const userD = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(userD);

    await apiCall(null,'GET','getCartData')
    .then(result => {
        let data
        if(result.product_details !== undefined){
            data = result.product_details
            data = data.map((value) => value.product_id);
            
        }
        cartData = data;
    })
    
    let count1=0, count2=0;
    if(cartData !== undefined && cartData !== null){
        count1 = cartData.length;
    }
    
    if(myArray !== null){
        count2 = JSON.parse(myArray).length;
    }
    else{
        count2=0;
    }
    cartCount = count1 + count2;
    
    return cartCount;
}

handleLogout = async() => {
    try {
        const myArray = await AsyncStorage.getItem('cartProducts');
        if (myArray !== null) {
            let cartProducts = JSON.parse(myArray);
            
            cartProducts.map((val) => {
                let cartItem = [{_id:val.product_id,product_id:val.product_id,quantity:1},{ flag: "logout" }];

                apiCall(cartItem,'POST','addProductToCartCheckout')
                .then(
                    (response) => {
                        console.log("logout addProductToCartCheckout response",response);
                    }
                )
                .catch((error) => 
                        console.log("Error in addProductToCartCheckout on logout",error)
                )
            });
            AsyncStorage.removeItem('cartProducts');
        }
    } catch (error) {
        console.log("Error: ", error);    
    }
    await AsyncStorage.removeItem('customerInfo');
}

CustomDrawerContent = (props) => {
    getUserToken();
    getCartCount();

    React.useEffect(()=> {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getUserToken();
            getCartCount();
        });
        return unsubscribe;
    },[props.navigation]);
       
    const userData = store.getState().authReducer.userData;
    const customerDetails = (customerInfo !== undefined && customerInfo !== null && customerInfo !== '') ? customerInfo : userData.customer_details;
    const b =((userData.status_code === 200) && (userToken !== undefined && userToken !== null));
    
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props}/>
            
            {(b) ? 
                (   (customerDetails.profile_img !== null)?
                    (<Image source={{uri: BASE_URL+customerDetails.profile_img}} height={10} width={10} style={styles.sidebarUserImage}/>)
                    :(  <TouchableOpacity style={styles.sidebarUserLogo}>
                            <Icon name="user-alt" color={StyleConstants.COLOR_000000} size={100} />
                        </TouchableOpacity>
                    )
                ):
                (<Image source={require('./src/assets/images/logo.png')} height={10} width={10} style={{alignSelf:'center',}}/>)
            }

            {(b) ?
                (
                    <View style={{justifyContent:'center', alignItems:'center', paddingBottom:StyleConstants.PADDING, }}>
                        <Text style={[styles.sidebarLink, {fontSize:StyleConstants.FONT_20}]}> {customerDetails.first_name} {customerDetails.last_name} </Text>
                        <Text style={[styles.sidebarLink, {alignSelf:'center'}]}> {customerDetails.email} </Text>
                    </View>
                ) :
                null
            }

            {(b) ?
            (
            <View style={styles.rowSpaceBetween}>
                <DrawerItem 
                icon={() => <Icon name="shopping-cart" color={ StyleConstants.COLOR_FFFFFF} size={25}/>}
                label={() => <Text style={styles.sidebarLink}>My Cart</Text> } 
                onPress={() => {props.navigation.navigate('CartProducts')}}  />
                <View  style={styles.cartCount}>
                    <Text style={styles.sidebarLink}> {cartCount} </Text>
                </View>
            </View>
            ):
            (<View style={{flex:1, }}>
                <TouchableHighlight >
                    <DrawerItem 
                    icon={() => <Icon name="user-friends" color={ StyleConstants.COLOR_FFFFFF} size={25}/>}
                    label={() => <Text style={styles.sidebarLink}> Account </Text>} 
                    // icon={() => <Icon name="arrow-up" color={ StyleConstants.COLOR_FFFFFF} size={25}/>}
                    
                    />
                </TouchableHighlight>
                <DrawerItem 
                    style={{alignSelf:'flex-end'}}
                    icon={() => <Icon name='user-alt' color={ StyleConstants.COLOR_FFFFFF} size={25}/>}
                    label={() => <Text style={[styles.sidebarLink, {paddingRight: 27}]}> User Login </Text>} 
                    onPress={() => props.navigation.navigate('Login') }
                />
                <DrawerItem 
                    style={{alignSelf:'flex-end'}}
                    icon={() => <Icon name='user-plus' color={ StyleConstants.COLOR_FFFFFF} size={25}/>}
                    label={() => <Text style={styles.sidebarLink}> User Register </Text>} 
                    onPress={() => props.navigation.navigate('Register')}
                />

            </View>)
            }

            

            <DrawerItem 
            icon={() => <Icon name="couch" color={ StyleConstants.COLOR_FFFFFF} size={25}/>}
            label={() => <Text style={styles.sidebarLink}> Sofa </Text>} 
            onPress={() => props.navigation.navigate('ProductList',{category:"Sofa", category_id:'5cfe3c5aea821930af69281e'})}  />

            <DrawerItem 
            icon={() => <Icon name="bed" color={ StyleConstants.COLOR_FFFFFF} size={25}/>}
            label={ () => <Text style={styles.sidebarLink}> Bed </Text>} 
            onPress={() => props.navigation.navigate('ProductList',{category:"Bed", category_id:'5cfe3c65ea821930af69281f'})}   />

            <DrawerItem 
            icon={() => <Icon name="chair" color={ StyleConstants.COLOR_FFFFFF} size={25}/>}
            label={() => <Text style={[styles.sidebarLink, {paddingLeft: 5}]}> Chair </Text>} 
            onPress={() => props.navigation.navigate('ProductList',{category:'Chair', category_id:'5cfe3c6fea821930af692820'})}   />

            <DrawerItem 
            icon={() => <Icon name="table" color={ StyleConstants.COLOR_FFFFFF} size={25} />}
            label={() => <Text style={styles.sidebarLink}> Table </Text>} 
            onPress={() => props.navigation.navigate('ProductList',{category:'Table', category_id:'5cfe3c79ea821930af692821'})}   />

            <DrawerItem 
            icon={() => <Icon name="dungeon" color={ StyleConstants.COLOR_FFFFFF} size={25} />}
            label={() => <Text style={styles.sidebarLink}> Almirah </Text>} 
            onPress={() => props.navigation.navigate('ProductList',{category:'Almirah', category_id:'5d14c15101ae103e6e94fbe0'})}   />

            {(b) ?
                (<DrawerItem 
                icon={() => <Icon name="user-alt" color={ StyleConstants.COLOR_FFFFFF} size={25}/>}
                label={() => <Text style={styles.sidebarLink}> My Account </Text>} 
                onPress={() => {props.navigation.navigate('UserProfile')}}  />):null}


            <DrawerItem 
            icon={() => <Icon name="map-marker-alt" color={ StyleConstants.COLOR_FFFFFF} size={25}/>}
            label={() => <Text style={[styles.sidebarLink, {paddingLeft: 5}]}> Store Locator </Text>} 
            onPress={() => props.navigation.navigate('StoreLocator')}  />

            {(b) ?
            (<View style={{paddingBottom: StyleConstants.PADDING}}>
            <DrawerItem 
            icon={() => <Icon name="sign-out-alt" color={ StyleConstants.COLOR_FFFFFF} size={25}/>}
            label={() => <Text style={styles.sidebarLink}> My Orders </Text>} 
            onPress={() => { props.navigation.navigate('OrderList')}}  />

            <DrawerItem 
                icon={() => <Icon name="sign-out-alt" color={ StyleConstants.COLOR_FFFFFF} size={25}/>}
                label={() => <Text style={styles.sidebarLink}> Logout </Text>} 
                onPress={() => 
                    Alert.alert(
                        'Log out',
                        'Do you want to logout?',
                        [
                          {text: 'Cancel', onPress: () => {return null}},
                          {text: 'Confirm', onPress: async() =>{ 
                              await handleLogout(),
                            //   props.navigation.closeDrawer();
                            await AsyncStorage.removeItem('userToken');
                              props.navigation.navigate('Home');

                          }},
                        ],
                        { cancelable: false }
                      )  
                }  
            />
            </View>):null}
        </DrawerContentScrollView>
    );
};


export default CustomDrawerContent;