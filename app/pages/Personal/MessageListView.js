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
import {Screen} from '../../utils/CommonUtil';
import UserDefaults from '../../utils/GlobalStorage';
// action
import {fetchMessageList} from '../../actions/personalAction';
// common component
import NavBar from '../../components/DefaultNavBar';
import Loader from '../../components/LoaderView';

//
let userId = '';
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
                userId = data.LOGIN_USER_ID;
                this.refresh();
            }
        });
    }

    refresh() {
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
                alert('请求数据失败');
            }
        });
    }
    // 上拉加载更多
    // loadMore() {
    //     const {dispatch, personal} = this.props;
    //     // 同样是调用接口获取数据
    //     fetchMessageList(userId, pageSize, this.state.pageIndex, (action)=> {
    //         // 返回第 n+1 页数据
    //         if(action === 'error') {
    //             // 获取数据失败
    //             ly_Toast('暂无数据', 1000);
    //         }else {
    //             // action.value 是新数据
    //             let ary = personal.orderList;
    //             action.value.push(...ary);
    //             dispatch(action);
    //             this.setState({
    //                 pageIndex: this.state.pageIndex + 1,
    //                 // 这里是将 action.value 这个数组作为了显示的数组
    //                 dataSource: this.state.dataSource.cloneWithRows(action.value)
    //             })

    //             //pageIndex += 1;
    //         }
    //     })
    // }

    renderCell(row) {
        return (
            <View style = {styles.message}>
                <View style = {styles.messageContainer}>
                    <Text style = {styles.messageTime}>{row.PUSH_TIME}</Text>
                    <Text style = {styles.messageContent}>{row.CONTENTS}</Text>
                </View>
                <View style = {styles.redDot}></View>
            </View>
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
                <View style = {styles.content}>
                    {
                        personal.messageList.length !== 0 ?
                        <ListView
                            style = {styles.content}
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
        flex: 1,
        backgroundColor: '#efeff4'
    },
    content: {
        flex: 1,
        backgroundColor: '#efeff4'
    },
    message: {
        position: 'relative'
    },
    messageContainer: {
        marginTop: 20,
        marginLeft: 20,
        paddingHorizontal: 10,
        borderStyle: 'solid',
        borderLeftWidth: 1,
        borderColor: '#e1e1e1'
    },
    redDot: {
        width: 10,
        height: 10,
        backgroundColor: '#ee4d4d',
        position: 'absolute',
        left: 15.5,
        top: 25,
        borderRadius: 5
    },
    messageTime: {
        fontSize: 12,
        marginLeft: 10
    },
    messageContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingTop: 10,
        paddingRight: 5,
        paddingBottom: 10,
        paddingLeft: 10,
        shadowColor: '#000',
        shadowOffset: {
            h: 5
        }
    }
})