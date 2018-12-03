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

//Auth
import { isSignedIn } from './Auth';

//redux
import { Provider } from 'react-redux';
import createStore from './createStore';
const { store } = createStore();

//各スクリーンをimport
import Home from './screens/Home';
import Profile from './screens/Profile';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Drawer from './screens/Drawer';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

//icon
import Icon from 'react-native-vector-icons/FontAwesome';

//各種Navigatorの設定
//最終的にはサインイン前のSignedInとSignedOut画面を作り、SwitchNavigatorで切り替えます。

//HomeTab
const HomeTab = createBottomTabNavigator(
    {
        Home: {
            screen: createStackNavigator({ screen: Home }, {
                defaultNavigationOptions: ({ navigation }) => ({
                    headerLeft: (
                        <Icon name="bars" size={24} onPress={() => { navigation.openDrawer() }} style={{ paddingLeft: 20 }} color='#000' />
                    ),
                    headerStyle: {
                        backgroundColor: '#eee'
                    },
                })
            }),
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon size={24} name="home" color={tintColor} />
            }
        },
        Profile: {
            screen: createStackNavigator({ screen: Profile }, {
                defaultNavigationOptions: ({ navigation }) => ({
                    headerLeft: (
                        <Icon name="bars" size={24} onPress={() => { navigation.openDrawer() }} style={{ paddingLeft: 20 }} color='#000' />
                    ),
                    headerStyle: {
                        backgroundColor: '#eee'
                    },
                })
            }),
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon size={24} name="user" color={tintColor} />
            }
        },
    },
    {
        tabBarOptions: {
            style: {
                backgroundColor: '#eee',
            },
            // inactiveTintColor: '#aaa',
            // activeTintColor: '#000',
        }
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
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#eee',
            },
            // headerTintColor: '#fff', // < Back ボタンの色変更
        },
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

    //state
    state = {
        signedIn: false,
        checkSignedIn: false,
    }

    async componentDidMount() {
        try {
            const res = await isSignedIn();
            this.setState({
                signedIn: res.signedIn,
                checkSignedIn: true,
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { checkSignedIn, signedIn } = this.state;
        if (!checkSignedIn) return null;
        // tokenがあるかないかでスイッチ
        const Layout = createAppContainer(createRootNavigator(signedIn));
        return (
            <Provider store={store}>
                <Layout />
            </Provider>
        );
    }
}