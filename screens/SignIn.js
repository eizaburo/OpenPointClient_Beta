import React from 'react';
import { View, Text } from 'react-native';
import { Card, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

//Auth
import { onSignIn } from '../Auth';

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
    handleSignIn = async () => {
        try {
            //ダミーキーを保存してサインイン
            await onSignIn('xxxxx');
            //移動
            this.props.navigation.navigate('SignedIn');
        } catch (error) {
            console.log(error);
        }
    }

    //サインアウトボタンクリック時
    handleSignUp = () => {
        this.props.navigation.navigate('SignUp');
    }
}

export default SignIn;