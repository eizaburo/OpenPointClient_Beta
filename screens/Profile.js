import React from 'react';
import { View, Text } from 'react-native';
import { Card, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

//Auth
import { onSignOut } from '../Auth';

class Profile extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <Card title='サインアウト'>
                    <Button
                        title='サインアウト'
                        onPress={() => this.handleSignOut()}
                    />
                </Card>
            </View>
        );
    }

    //サインアプトボタンクリック時
    handleSignOut = async () => {
        try {
            //サインアウト
            await onSignOut();
            //移動
            this.props.navigation.navigate('SignedOut');
        } catch (error) {
            console.log(error);
        }
    }
}

export default Profile;