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

let userToken, cartData;

const getUserToken = async() =>{
    // let userToken, cartData;
    userToken = await AsyncStorage.getItem('userToken');
    console.log("getUserToken: ", userToken);

    cartData = await AsyncStorage.getItem('cartData');
    console.log("get cart data from local storage: ", [JSON.parse(cartData),{flag:'logout'}]);
    return userToken;
}

 CustomDrawerContent = (props) => {
    // console.log("In custom dnav: ", props);

    // const userData = useSelector(state => state.authReducer);
    // console.log("state", userData);

    // let userToken = getUserToken();
    getUserToken();
    console.log("user Token sidebar", userToken);
    // console.log("user Token sidebar", userToken._55);
    
    
    const userData = store.getState().authReducer.userData;
    console.log("user D", userData);
    const isLogin = store.getState().authReducer.isLogin;
    console.log("isLogin in sidebar: ", isLogin);
    const customerDetails = userData.customer_details;
    console.log("cust details" , customerDetails);
    const b =((userData.status_code === 200) && (userToken !== undefined && userToken !== null));
    console.log("b:", b);
    
    
    
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props}/>
            
            {(b) ? //(userData.status_code === 200) && (typeof userToken !== 'object')
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
            (<DrawerItem 
                icon={() => <Icon name="shopping-cart" color={ StyleConstants.COLOR_FFFFFF} size={30}/>}
            label={() => <Text style={[styles.sidebarLink,{marginRight: 10,}]}> My Carts 
                            <Text style={styles.cartCount}> 
                                {userData.cart_count}  
                            </Text> 
                        </Text>} 
                onPress={() => {props.navigation.navigate('CartProducts')}}  />
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
                    icon={() => <Icon name='user-alt' color={ StyleConstants.COLOR_FFFFFF} size={20}/>}
                    label={() => <Text style={styles.sidebarLink}> User Login </Text>} 
                    onPress={() => props.navigation.navigate('Login') }
                />
                <DrawerItem 
                    style={{alignSelf:'flex-end'}}
                    icon={() => <Icon name='user-plus' color={ StyleConstants.COLOR_FFFFFF} size={20}/>}
                    label={() => <Text style={styles.sidebarLink}> User Register </Text>} 
                    onPress={() => props.navigation.navigate('Register')}
                />

            </View>)
            }

            

            <DrawerItem 
            icon={() => <Icon name="couch" color={ StyleConstants.COLOR_FFFFFF} size={30}/>}
            label={() => <Text style={styles.sidebarLink}> Sofa </Text>} 
            onPress={() => props.navigation.navigate('ProductList',{category:"Sofa", category_id:'5cfe3c5aea821930af69281e'})}  />

            <DrawerItem 
            icon={() => <Icon name="bed" color={ StyleConstants.COLOR_FFFFFF} size={30}/>}
            label={ () => <Text style={styles.sidebarLink}> Bed </Text>} 
            onPress={() => props.navigation.navigate('ProductList',{category:"Bed", category_id:'5cfe3c65ea821930af69281f'})}   />

            <DrawerItem 
            icon={() => <Icon name="chair" color={ StyleConstants.COLOR_FFFFFF} size={30}/>}
            label={() => <Text style={styles.sidebarLink}> Chair </Text>} 
            onPress={() => props.navigation.navigate('ProductList',{category:'Chair', category_id:'5cfe3c6fea821930af692820'})}   />

            <DrawerItem 
            icon={() => <Icon name="table" color={ StyleConstants.COLOR_FFFFFF} size={30} />}
            label={() => <Text style={styles.sidebarLink}> Table </Text>} 
            onPress={() => props.navigation.navigate('ProductList',{category:'Table', category_id:'5cfe3c79ea821930af692821'})}   />

            <DrawerItem 
            icon={() => <Icon name="dungeon" color={ StyleConstants.COLOR_FFFFFF} size={30} />}
            label={() => <Text style={styles.sidebarLink}> Almirah </Text>} 
            onPress={() => props.navigation.navigate('ProductList',{category:'Almirah', category_id:'5d14c15101ae103e6e94fbe0'})}   />

            {(b) ?
                (<DrawerItem 
                icon={() => <Icon name="user-alt" color={ StyleConstants.COLOR_FFFFFF} size={30}/>}
                label={() => <Text style={styles.sidebarLink}> My Account </Text>} 
                onPress={() => {props.navigation.navigate('UserProfile')}}  />):null}


            <DrawerItem 
            icon={() => <Icon name="map-marker-alt" color={ StyleConstants.COLOR_FFFFFF} size={30}/>}
            label={() => <Text style={styles.sidebarLink}> Store Locator </Text>} 
            onPress={() => props.navigation.navigate('StoreLocator')}  />

            {(b) ?
            (<View style={{paddingBottom: StyleConstants.PADDING}}>
            <DrawerItem 
            icon={() => <Icon name="sign-out-alt" color={ StyleConstants.COLOR_FFFFFF} size={30}/>}
            label={() => <Text style={styles.sidebarLink}> My Orders </Text>} 
            onPress={() => { props.navigation.navigate('DrawerNav')}}  />

            <DrawerItem 
                icon={() => <Icon name="sign-out-alt" color={ StyleConstants.COLOR_FFFFFF} size={30}/>}
                label={() => <Text style={styles.sidebarLink}> Logout </Text>} 
                onPress={() => 
                    Alert.alert(
                        'Log out',
                        'Do you want to logout?',
                        [
                          {text: 'Cancel', onPress: () => {return null}},
                          {text: 'Confirm', onPress: async() => {
                              await apiCall([JSON.parse(cartData),{flag:'logout'}],'POST','addProductToCartCheckout')
                              .then((response)=> console.log("logout addProductToCartCheckout response",response))
                              .catch((error) => console.log("Error in addProductToCartCheckout on logout",error)
                              )
                            await AsyncStorage.removeItem('userToken');
                            props.navigation.navigate('DrawerNav');
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

// function mapState(state) {
//     // const { isLogin, userData} = state.authReducer;
//     // return { isLogin, userData };
//     return{
//         data:state
//     }
// }

export default CustomDrawerContent;