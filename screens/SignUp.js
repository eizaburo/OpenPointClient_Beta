import React from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Card, FormLabel, FormInput, FormValidationMessage, Button, CheckBox } from 'react-native-elements';

//Auth
import { onSignIn } from '../Auth';

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

class SignUp extends React.Component {

    state = {
        spinner: false,
    }

    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <KeyboardAvoidingView behavior='position'>
                    <ScrollView>
                        <Formik
                            initialValues={{
                                name: 'test2',
                                email: 'test2@test.com',
                                password: 'testtest',
                                passwordConfirm: 'testtest',
                                check: false,
                            }}
                            onSubmit={(values) => this.handleSignUp(values)}
                            validationSchema={Yup.object().shape({
                                name: Yup
                                    .string().matches(/^(^[a-zA-Z0-9\-_\.]+$)/, '半角英数字のみで入力してください。')
                                    .min(4, '名前は4文字以上8文字以内で入力して下さい。')
                                    .max(16, '名前は4文字以上16文字以内で入力して下さい。')
                                    .required('名前の入力は必須です。'),
                                email: Yup
                                    .string()
                                    .email('Emailの形式ではないようです。')
                                    .required('Emailの入力は必須です。')
                                    .test('check-mail-exist', 'このEmailは既に利用されています。', (value) => {
                                        if (value === 'exist@test.com') {
                                            return false;
                                        } else {
                                            return true;
                                        }
                                    }),
                                password: Yup
                                    .string()
                                    .min(4, '4文字以上で入力して下さい。')
                                    .required('パスワードの入力は必須です。'),
                                passwordConfirm: Yup
                                    .string()
                                    .required('パスワードの確認は必須です。')
                                    .oneOf([Yup.ref('password')], 'パスワードが一致しません。'),
                                check: Yup
                                    .boolean().oneOf([true], '同意にチェックお願いします。')
                            })}
                        >
                            {
                                ({ handleSubmit, handleChange, values, errors, handleBlur, touched, setFieldValue }) => (
                                    <Card title='サインアップ'>
                                        <FormLabel>Name</FormLabel>
                                        <FormInput
                                            autoCapitalize='none'
                                            value={values.name}
                                            onChangeText={handleChange('name')}
                                            onBlur={handleBlur('name')}
                                        />
                                        {(touched.name && errors.name) && <FormValidationMessage>{errors.name}</FormValidationMessage>}
                                        <FormLabel>Email</FormLabel>
                                        <FormInput
                                            autoCapitalize='none'
                                            value={values.email}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                        />
                                        {(touched.email && errors.email) && <FormValidationMessage>{errors.email}</FormValidationMessage>}
                                        <FormLabel>Password</FormLabel>
                                        <FormInput
                                            autoCapitalize='none'
                                            value={values.password}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            secureTextEntry
                                        />
                                        {(touched.password && errors.password) && <FormValidationMessage>{errors.password}</FormValidationMessage>}
                                        <FormLabel>Password（確認）</FormLabel>
                                        <FormInput
                                            autoCapitalize='none'
                                            value={values.passwordConfirm}
                                            onChangeText={handleChange('passwordConfirm')}
                                            onBlur={handleBlur('passwordConfirm')}
                                            secureTextEntry
                                        />
                                        {(touched.passwordConfirm && errors.passwordConfirm) && <FormValidationMessage>{errors.passwordConfirm}</FormValidationMessage>}
                                        <Button
                                            title='規約を読む'
                                            onPress={()=>this.props.navigation.navigate('Agreement')}
                                            transparent
                                            color='blue'
                                            buttonStyle={{ marginTop: 10 }}
                                        />
                                        <View style={{ paddingTop: 0 }}>
                                            <CheckBox
                                                center
                                                title='規約に同意する'
                                                checked={values.check}
                                                onPress={() => setFieldValue('check', !values.check)}
                                            />
                                            {(touched.check && errors.check) && <FormValidationMessage>{errors.check}</FormValidationMessage>}
                                        </View>
                                        <Button
                                            title='サインアップ'
                                            onPress={handleSubmit}
                                            buttonStyle={{ marginTop: 10 }}
                                            backgroundColor={appConfig.SING_UP_BUTTON_COLOR}
                                            icon={{ name: 'user-plus', type: 'font-awesome' }}
                                            borderRadius={20}
                                            loading={this.state.spinner}
                                        />
                                    </Card>
                                )
                            }
                        </Formik>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }

    //サインアウトボタンクリック時
    handleSignUp = async (values) => {
        try {
            //spinner on
            this.setState({ spinner: true });
            //async
            await devlib.sleep(1500);
            //spinner off（本当はもっと後の処理）
            this.setState({ spinner: false });

            //ダミーキーを保存してサインイン
            await onSignIn('xxxxx');
            // user情報をreduxに保持
            const user = {
                id: 88,
                name: values.name,
                email: values.email
            }
            this.props.updateUserData(user);
            //移動
            this.props.navigation.navigate('SignedIn');
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
export default connect(mapStateToProps, mapDispatchToState)(SignUp);
// export default SignUp;