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

//config
import * as appConfig from '../app.config';

//devlib
import * as devlib from '../DevLib';

class Forgot extends React.Component {

    state = {
        spinner: false,
    }

    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <Formik
                    initialValues={{
                        email: '',
                    }}
                    onSubmit={(values) => this.handleSendMail(values)}
                    validationSchema={Yup.object().shape({
                        email: Yup
                            .string()
                            .email('Emailの形式がおかしいようです。')
                            .required('Emailは必須です。'),
                    })}
                >
                    {
                        ({ handleSubmit, handleChange, values, errors, handleBlur, touched }) => (
                            <Card title='パスワードを忘れた方'>
                                <FormLabel>Email</FormLabel>
                                <FormInput
                                    autoCapitalize='none'
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                />
                                {(touched.email && errors.email) && <FormValidationMessage>{errors.email}</FormValidationMessage>}
                                <Button
                                    title='リセットメールを送信'
                                    onPress={handleSubmit}
                                    buttonStyle={{ marginTop: 20 }}
                                    icon={{ name: 'envelope', type: 'font-awesome' }}
                                    borderRadius={20}
                                    loading={this.state.spinner}
                                />
                            </Card>
                        )
                    }
                </Formik>
            </View>
        );
    }

    handleSendMail = async () => {
        this.setState({ spinner: true });
        await devlib.sleep(1500);
        this.setState({ spinner: false });

        alert('リセットメールを送信しました。');
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
export default connect(mapStateToProps, mapDispatchToState)(Forgot);
// export default Forgot;