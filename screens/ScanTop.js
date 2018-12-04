import React from 'react';
import { View, Text, Alert } from 'react-native';
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

    state = {
        add_spinner: false,
        sub_spinner: false,
        add_disabled: false,
        sub_disabled: false,
    }

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
                    onSubmit={(values, { resetForm }) => this.handleSendValue(values, { resetForm })}
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
                                    editable={false}
                                />
                                {(this.props.state.qrData.qr.data === '' && errors.user_id) && <FormValidationMessage>{errors.user_id}</FormValidationMessage>}
                                <FormLabel>Value</FormLabel>
                                <FormInput
                                    autoCapitalize='none'
                                    value={String(this.props.state.valueData.value.send_value)}
                                    onChangeText={(text) => {
                                        this.props.updateValue(text);
                                        //valuesと値を同期（バリデーションを利用するため）
                                        let newValues = values;
                                        newValues.user_id = this.props.state.qrData.qr.data;
                                        newValues.value = text;
                                        setValues(newValues);
                                    }}
                                    type='number'
                                />
                                {(errors.value) && <FormValidationMessage>{errors.value}</FormValidationMessage>}
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
                                    loading={this.state.add_spinner}
                                    disabled={this.state.add_disabled}
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
                                    loading={this.state.sub_spinner}
                                    disabled={this.state.sub_disabled}
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

    handleSendValue = (values, { resetForm }) => {
        //formをreset
        resetForm();
        //operationにより分岐
        if (values.operation === 'ADD') {
            this.showConfirmAlertForAdd(values);
        } else {
            this.showConfirmAlertForSub(values);
        }
    }

    //confirm(ADD)
    showConfirmAlertForAdd = (values) => {
        Alert.alert(
            '加算処理',
            '本当に処理を行いますか？',
            [
                { text: 'キャンセル', onPress: () => this.handleCancelForAdd(values), style: 'cancel' },
                { text: '加算処理', onPress: () => this.handleExecForAdd(values), style: 'destructive' }, //onPress直後の()にvaluesを入れない
            ]
        );
    }

    //confirm(SUB)
    showConfirmAlertForSub = (values) => {
        Alert.alert(
            '減算確認',
            '本当に処理を行いますか？',
            [
                { text: 'キャンセル', onPress: () => this.handleCancelForSub(values), style: 'cancel' },
                { text: '減算処理', onPress: () => this.handleExecForSub(values), style: 'destructive' },

            ],
            { cancelable: false }
        );
    }

    //キャンセル処理（加算）
    handleCancelForAdd = (values) => {
    }

    //キャンセル処理（減算）
    handleCancelForSub = (values) => {
    }

    //加算処理（メイン）
    handleExecForAdd = async (values) => {

        this.setState({ add_disabled: true });
        this.setState({ add_spinner: true });

        await devlib.sleep(1500);

        this.setState({ add_spinner: false });
        this.setState({ add_disabled: false });


        //実際はサーバ連携処理を書く
        const msg = values.user_id + 'に' + values.value + 'Value ' + values.operation + 'しました。';
        alert(msg);

        //formの表示をリセット（このために両方のバリューをstoreに保存）
        this.props.updateQrData('');
        this.props.updateValue(0);

    }

    //減算処理（メイン）
    handleExecForSub = async (values) => {

        this.setState({ sub_disabled: true });
        this.setState({ sub_spinner: true });

        await devlib.sleep(1500);

        this.setState({ sub_spinner: false });
        this.setState({ sub_disabled: false });

        //実際はサーバ連携処理を書く
        const msg = values.user_id + 'に' + values.value + 'Value ' + values.operation + 'しました。';
        alert(msg);

        //formの表示をリセット（このために両方のバリューをstoreに保存）
        this.props.updateQrData('');
        this.props.updateValue(0);
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