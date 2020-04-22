import React,{Component} from 'react';
import {Home} from './src/components/screens/Home';
import { connect } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {StyleConstants} from './src/components/styles/Constants';
import {userActions} from './src/redux/actions/userActions';
import CustomDrawerContent from './customDrawerContent';
import UserProfile from './src/components/screens/userScreens/UserProfile';

const Drawer = createDrawerNavigator();


class DrawerNav extends Component{
    constructor(props){
        super(props);
    }

    render(){
        // console.log("fkljl", this.props);
        
        return (
            
            <Drawer.Navigator drawerContent={props => CustomDrawerContent(props)}  drawerType="slide"  drawerStyle={{backgroundColor: StyleConstants.COLOR_000000, width: 300,}} itemStyle= {{color: StyleConstants.COLOR_FFFFFF, }}>
                <Drawer.Screen name="Home" component={Home} options={{headerShown: false}}/>  
                {/* <Drawer.Screen name="UserProfile" component={UserProfile} options={{headerShown: false}} /> */}
            </Drawer.Navigator>
        );
    }
};

function mapState(state) {
    const { isLogin, userData} = state.authReducer;
    return { isLogin, userData };
}
// const actionCreators = {
//     login: userActions.login,
// };

export default connect(mapState, null)(DrawerNav);