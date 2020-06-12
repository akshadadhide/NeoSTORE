import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Login} from './src/components/screens/userScreens/Login';
import { StyleConstants } from './src/components/styles/Constants';
import Register from './src/components/screens/userScreens/Register';
import ForgotPassword from './src/components/screens/userScreens/ForgotPassword';
import SetPassword from './src/components/screens/userScreens/SetPassword';
import DrawerNav from './DrawerNav'; 
import {ProductList} from './src/components/screens/ProductScreens/ProductList';
import {ProductDetail} from './src/components/screens/ProductScreens/ProductDetail';
import StoreLocator from './src/components/screens/StoreLocator';
import RateToProduct from './src/components/screens/ProductScreens/RateToProduct';
import OrderSummary from './src/components/screens/orderScreens/OrderSummary';
import CartProducts from './src/components/screens/ProductScreens/CartProducts';
import UserProfile from './src/components/screens/userScreens/UserProfile';
import EditProfile from './src/components/screens/userScreens/EditProfile';
import ResetPassword from './src/components/screens/userScreens/ResetPassword';
import AddAddress from './src/components/screens/userScreens/AddAddress';
import AddressList from './src/components/screens/userScreens/AddressList';
import OrderList from './src/components/screens/orderScreens/OrderList';
import OrderDetails from './src/components/screens/orderScreens/OrderDetails';
import ProductSearchRes from './src/components/screens/ProductScreens/ProductSearchRes';
import OrderId from './src/components/screens/orderScreens/OrderId';

const Stack = createStackNavigator();

class Routes extends Component {
    render() {
        return (
            
            <NavigationContainer>
                <Stack.Navigator>

                    <Stack.Screen name="DrawerNav" component={DrawerNav} options={{headerShown: false}}/>
                    <Stack.Screen name="Register" component={Register} options={{title: 'Register',  headerTintColor: StyleConstants.COLOR_FFFFFF,headerStyle: { backgroundColor: StyleConstants.COLOR_E91C1A },}}/>
                    <Stack.Screen name="Login" component={Login} options={{headerShown: false}} options={{title: 'Login',  headerTintColor: StyleConstants.COLOR_FFFFFF,headerStyle: { backgroundColor: StyleConstants.COLOR_E91C1A },}}/>   
                    
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{title: 'Forgot Password',  headerTintColor: StyleConstants.COLOR_FFFFFF,headerStyle: { backgroundColor: StyleConstants.COLOR_E91C1A },}}/>  
                    <Stack.Screen name="SetPassword" component={SetPassword} options={{headerShown: false}}/>  
                    
                    <Stack.Screen name="ProductList" component={ProductList} options={{headerShown: false}} />
                    <Stack.Screen name="ProductDetail" component={ProductDetail} options={{headerShown: false}}/>
                    <Stack.Screen name="ProductSearchRes" component={ProductSearchRes} options={{headerShown: false}} />

                    <Stack.Screen name="UserProfile" component={UserProfile} options={{headerShown: false}}/>
                    <Stack.Screen name="ResetPassword" component={ResetPassword} options={{headerShown: false}} />
                    <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown: false}} />
                    <Stack.Screen name="AddAddress" component={AddAddress} options={{headerShown: false}} />
                    <Stack.Screen name="AddressList" component={AddressList} options={{headerShown: false}} />
                   
                    <Stack.Screen name="StoreLocator" component={StoreLocator} options={{headerShown: false}} />
                    <Stack.Screen name="RateToProduct" component={RateToProduct} options={{headerShown: false}}/>
                    <Stack.Screen name="CartProducts" component={CartProducts} options={{headerShown: false}} />
                    
                    <Stack.Screen name="OrderSummary" component={OrderSummary} options={{headerShown: false}}/>
                    <Stack.Screen name="OrderList" component={OrderList} options={{headerShown: false}} />
                    <Stack.Screen name="OrderDetails" component={OrderDetails} options={{headerShown: false}} />
                    <Stack.Screen name="OrderId" component={OrderId} options={{headerShown: false}} />

                </Stack.Navigator>
                
            </NavigationContainer>

            
        );
    }
}

export default Routes;