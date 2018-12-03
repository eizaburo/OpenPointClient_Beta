import React from 'react';
import { View, Text } from 'react-native';
import { Card, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

class SignIn extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <Card title='サインイン'>
                    <FormLabel>Email</FormLabel>
                    <FormInput />
                    <FormValidationMessage>error</FormValidationMessage>
                    <FormLabel>Password</FormLabel>
                    <FormInput />
                    <FormValidationMessage>error</FormValidationMessage>
                    <Button
                        title='サインイン'
                        onPress={() => this.handleSignIn()}
                        buttonStyle={{ marginTop: 20 }}
                        backgroundColor='#0099FF'
                    />
                </Card>
                <Card title='サインアップ'>
                    <Button
                        title='サインアップ'
                        onPress={() => this.handleSignUp()}
                        buttonStyle={{ marginTop: 0 }}
                        backgroundColor='#CC9933'
                    />
                </Card>
            </View>
        );
    }

    //サインインボタンクリック時
    handleSignIn = () => {
        this.props.navigation.navigate('SignedIn');
    }

    //サインアウトボタンクリック時
    handleSignUp = () => {
        this.props.navigation.navigate('SignUp');
    }
}

export default SignIn;