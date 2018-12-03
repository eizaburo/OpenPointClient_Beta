import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//Navigation
import {
    createBottomTabNavigator,
    createStackNavigator,
    createDrawerNavigator,
    createSwitchNavigator,
    createAppContainer
} from 'react-navigation';

//各スクリーンをimport
import Home from './screens/Home';
import Profile from './screens/Profile';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Drawer from './screens/Drawer';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

//各種Navigatorの設定
//最終的にはサインイン前のSignedInとSignedOut画面を作り、SwitchNavigatorで切り替えます。

//HomeTab
const HomeTab = createBottomTabNavigator(
    {
        Home: { screen: createStackNavigator({ screen: Home }) },
        Profile: { screen: createStackNavigator({ screen: Profile }) },
    }
);

//SignedIn
const SignedIn = createDrawerNavigator(
    {
        Home: { screen: HomeTab }
    },
    {
        contentComponent: Drawer,
    }
);

//SignedOut
const SignedOut = createStackNavigator(
    {
        SignIn: { screen: SignIn },
        SignUp: { screen: SignUp }
    }
);

//Switch
const createRootNavigator = (signedIn = false) => {
    return createSwitchNavigator(
        {
            SignedIn: { screen: SignedIn },
            SignedOut: { screen: SignedOut }
        },
        {
            initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
        }
    );
}


export default class App extends React.Component {
    render() {
        const Layout = createAppContainer(createRootNavigator(false));
        return (
            <Layout />
        );
    }
}