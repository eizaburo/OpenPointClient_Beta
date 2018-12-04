import React from 'react';
import { View, Text } from 'react-native';
import { Card, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

//expo for readBarcode
import { BarCodeScanner, Permissions } from 'expo';

//Auth
import { isSignedIn } from '../Auth';

//formik
import { Formik } from 'formik'
import * as Yup from 'yup'

//redux
import { connect } from 'react-redux';
import { updateUserData } from '../actions/userAction';
import { updateQrData } from '../actions/qrAction';

//config
import * as appConfig from '../app.config';

//devlib
import * as devlib from '../DevLib';

class ScanCamera extends React.Component {

    state = {
        hasCameraPermission: null,
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted'
        });
    }

    render() {

        const { hasCameraPermission } = this.state;

        //許可待ち中
        if (hasCameraPermission === null) {
            return <Text>カメラの許可をお願いしています。</Text>
        }

        //不許可
        if (hasCameraPermission === false) {
            return <Text>カメラが許可されませんでした。</Text>
        }

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <BarCodeScanner
                    onBarCodeRead={this.handleBarCodeScanned}
                    style={{ height: 300, width: 300 }}
                />
                <Button
                    title='読み取りシミュレートボタン（テスト用）'
                    onPress={() => this.handleBarCodeScanned({ type: 'QR', data: '8888888888' })}
                    buttonStyle={{ marginTop: 20 }}
                    borderRadius={20}
                />
            </View>
        );
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.props.updateQrData(data);
        this.props.navigation.navigate('ScanTop');
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
    }
);
export default connect(mapStateToProps, mapDispatchToState)(ScanCamera);
// export default ScanCamera;