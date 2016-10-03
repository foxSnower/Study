/**
 * Created by DB on 16/7/18.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator
} from 'react-native';

import {BTNColor} from '../utils/CommonUtil'

export default class LoaderView extends Component {

    render() {
        //解构
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={BTNColor}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff'
    }
});