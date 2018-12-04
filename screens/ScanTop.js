import React from 'react';
import { View, Text } from 'react-native';
import { Card, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

//Auth
import { isSignedIn } from '../Auth';

//formik
import { Formik } from 'formik'
import * as Yup from 'yup'

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';
import { updateQrData } from '../actions/qrAction';
import { updateValue } from '../actions/valueAction';

//config
import * as appConfig from '../app.config';

//devlib
import * as devlib from '../DevLib';

class ScanTop extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <Card title='QR読み取り'>
                    <Button
                        title='QRコードを読み取る'
                        onPress={() => this.handleReadQr()}
                        buttonStyle={{ margin: 0 }}
                        borderRadius={20}
                        icon={{ name: 'qrcode', type: 'font-awesome' }}
                        backgroundColor='#666666'
                    />
                </Card>
                <Formik
                    initialValues={{
                        user_id: '',
                        value: '',
                    }}
                    onSubmit={(values) => this.handleSendValue(values)}
                    validationSchema={Yup.object().shape({
                        user_id: Yup
                            .string()
                            .matches(/^[0-9]{10}$/, 'ユーザーIDは10桁の英数字です。')
                            .required('この項目は必須です（QRをスキャンしてください）。'),
                        value: Yup
                            .string()
                            .matches(/^[1-9][0-9]{0,2}$/, '1以上999以下の半角数字を入力してください。')
                            .required('この項目は必須です。'),
                    })}
                >
                    {
                        ({ handleSubmit, handleChange, values, errors, handleBlur, setValues }) => (
                            <Card title='サーバ連携'>
                                <FormLabel>ユーザーID</FormLabel>
                                <FormInput
                                    autoCapitalize='none'
                                    value={this.props.state.qrData.qr.data}
                                    onChangeText={(text) => {
                                        this.props.updateQrData(text);
                                        //valuesと値を同期（バリデーションを利用するため）
                                        let newValues = values;
                                        newValues.user_id = text;
                                        newValues.value = this.props.state.valueData.value.send_value
                                        setValues(newValues);
                                    }}
                                />
                                <FormValidationMessage>{errors.user_id}</FormValidationMessage>
                                <FormLabel>Value</FormLabel>
                                <FormInput
                                    autoCapitalize='none'
                                    value={String(this.props.state.valueData.value.send_value)}
                                    onChangeText={(text) => {
                                        this.props.updateValue(text);
                                        //valuesと値を同期（バリデーションを利用するため）
                                        let newValues = values;
                                        newValues.value = text;
                                        setValues(newValues);
                                    }}
                                    type='number'
                                />
                                <FormValidationMessage>{errors.value}</FormValidationMessage>
                                <Button
                                    title='加算'
                                    onPress={() => {
                                        let newValues = values;
                                        newValues.user_id = this.props.state.qrData.qr.data; //同期
                                        newValues.value = this.props.state.valueData.value.send_value; //同期
                                        newValues.operation = 'ADD'; //加算か減算かを判断するフラグ
                                        setValues(newValues);
                                        handleSubmit(); //サブミット実行（バリデーションかかる）
                                    }}
                                    buttonStyle={{ marginTop: 20 }}
                                    borderRadius={20}
                                    icon={{ name: 'plus', type: 'font-awesome' }}
                                    backgroundColor='#FF3366'
                                />
                                <Button
                                    title='減算'
                                    onPress={() => {
                                        let newValues = values;
                                        newValues.user_id = this.props.state.qrData.qr.data; //同期
                                        newValues.value = this.props.state.valueData.value.send_value; //同期
                                        newValues.operation = 'SUB'; //加算か減算かを判断するフラグ
                                        setValues(newValues);
                                        handleSubmit(); //サブミット実行（バリデーションかかる）
                                    }}
                                    buttonStyle={{ marginTop: 20 }}
                                    borderRadius={20}
                                    icon={{ name: 'minus', type: 'font-awesome' }}
                                    backgroundColor='#6699CC'
                                />
                            </Card>
                        )
                    }
                </Formik>
            </View>
        );
    }

    handleReadQr = () => {
        this.props.updateQrData(''); // qrデータをリセット
        this.props.navigation.navigate('ScanCamera');
    }

    handleSendValue = (values) => {
        alert(JSON.stringify(values));
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
        updateQrData: data => dispatch(updateQrData(data)),
        updateValue: value => dispatch(updateValue(value)),
    }
);
export default connect(mapStateToProps, mapDispatchToState)(ScanTop);
// export default ScanTop;