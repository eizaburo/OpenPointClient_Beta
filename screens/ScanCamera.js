import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
                    style={[StyleSheet.absoluteFill, styles.container]}
                >
                    {/* 上部の文字 */}
                    <View style={styles.layerTop} >
                        <Text
                            style={styles.description}
                            onPress={() => this.handleBarCodeScanned({ type: 'QR', data: '9999999999' })}
                        >Scan QR code</Text>
                    </View>

                    {/* 周りの半透明 */}
                    <View style={styles.layerCenter}>
                        <View style={styles.layerLeft} />
                        <View style={styles.focused} />
                        <View style={styles.layerRight} />
                    </View>

                    {/* 下部の文字 */}
                    <View style={styles.layerBottom}>
                        <Text
                            onPress={() => this.props.navigation.navigate('ScanTop')}
                            style={styles.cancel}
                        >
                            Cancel
                        </Text>

                    </View>
                </BarCodeScanner>
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


//QR Read画面関連CSS
const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    layerTop: {
        flex: 1,
        backgroundColor: opacity
    },
    layerCenter: {
        flex: 1,
        flexDirection: 'row',

    },
    layerLeft: {
        flex: 1,
        backgroundColor: opacity
    },
    focused: {
        flex: 8
    },
    layerRight: {
        flex: 1,
        backgroundColor: opacity
    },
    layerBottom: {
        flex: 1,
        backgroundColor: opacity
    },
    description: {
        fontSize: 25,
        marginTop: '40%',
        textAlign: 'center',
        color: 'white',
    },
    cancel: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        marginTop: '30%',

    },
});