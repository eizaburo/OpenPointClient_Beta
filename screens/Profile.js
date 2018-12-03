import React from 'react';
import { View, Text } from 'react-native';
import { Card, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

class Profile extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <Card title='サインアウト'>
                    <Button
                        title='サインアウト'
                        onPress={()=>this.handleSignOut()}
                    />
                </Card>
            </View>
        );
    }

    //サインアプトボタンクリック時
    handleSignOut = () => {
        this.props.navigation.navigate('SignedOut');
    }
}

export default Profile;