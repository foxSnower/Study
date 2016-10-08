'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    RefreshControl
} from 'react-native';

import {connect} from 'react-redux';
// util
import {Screen, pixel1, BGColor, ly_Toast} from '../../utils/CommonUtil';
import UserDefaults from '../../utils/GlobalStorage';
import {IMGURL} from '../../utils/RequestURL';
// action
import {fetchMessage} from '../../actions/personalAction';
// common component
import NavBar from '../../components/DefaultNavBar';
import Item from '../../components/Item';
import Loader from '../../components/LoaderView';
// page component
import MessageList from './MessageListView';

let userId = '';
class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2)=> row1!==row2
            })
        };

        this.refresh = this.refresh.bind(this);
        this.renderCell = this.renderCell.bind(this);
    }
    // 下拉刷新
    refresh() {
        const {dispatch} = this.props;
        fetchMessage(userId, (action)=> {
            if(action !== 'error') {
                dispatch(action);
                this.setState({
                    loaded: true,
                    dataSource: this.state.dataSource.cloneWithRows(action.value.MESSAGES)
                });
            }else {
                alert('请求数据失败');
            }
        });
    }

    componentDidMount() {
        // refresh 就是加载第一页数据，所以直接调用就可以
        UserDefaults.objectForKey("userInfo", (data)=> {
            if (data) {
                userId = data["LOGIN_USER_ID"];
                // 刷新
                this.refresh();
            }else {
                ly_Toast('请登录后再来', 3000);
            }
        });
    }

    renderCell(row, sectionId, index) {
        const imgObj = {
            "代办提醒": {
                uri: `${IMGURL}/images/icon_bus_do.png`
            },
            "活动提醒": {
                uri: `${IMGURL}/images/icon_activity_warning.png`
            },
            "试驾提醒": {
                uri: `${IMGURL}/images/icon_car.png`
            },
            "维保提醒": {
                uri: `${IMGURL}/images/icon_maintain.png`
            },
            "消费提醒": {
                uri: `${IMGURL}/images/icon_pays_warning.png`
            }
        };

        return (
            <Item
                title = {row.MSG_TYPE}
                description = {row.CONTENTS}
                onPress = {()=> {
                    this.props.navigator.push({
                        component: MessageList,
                        params: {
                            type: row.MSG_TYPE
                        }    
                    })
                }}
                image = {imgObj[row.MSG_TYPE]}
                rightText = {row.PUSH_TIME}
                tip = {row.UNREAD_COUNT}
                imgStyle = {{
                    marginRight: 15
                }}
            />
        )
    }

    render() {
        const {personal} = this.props;
        if(!this.state.loaded) {
            return (
                <View style = {styles.container}>
                    <NavBar
                        title = "消息"
                        onBack = {() => {
                            this.props.navigator.pop()
                        }}
                    />
                    <Loader />
                </View>
            )
        }

        // content
        return (
            <View style = {styles.container}>
                <NavBar
                    title = "消息"
                    onBack = {() => {
                        this.props.navigator.pop()
                    }}
                />            
                <ListView
                    dataSource = {this.state.dataSource}
                    renderRow = {this.renderCell}
                    refreshControl = {
                        <RefreshControl
                            refreshing = {false}
                            onRefresh = {this.refresh}
                            colors = {['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
                            progressBackgroundColor = "#ffffff"
                        />
                    }
                    enableEmptySections = {true}
                />
            </View>
        )
    }
}

export default connect((state)=> {
    const {personal} = state;
    return {
        personal
    }
})(Message);

let styles = StyleSheet.create({
    container: {
        flex: 1
    }
})