import React from 'react';
import { View, Text } from 'react-native';
import { Card, FormLabel, FormInput, FormValidationMessage, Button, CheckBox } from 'react-native-elements';

//Auth
import { onSignIn } from '../Auth';

//formik
import { Formik } from 'formik'
import * as Yup from 'yup'

class SignUp extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        passwordConfirm: '',
                        check: false,
                    }}
                    onSubmit={() => this.handleSignUp()}
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
                                <View style={{ paddingTop: 10 }}>
                                    <CheckBox
                                        center
                                        title='同意する'
                                        checked={values.check}
                                        onPress={() => setFieldValue('check', !values.check)}
                                    />
                                    {(touched.check) && <FormValidationMessage>{errors.check}</FormValidationMessage>}
                                </View>
                                <Button
                                    title='サインアップ'
                                    onPress={handleSubmit}
                                    buttonStyle={{ marginTop: 20 }}
                                    backgroundColor='#CC9933'
                                />
                            </Card>
                        )
                    }
                </Formik>
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