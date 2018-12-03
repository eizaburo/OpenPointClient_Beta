import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//各スクリーンをimport
import Home from './screens/Home';
import Profile from './screens/Profile';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';

export default class App extends React.Component {
  render() {
    return (
      <Home />
    );
  }
}