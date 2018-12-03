import React from 'react';
import { View, Text } from 'react-native';
import { Card, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

//formik
import { Formik } from 'formik'
import * as Yup from 'yup'

//Auth
import { onSignIn } from '../Auth';

class SignIn extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={() => this.handleSignIn()}
                    validationSchema={Yup.object().shape({
                        email: Yup
                            .string()
                            .email('Emailの形式がおかしいようです。')
                            .required('Emailは必須です。'),
                        password: Yup
                            .string()
                            .min(4, '4文字以上で入力して下さい。')
                            .required('Passowrdは必須です。'),
                    })}
                >
                    {
                        ({ handleSubmit, handleChange, values, errors, handleBlur, touched }) => (
                            <Card title='サインイン'>
                                <FormLabel>Email</FormLabel>
                                <FormInput
                                    autoCapitalize='none'
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                />
                                {(touched.email) && <FormValidationMessage>{errors.email}</FormValidationMessage>}
                                <FormLabel>Password</FormLabel>
                                <FormInput
                                    autoCapitalize='none'
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                />
                                {(touched.password) && <FormValidationMessage>{errors.password}</FormValidationMessage>}
                                <Button
                                    title='サインイン'
                                    onPress={handleSubmit}
                                    buttonStyle={{ marginTop: 20 }}
                                    backgroundColor='#0099FF'
                                />
                            </Card>
                        )
                    }
                </Formik>
                <Card title='サインアップ'>
                    <Button
                        title='サインアップ'
                        onPress={() => this.handleSignUp()}
                        buttonStyle={{ marginTop: 0 }}
                        backgroundColor='#CC9933'
                    />
                </Card>
            </View >
        );
    }

    //サインインボタンクリック時
    handleSignIn = async () => {
        try {
            //ダミーキーを保存してサインイン
            await onSignIn('xxxxx');
            //移動
            this.props.navigation.navigate('SignedIn');
        } catch (error) {
            console.log(error);
        }
    }

    //サインアウトボタンクリック時
    handleSignUp = () => {
        this.props.navigation.navigate('SignUp');
    }
}

export default SignIn;