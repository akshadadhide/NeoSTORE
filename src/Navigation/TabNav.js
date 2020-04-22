import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OrderSummary from '../components/screens/orderScreens/OrderSummary';
import RateToProduct from '../components/screens/ProductScreens/RateToProduct';

const Tab = createBottomTabNavigator();

const TabNav = () => {
    return (
       <Tab.Navigator>
           <Tab.Screen name="OrderSummary" component={OrderSummary} />
           <Tab.Screen name="RateToProduct" component={RateToProduct} />
       </Tab.Navigator>
    );
};

export default TabNav;