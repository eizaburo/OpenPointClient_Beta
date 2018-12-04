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

//barcode
import QRCode from 'react-native-qrcode';
import Barcode from 'react-native-barcode-builder';

class Identity extends React.Component {
    render() {
        //storeからidを取得
        const id = this.props.state.userData.user.id;
        //10桁に整形
        const code = ('0000000000' + id).slice(-10);
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
                <Text>{code}</Text>
                <View>
                    <QRCode
                        value={code}
                        size={200}
                        bgColor='black'
                        fgColor='white'
                    />
                </View>
                <View style={{ marginTop: 80 }}>
                    <Barcode
                        value={code}
                        format="CODE128"
                        height={50}
                        text={code}
                        lineColor='#888888'
                    />
                </View>
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
export default connect(mapStateToProps, mapDispatchToState)(Identity);
// export default Identity;