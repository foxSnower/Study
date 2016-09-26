/**
 * Created by DB on 16/6/15.
 * 选项卡
 */
'use strict';
import React, {Component} from 'react';
import {
    Image,
    View,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import HomeView from '../pages/HomeView'
import FetchTestView from '../pages/FetchTestView'

const tabBarItems = [
    {
        title: '首页',
        renderIcon: require('../image/icon_buss_normal.png'),
        renderSelectedIcon: require('../image/icon_buss_cur.png'),
        component: HomeView
    },
    {
        title: '爱车',
        renderIcon: require('../image/icon_msg_normal.png'),
        renderSelectedIcon: require('../image/icon_msg_cur.png'),
        component: FetchTestView
    },
    {
        title: '我的',
        renderIcon: require('../image/icon_man_normal.png'),
        renderSelectedIcon: require('../image/icon_man_cur.png'),
        component: HomeView
    }
];

export default class TabBarView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: tabBarItems[0].title,
        };
    }

    render() {

        return (

            <TabNavigator>
                {
                    tabBarItems.map((item, i) => {

                        let Component = item.component;

                        return (
                            <TabNavigator.Item
                                key={i}
                                title={item.title}
                                selected={this.state.selectedTab === item.title}
                                selectedTitleStyle={{color: '#C90028'}}
                                renderIcon={() => <Image style={{height: 24, width: 24}}
                                                         source={item.renderIcon}/>}
                                renderSelectedIcon={() => <Image style={{height: 24, width: 24}}
                                                                 source={item.renderSelectedIcon}/>}
                                onPress={() => {
                                    this.setState({
                                        selectedTab: item.title
                                    })
                                }}
                            >
                                <Component navigator={this.props.navigator} {...this.props}/>
                            </TabNavigator.Item>
                        )
                    })
                }
            </TabNavigator>
        )
    }
}
