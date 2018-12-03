import React from 'react';
import { View, Text } from 'react-native';
import { Card, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

//Auth
import { onSignOut } from '../Auth';

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';

class Profile extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <Card title='サインイン情報'>
                    <FormLabel>ID</FormLabel>
                    <FormInput
                        value={this.props.state.userData.user.id.toString()}
                    />
                    <FormLabel>Name</FormLabel>
                    <FormInput
                        value={this.props.state.userData.user.name}
                    />
                    <FormLabel>Email</FormLabel>
                    <FormInput
                        value={this.props.state.userData.user.email}
                    />
                </Card>
                <Card title='サインアウト'>
                    <Button
                        title='サインアウト'
                        onPress={() => this.handleSignOut()}
                        backgroundColor='#aaa'
                        icon={{ name: 'sign-out', type: 'font-awesome' }}
                        borderRadius={20}
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