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
import HomeView from '../pages/HomeTestView'
import FetchTestView from '../pages/FetchTestView'
import MyView from '../pages/Home/HomeView'
import PersonalView from '../pages/Home/PersonalView'
import BussinessView from '../pages/Home/BussinessView'

import UserDefaults from '../utils/GlobalStorage'
import LoginView from '../pages/Login/LoginView'

const tabBarItems = [
    {
        title: '首页',
        renderIcon: require('../image/icon_buss_normal.png'),
        renderSelectedIcon: require('../image/icon_buss_cur.png'),
        component: MyView
    },
    {
        title: '爱车',
        renderIcon: require('../image/icon_msg_normal.png'),
        renderSelectedIcon: require('../image/icon_msg_cur.png'),
        component: BussinessView
    },
    {
        title: '我的',
        renderIcon: require('../image/icon_man_normal.png'),
        renderSelectedIcon: require('../image/icon_man_cur.png'),
        component: PersonalView
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
                                    if(item.title === "我的"){
                                        UserDefaults.objectForKey("userInfo",(data)=> {
                                            if (!data || !data["LOGIN_USER_ID"]) {
                                                this.props.navigator.push({
                                                    component:LoginView
                                                })
                                            }else{
                                                this.setState({
                                                    selectedTab: item.title
                                                })
                                            }
                                        });
                                    }else{
                                        this.setState({
                                            selectedTab: item.title
                                        })
                                    }

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
