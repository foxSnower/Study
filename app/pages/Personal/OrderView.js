'use strict';
import React,{Component} from 'react';
import{
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    RefreshControl,
    ListView
}from 'react-native';

import {connect} from 'react-redux';
// action
import {fetchOrder, costQuery} from '../../actions/personalAction';
// util 
import {Screen, pixel1, BGColor, ly_Toast} from '../../utils/CommonUtil';
import UserDefaults from '../../utils/GlobalStorage';
// common component
import NavBar from '../../components/DefaultNavBar';
import Loader from '../../components/LoaderView';
// sigle component
import CustomButton from '../Home/CustomButton';
// page component
import OrderDetail from './OrderDetailView';
import { IMGURL } from '../../utils/RequestURL'
// 初始化页数
// 这个值其实也可以放到 state 中，不过 dataSource 也可以触发 render，所以不放 state 也ok
let pageIndex = 1;
let pageSize = 10;
let userId = '';
let sort = 'BILL_TIME DESC';
//let sort = "TRANS_TIME DESC";
// 定义组件
class Order extends Component {
    constructor(props) {
        super(props);
        // 初始化组件内state，固定写法
        this.state = {
            loaded: false,
            pageIndex: 1,
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
        };
        this.renderCell = this.renderCell.bind(this);
        // 由于 refresh 中的 this 值是控件的，所以要 bind 改变成组件的 this 值
        this.refresh = this.refresh.bind(this);
        this.loadMore = this.loadMore.bind(this);
    }
    // 下拉刷新
    refresh() {
        const {dispatch} = this.props;
        fetchOrder(userId, pageSize, 1, (action)=> {
            console.log('action is ', action);
            if(action === 'error') {
                // 错误处理
            }else {
                dispatch(action);
                this.setState({
                    pageIndex: 2,
                    loaded: true,
                    // 这里是将 action.value 这个数组作为了显示的数组
                    dataSource: this.state.dataSource.cloneWithRows(action.value)
                });
            }
            //pageIndex = 1;
        });
    }
    // 上拉加载更多
    loadMore() {
        const {dispatch, personal} = this.props;
        // 同样是调用接口获取数据
        fetchOrder(userId, pageSize, this.state.pageIndex, (action)=> {
            // 返回第 n+1 页数据
            if(action === 'error') {
                // 获取数据失败
                ly_Toast('暂无数据', 1000);
            }else {
                // action.value 是新数据
                let ary = personal.orderList;
                action.value.push(...ary);
                dispatch(action);
                this.setState({
                    pageIndex: this.state.pageIndex + 1,
                    // 这里是将 action.value 这个数组作为了显示的数组
                    dataSource: this.state.dataSource.cloneWithRows(action.value)
                })

                //pageIndex += 1;
            }
        })
    }

    componentDidMount() {
        const {dispatch} = this.props;
        // refresh 就是加载第一页数据，所以直接调用就可以
        UserDefaults.objectForKey("userInfo", (data)=> {
            if (data) {
                userId = data["LOGIN_USER_ID"];
                // 加载第一页数据
                this.refresh();
                this.setState({
                    pageIndex: this.state.pageIndex +1
                });
                //pageIndex += 1;
            }else {
                ly_Toast('请登录后再来', 3000);
            }
        });
    }

    // 单行样式，会传入数组中的单个元素
    //require('../../image/mine/mait.png')
    renderCell(row) {
        return (
            <View >
                <TouchableOpacity style = {styles.item}
                    onPress = {()=> {
                        this.props.navigator.push({
                            component: OrderDetail,
                            params: {
                                orderId: row["BILL_NO"],
                                orderName:row["BILL_NAME"]
                            }
                        })
                    }}
                >
                    <Image
                        style = {styles.icon}
                        source= {require('../../image/mine/mait.png')}
                    />
                    <View style = {styles.orderInfo}>
                        <Text style = {styles.dlrName}>{`${row["BILL_NAME"]}`}</Text>
                        <Text style = {styles.time}>{`专营店:${row["SHORT_NAME"]}`}</Text>
                    </View>
                    <View style = {styles.orderStatus}>
                        <Text>{row["BILL_STATUS_NAME"]}</Text>
                        <Text style={{marginTop:10}}>{row["BILL_TIME"]}</Text>
                    </View>    
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const {personal} = this.props

        console.log(this.state.loaded);
        //console.log(this.props.personal.orderList.length)
        if(!this.state.loaded) {
            return (
                <View style = {styles.container}>
                    <NavBar
                        title = "我的预约"
                        onBack = {()=>{
                            this.props.navigator.pop()
                        }}
                    />
                    <Loader />
                </View>
            )
        }
        return (
            <View style = {styles.container}>
                <NavBar
                    title = "我的预约"
                    onBack = {()=>{
                        this.props.navigator.pop()
                    }}
                />
                {
                    personal.orderList.length !== 0 ?
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
                        onEndReachedThreshold = {5}
                        onEndReached = {this.loadMore}
                        enableEmptySections = {true}
                    /> : <Text> 没有数据 </Text>
                }
            </View>
        )
    }
}

export default connect((state)=> {
    const {personal} = state
    return {
        personal
    }
})(Order)

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BGColor
    },
    dlrName:{
        color:"red"
    },
    item: {
        flex:1,
        backgroundColor: '#fff',
        flexWrap:"nowrap",
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop: 20,
        padding: 20,
        alignItems:"center",
    },
    icon: {
        height: 50,
        width: 50,
    },
    time: {
        marginTop:10
    },
    orderStatus: {
    }
})