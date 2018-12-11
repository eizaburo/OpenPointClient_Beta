import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

import * as appConfig from '../app.config';

//devlib
import * as devlib from '../DevLib';

class Agreement extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <Card title='ご利用規約'>
                    <Text>ご利用は計画的に。</Text>
                </Card>
            </View>
        );
    }
}

export default Agreement;