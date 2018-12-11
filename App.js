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
import Forgot from './screens/Forgot';
import Identity from './screens/Identity';
import ScanTop from './screens/ScanTop';
import ScanCamera from './screens/ScanCamera';
import History from './screens/History';

//icon
import Icon from 'react-native-vector-icons/FontAwesome';

//config
import * as appConfig from './app.config';

//各種Navigatorの設定
//最終的にはサインイン前のSignedInとSignedOut画面を作り、SwitchNavigatorで切り替えます。

//Scan
//Scan
const ScanStack = createStackNavigator(
    {
        ScanTop: {
            screen: ScanTop,
            navigationOptions: ({ navigation }) => ({
                headerLeft: (
                    <Icon name="bars" size={24} onPress={() => { navigation.openDrawer() }} style={{ paddingLeft: 20 }} color={appConfig.BARS_COLOR} />
                ),
            })
        },
        ScanCamera: { screen: ScanCamera },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: appConfig.SIGNED_IN_HEADER_COLOR,
            },
            headerTintColor: appConfig.BACK_BUTTON_COLOR,
        }),
    }
);

//HomeTab
const HomeTab = createBottomTabNavigator(
    {
        Home: {
            screen: createStackNavigator({ screen: Home }, {
                defaultNavigationOptions: ({ navigation }) => ({
                    headerLeft: (
                        <Icon name="bars" size={24} onPress={() => { navigation.openDrawer() }} style={{ paddingLeft: 20 }} color={appConfig.BARS_COLOR} />
                    ),
                    headerStyle: {
                        backgroundColor: appConfig.SIGNED_IN_HEADER_COLOR
                    },
                })
            }),
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon size={24} name="home" color={tintColor} />
            }
        },
        Identity: {
            screen: createStackNavigator({ screen: Identity }, {
                defaultNavigationOptions: ({ navigation }) => ({
                    headerLeft: (
                        <Icon name="bars" size={24} onPress={() => { navigation.openDrawer() }} style={{ paddingLeft: 20 }} color={appConfig.BARS_COLOR} />
                    ),
                    headerStyle: {
                        backgroundColor: appConfig.SIGNED_IN_HEADER_COLOR
                    },
                })
            }),
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon size={24} name="qrcode" color={tintColor} />
            }
        },
        Scan: {
            screen: ScanStack,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon size={24} name="camera" color={tintColor} />
            }
        },
        History: {
            screen: createStackNavigator({ screen: History }, {
                defaultNavigationOptions: ({ navigation }) => ({
                    headerLeft: (
                        <Icon name="bars" size={24} onPress={() => { navigation.openDrawer() }} style={{ paddingLeft: 20 }} color={appConfig.BARS_COLOR} />
                    ),
                    headerStyle: {
                        backgroundColor: appConfig.SIGNED_IN_HEADER_COLOR
                    },
                })
            }),
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon size={24} name="history" color={tintColor} />
            }
        },
        Profile: {
            screen: createStackNavigator({ screen: Profile }, {
                defaultNavigationOptions: ({ navigation }) => ({
                    headerLeft: (
                        <Icon name="bars" size={24} onPress={() => { navigation.openDrawer() }} style={{ paddingLeft: 20 }} color={appConfig.BARS_COLOR} />
                    ),
                    headerStyle: {
                        backgroundColor: appConfig.SIGNED_IN_HEADER_COLOR
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
                backgroundColor: appConfig.SIGNED_OUT_HEADER_COLOR,
            },
            inactiveTintColor: appConfig.INACTIVE_TAB_COLOR,
            activeTintColor: appConfig.ACTIVE_TAB_COLOR,
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
        SignIn: {
            screen: SignIn,
            navigationOptions: () => ({
                title: 'OpenPointClient beta',
            })
        },
        SignUp: { screen: SignUp },
        Forgot: { screen: Forgot }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: appConfig.SIGNED_OUT_HEADER_COLOR,
            },
            headerTintColor: appConfig.BACK_BUTTON_COLOR,
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