/**
 * Created by 楚寒 on 2016/10/3.
 */
import React, {Component} from 'react';
//noinspection JSUnresolvedVariable,JSUnresolvedVariable
import {
    StyleSheet,
    View,
    Platform
} from 'react-native';

import {BTNColor} from '../../utils/CommonUtil'
import NavBar from '../../components/DefaultNavBar';
import ScrollableTabView, {ScrollableTabBar,} from 'react-native-scrollable-tab-view';
import TestDriveListView from './TestDriveListView'

//export default 关键字 在别的文件中使用
export default class TestDriveHomeView extends Component {

    render() {

        return (
            <View style={{flex:1}}>
                <NavBar title="试驾车型"
                        onBack={()=> {
                            this.props.navigator.pop()
                        }}
                />
                <ScrollableTabView tabBarActiveTextColor={BTNColor}
                                   tabBarInactiveTextColor={'#b4b4b4'}
                                   tabBarUnderlineColor={BTNColor}
                                   tabBarUnderlineStyle = {{backgroundColor:BTNColor}}
                                   renderTabBar={() => <ScrollableTabBar />}
                >
                    <TestDriveListView tabLabel="日产" {...this.props}/>
                    <TestDriveListView tabLabel="启辰" {...this.props}/>
                </ScrollableTabView>
            </View>
        );
    }
}