import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

//Auth
import { isSignedIn } from '../Auth';

//formik
import { Formik } from 'formik'
import * as Yup from 'yup'

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';

//config
import * as appConfig from '../app.config';

//devlib
import * as devlib from '../DevLib';

class Home extends React.Component {

    state = {
        recommends: devlib.recommends,
    }

    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <Card title='おすすめ情報'>
                    <Text>{this.props.state.userData.user.name}さんとしてサインインしています。</Text>
                </Card>
                <FlatList
                    data={this.state.recommends}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <Card
                            title={item.title}
                            image={{ uri: item.image }}
                        >
                            <Button
                                title="もっと見る"
                                backgroundColor='#CC9933'
                                borderRadius={20}
                                icon={{ name: 'eye', type: 'octicon' }}
                                onPress={() => alert(item.id)}
                            />
                        </Card>
                    )}
                />
            </View>
        );
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
export default connect(mapStateToProps, mapDispatchToState)(Home);
// export default Home;