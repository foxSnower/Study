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
// utils
import UserDefaults from '../../utils/GlobalStorage';
// action
import {fetchMessageList} from '../../actions/personalAction';
// common component
import NavBar from '../../components/DefaultNavBar';
import Loader from '../../components/LoaderView';

//
class MessageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2)=> row1!==row2
            })
        };

        // 
        this.refresh = this.refresh.bind(this);
        this.renderCell = this.renderCell.bind(this);
    }

    componentDidMount() {
        // 路由要传过来消息类型
        UserDefaults.objectForKey("userInfo", (data)=> {
            if (data) {
                let userId = data.LOGIN_USER_ID;
                this.refresh(userId);
            }
        });
    }

    refresh(userId) {
        const {dispatch, type} = this.props;
        // 定义一个对象，将 tpye 转换成 api code
        let api = {
            "代办提醒": 'AgentRemind',
            "活动提醒": 'CampaignRemind',
            //TestDriverRemind
            "试驾提醒": 'RepairRemind',
            "维保提醒": 'RepairRemind',
            "消费提醒": 'ConsumeRemind'
        };
        // 使用id去查询消息列表
        fetchMessageList(api[type], userId, (action)=> {
            if(action !== 'error') {
                dispatch(action);
                this.setState({
                    loaded: true,
                    dataSource: this.state.dataSource.cloneWithRows(action.value)
                });
            }else {
                // 如果错误了？
                alert('error');
            }
        });
    }

    renderCell(row) {
        return (
            <Text>{row.CONTENTS}</Text>
        )
    }

    render() {
        const {type, personal} = this.props;
        if(!this.state.loaded) {
            return (
                <View style = {styles.container}>
                    <NavBar
                        title = {type}
                        onBack = {()=> {
                            this.props.navigator.pop()
                        }}
                    />
                    <Loader />
                </View>
            )
        }

        return (
            <View stlye = {styles.container}>
                <NavBar
                    title = {type}
                    onBack = {()=> {
                        this.props.navigator.pop()
                    }}
                />
                {
                    personal.messageList.length !== 0 ?
                    <ListView
                        dataSource = {this.state.dataSource}
                        renderRow = {this.renderCell}
                        refreshControl = {
                            <RefreshControl
                                refreshing = {false}
                                onRefresh = {this.refresh}
                                colors = {['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
                                progressBackgroundColor = {'#fff'}
                            />
                        }

                        enableEmptySections = {true}
                    /> :
                    <Text>{"没有消息"}</Text>
                }
            </View>
        )
    }
}

export default connect((state)=> {
    const {personal} = state;
    return {
        personal
    }
})(MessageList)

let styles = StyleSheet.create({
    container: {
        flex: 1
    }
})