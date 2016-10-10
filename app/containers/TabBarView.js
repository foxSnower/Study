/**
 * Created by DB on 16/6/15.
 * 选项卡
 */
'use strict';
import React, {Component} from 'react';
import {
    Image,
    View,
    Platform,
    BackAndroid,
    ToastAndroid
} from 'react-native';
import {connect} from 'react-redux';
import TabNavigator from 'react-native-tab-navigator';
import AdvertisementView from './AdvertisementView'
import MyView from '../pages/Home/HomeView'
import PersonalView from '../pages/Personal/PersonalView'
import BussinessView from '../pages/Home/BussinessView'

import UserDefaults from '../utils/GlobalStorage'
import LoginView from '../pages/Login/LoginView'

import {ly_Toast} from '../utils/CommonUtil'

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

class TabBarView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: tabBarItems[0].title,
            adsLoaed: false
        };
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
        }
    }

    //处理安卓物理返回键
    onBackAndroid() {

        const {navigator} = this.props;
        const routers = navigator.getCurrentRoutes();
        if (routers.length > 1) {
            navigator.pop();
            return true;
        } else {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                return false;
            } else {
                this.lastBackPressed = Date.now();
                ly_Toast('再按一次退出应用', 1000, -20);
                return true;
            }
        }
    };

    render() {
        const {userInfo} = this.props.login;
        return (
            <View style={{flex:1}}>

                {
                    !this.state.adsLoaed ?
                        <AdvertisementView hideAds={ () => {
                            this.setState({adsLoaed: true})
                        }}/>
                        :
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
                                                if (item.title === "我的") {
                                                    if (!userInfo || !userInfo.LOGIN_USER_ID) {
                                                        this.props.navigator.push({
                                                            component: LoginView
                                                        })
                                                    } else {
                                                        this.setState({
                                                            selectedTab: item.title
                                                        })
                                                    }
                                                } else {
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
                }
            </View>
        )
    }
}

export default connect((state)=> {
    const {login} = state;
    return {
        login
    }
})(TabBarView);
