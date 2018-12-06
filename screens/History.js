import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Card, FormLabel, FormInput, FormValidationMessage, Button, ListItem } from 'react-native-elements';

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

class History extends React.Component {

    state = {
        histories: [],
        isRefreshing: false,
        end_spinner: false,
    }

    componentDidMount() {

        //listデータの事前加工
        const new_list = devlib.histories.map((item) => {
            if (item.operation === 'ADD') {
                item.icon = 'arrow-up';
                item.color = appConfig.ADD_BUTTON_COLOR;
            } else {
                item.icon = 'arrow-down';
                item.color = appConfig.SUB_BUTTON_COLOR;
            }
            return item;
        });

        //histories設定
        this.setState({
            histories: new_list,
        });
    }

    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <Card title='利用履歴'>
                    <FlatList
                        data={this.state.histories}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <ListItem
                                key={item.id}
                                title={item.id + ' ' + item.from + ' ' + item.to + ' ' + item.value}
                                subtitle={item.datetime + '@' + item.place}
                                leftIcon={{ name: item.icon, type: 'font-awesome', color: item.color }}
                                onPress={() => alert(item.id)}
                            />
                        )}
                        //pull refresh
                        onRefresh={() => this.handleRefresh()}
                        refreshing={this.state.isRefreshing}
                        //end refresh
                        onEndReached={() => this.handleEndReached()}
                        onEndReachedThreshold={0}
                        ListFooterComponent={() => <ActivityIndicator size='large' animating={this.state.end_spinner} />}
                    />
                </Card>
            </View>
        );
    }

    handleRefresh = () => {
        this.setState({ isRefreshing: false });
        alert('refresh'); //alertを出すとspinnerが消えない場合がある。なぜ？
        // console.log('refresh');
    }

    handleEndReached = () => {
        this.setState({ end_spinner: false });
        alert('end reached');
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
export default connect(mapStateToProps, mapDispatchToState)(History);
// export default History;