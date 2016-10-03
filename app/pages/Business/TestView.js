/**
 * Created by DB on 16/10/2.
 */
import React, {Component} from 'react';
//noinspection JSUnresolvedVariable,JSUnresolvedVariable
import {
    StyleSheet,
    View,
    Platform
} from 'react-native';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import ImagePickerView from './ImagePickerView'

//export default 关键字 在别的文件中使用
export default class TestView extends Component {

    render() {
        let statusBar = 0;

        if (Platform.OS === 'ios') {
            statusBar = 20
        }
        return (
            <ScrollableTabView style={{marginTop: statusBar}}
                               tabBarActiveTextColor={'#825897'}
                               tabBarInactiveTextColor={'#b4b4b4'}
                               tabBarUnderlineColor={'#825897'}
                               renderTabBar={() => <ScrollableTabBar />}
            >
                <ImagePickerView tabLabel="近期活动" {...this.props}/>
                <ImagePickerView tabLabel="往期活动" {...this.props}/>
            </ScrollableTabView>
        );
    }
}



const styles = StyleSheet.create({

});