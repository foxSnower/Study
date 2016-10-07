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

import {connect} from 'react-redux'
// action
import {costQuery} from '../../actions/personalAction'
// util 
import {Screen, pixel1, BGColor, ly_Toast} from '../../utils/CommonUtil';
import UserDefaults from '../../utils/GlobalStorage';
// common component
import NavBar from '../../components/DefaultNavBar'
import Loader from '../../components/LoaderView'
// sigle component
import CustomButton from '../Home/CustomButton';
// page component
import LoginView from '../../pages/Login/LoginView'

// 初始化页数
// 这个值其实也可以放到 state 中，不过 dataSource 也可以触发 render，所以不放 state 也ok
let pageIndex = 1;
let pageSize = 5;
let userId = '';
let sort = "TRANS_TIME DESC";
// 定义组件
class CostQuery extends Component {
    constructor(props) {
        super(props)
        // 初始化组件内state，固定写法
        this.state = {
            loaded: false,
            pageIndex: 1,
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
        };
        this.renderCell = this.renderCell.bind(this)
        // 由于 refresh 中的 this 值是控件的，所以要 bind 改变成组件的 this 值
        this.refresh = this.refresh.bind(this)
        this.loadMore = this.loadMore.bind(this)
    }
    componentDidMount() {
        const {dispatch} = this.props
        // refresh 就是加载第一页数据，所以直接调用就可以
        UserDefaults.objectForKey("userInfo", (data)=> {
            if (data) {
                userId = data["LOGIN_USER_ID"];
                // 加载第一页数据
                this.refresh()
                this.setState({
                    loaded: true,
                    pageIndex: this.state.pageIndex+1
                })
            }else {
                // 应该提示，并可以跳转
                ly_Toast('请登录后再来', 1000)
            }
        });
    }
    // 下拉刷新
    refresh() {
        const {dispatch} = this.props
        // 下拉必然是获取第一页数据
        costQuery(userId, pageSize, 1, sort, (action)=> {
            dispatch(action)
            this.setState({
                pageIndex: 2,
                // 这里是将 action.value 这个数组作为了显示的数组
                dataSource: this.state.dataSource.cloneWithRows(action.value)
            })
            //pageIndex = 1;
        })
    }
    // 上拉加载更多
    loadMore() {
        const {dispatch, personal} = this.props
        console.log(this.state.pageIndex)
        // 同样是调用接口获取数据
        costQuery(userId, pageSize, this.state.pageIndex, sort, (action)=> {
            // 返回第 n+1 页数据
            if(action === 'error') {
                // 获取数据失败
                ly_Toast('暂无数据', 1000)
            }else {
                // action.value 是新数据
                let ary = personal.costList
                //action.value = action.value.concat(...ary)
                action.value.push(...ary)
                dispatch(action)
                this.setState({
                    pageIndex: this.state.pageIndex + 1,
                    // 这里是将 action.value 这个数组作为了显示的数组
                    dataSource: this.state.dataSource.cloneWithRows(action.value)
                })

                //pageIndex += 1;
            }
        })
    }


    // 单行样式，会传入数组中的单个元素
    renderCell(row) {
        let color = {
            fontSize: 20,
            width: 60
        }
        if(parseInt(row["PV_POINT"], 10) < 0) {
            color = Object.assign({}, color, {
                color: '#0d8f44'
            })
        }else {
            color = Object.assign({}, color, {
                color: '#c90028'
            })
        }
        return (
            <View style = {styles.item}>
                <View style = {styles.dlrInfo}>
                    <Text style = {styles.dlrName}>{`${row["DLR_SHORT_NAME"]}[${row["TRANS_SENCE"]}]`}</Text>
                    <Text style = {styles.time}>{row["TRANS_TIME"]}</Text>
                </View>
                <View style = {styles.point}>
                    <Text style = {color}>{row["PV_POINT"]}</Text>
                    <Text>{"厂家积分"}</Text>
                </View>    
            </View>
        )
    }

    render() {
        const {personal} = this.props
        if(!this.state.loaded) {
            return (
                <View style = {styles.container}>
                    <NavBar
                        title = "消费查询"
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
                    title = "消费查询"
                    onBack = {()=>{
                        this.props.navigator.pop()
                    }}
                />
                {
                    personal.costList.length !== 0 ?
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
                    /> : <Text> 数据为空 </Text>
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
})(CostQuery)

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BGColor
    },
    item: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        marginBottom: 20,
        paddingTop: 20,
        paddingLeft: 20,
        paddingBottom: 20,
        paddingRight: 20
    },
    dlrInfo: {
        width: Screen.width*0.6
    },
    dlrName: {
        fontSize: 16
    },
    point: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})