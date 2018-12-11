import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

//Auth
import { onSignOut } from '../Auth';

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';

//config
import * as appConfig from '../app.config';

class Profile extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <ScrollView>
                    <Card title='サインイン情報'>
                        <FormLabel>ID</FormLabel>
                        <FormInput
                            value={this.props.state.userData.user.id.toString()}
                            editable={false}
                        />
                        <FormLabel>Name</FormLabel>
                        <FormInput
                            value={this.props.state.userData.user.name}
                            editable={false}
                        />
                        <FormLabel>Email</FormLabel>
                        <FormInput
                            value={this.props.state.userData.user.email}
                            editable={false}
                        />
                    </Card>
                    <Card title='サインアウト'>
                        <Button
                            title='サインアウト'
                            onPress={() => this.handleSignOut()}
                            backgroundColor={appConfig.SIGN_OUT_BUTTON_COLOR}
                            icon={{ name: 'sign-out', type: 'font-awesome' }}
                            borderRadius={20}
                        />
                    </Card>
                </ScrollView>
            </View>
        );
    }

    //サインアプトボタンクリック時
    handleSignOut = async () => {
        try {
            //サインアウト
            await onSignOut();
            //user情報クリア
            const user = {
                id: 0,
                name: '',
                email: ''
            }
            this.props.updateUserData(user);
            //移動
            this.props.navigation.navigate('SignedOut');
        } catch (error) {
            console.log(error);
        }
    }
}

const mapStateToProps = state => (
    {
        state: state,
    }
);
const mapDispatchToState = dispatch => (
    {
        updateUserData: user => dispatch(updateUserData(user)),
    }
);
export default connect(mapStateToProps, mapDispatchToState)(Profile);
// export default Profile;