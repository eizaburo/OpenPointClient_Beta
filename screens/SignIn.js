import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

//formik
import { Formik } from 'formik'
import * as Yup from 'yup'

//Auth
import { onSignIn } from '../Auth';

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';

//config
import * as appConfig from '../app.config';

//devlib
import * as devlib from '../DevLib';

class SignIn extends React.Component {

    state = {
        spinner: false,
    }

    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <ScrollView>
                    <Formik
                        initialValues={{
                            email: 'test1@test.com',
                            password: 'testtest',
                        }}
                        onSubmit={(values) => this.handleSignIn(values)}
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
                                    <Button
                                        title='サインイン'
                                        onPress={handleSubmit}
                                        buttonStyle={{ marginTop: 20 }}
                                        backgroundColor={appConfig.SIGN_IN_BUTTON_COLOR}
                                        icon={{ name: 'sign-in', type: 'font-awesome' }}
                                        borderRadius={20}
                                        loading={this.state.spinner}
                                    />
                                    <Button
                                        title='パスワードを忘れた方'
                                        onPress={() => this.props.navigation.navigate('Forgot')}
                                        buttonStyle={{ marginTop: 20 }}
                                        icon={{ name: 'question-circle', type: 'font-awesome' }}
                                        borderRadius={20}
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
                            backgroundColor={appConfig.SING_UP_BUTTON_COLOR}
                            icon={{ name: 'user-plus', type: 'font-awesome' }}
                            borderRadius={20}
                        />
                    </Card>
                </ScrollView>
            </View >
        );
    }

    //サインインボタンクリック時
    handleSignIn = async (values) => {
        try {
            //spinner on
            this.setState({ spinner: true });
            //async
            await devlib.sleep(1500);
            //spinner off（本当はもっと後の処理）
            this.setState({ spinner: false });

            //ダミーキーを保存してサインイン
            await onSignIn('xxxxx');
            //user情報をreduxに保持
            const user = {
                id: 77,
                name: 'signin',
                email: values.email
            }
            this.props.updateUserData(user);
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
export default connect(mapStateToProps, mapDispatchToState)(SignIn);
// export default SignIn;