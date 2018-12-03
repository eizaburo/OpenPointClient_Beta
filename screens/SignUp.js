import React from 'react';
import { View, Text } from 'react-native';
import { Card, FormLabel, FormInput, FormValidationMessage, Button, CheckBox } from 'react-native-elements';

//Auth
import { onSignIn } from '../Auth';

class SignUp extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <Card title='サインアップ'>
                    <FormLabel>Name</FormLabel>
                    <FormInput />
                    <FormValidationMessage>error</FormValidationMessage>
                    <FormLabel>Email</FormLabel>
                    <FormInput />
                    <FormValidationMessage>error</FormValidationMessage>
                    <FormLabel>Password</FormLabel>
                    <FormInput />
                    <FormValidationMessage>error</FormValidationMessage>
                    <FormLabel>Password（確認）</FormLabel>
                    <FormInput />
                    <FormValidationMessage>error</FormValidationMessage>
                    <View style={{ paddingTop: 10 }}>
                        <CheckBox
                            center
                            title='同意する'
                        />
                    </View>
                    <Button
                        title='サインアップ'
                        onPress={() => this.handleSignUp()}
                        buttonStyle={{ marginTop: 20 }}
                        backgroundColor='#CC9933'
                    />
                </Card>
            </View>
        );
    }

    //サインアウトボタンクリック時
    handleSignUp = async () => {
        try {
            //ダミーキーを保存してサインイン
            await onSignIn('xxxxx');
            //移動
            this.props.navigation.navigate('SignedIn');
        } catch (error) {
            console.log(error);
        }
    }
}

export default SignUp;