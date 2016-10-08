/**
 * Created by DB on 16/9/28.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableOpacity,
    RefreshControl,
    Linking
} from 'react-native';

import {connect} from 'react-redux';
import {Screen, pixel1,ly_Toast} from '../../utils/CommonUtil'
import {updateHome, fetchActionList} from '../../actions/homeAction'
import NavBar from '../../components/DefaultNavBar';
import ActionDetailView from './ActionDetailView'

let pageIndex = 0;

class ActivitieListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
        };
    }

    componentDidMount() {
        this.pulldown();
    }

    pulldown = () => {

        pageIndex = 1;
        const {dispatch} = this.props;
        dispatch(fetchActionList(1, (data) => {
            if (data.length > 0) {
                dispatch(updateHome({actionList: data}));
                this.reloadDataSourec(data);
                pageIndex = 2;
            } else {
                ly_Toast("没有活动啦o_O",3000);
            }

        }));
    };

    pullup = () => {

        if (pageIndex > 1) {

            const {dispatch, home} = this.props;
            dispatch(fetchActionList(pageIndex, (data) => {
                if (data.length > 0) {
                    let arr = home.actionList;
                    arr.push(...data);
                    dispatch(updateHome({actionList: arr}));
                    this.reloadDataSourec(arr);
                    pageIndex++;
                } else {
                    ly_Toast("已经到底啦o_O",3000);
                }
            }));
        }
    };

    reloadDataSourec = (arr) => {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(arr)
        })
    };

    render() {
        return (
            <View style={{flex:1}}>
                <NavBar title="劲爆活动"
                        onBack={()=>{
                            this.props.navigator.pop()
                        }}
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderCell}
                    style={styles.listView}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={this.pulldown}
                            colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
                            progressBackgroundColor="#ffffff"/>
                    }
                    onEndReachedThreshold={5}
                    onEndReached={this.pullup}
                    enableEmptySections={true}
                />
            </View>
        );
    }

    renderCell = (rowData, sectionID, rowID, highlightRow) => {
        //console.log(rowData);
        return (
            <View style={styles.cellView}>
                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={
                    () => {
                        if(rowData.DIRECT_URL.length>5){
                            Linking.openURL(rowData.DIRECT_URL);
                        }else{
                            // 跳转到 活动详情 带着这个参数 ACTION_CODE
                            this.props.navigator.push({
                                component:ActionDetailView,
                                params:{
                                    ACTION_CODE:rowData.ACTION_CODE
                                }
                            })
                        }

                    }
                }>
                    <View style={styles.cellTitleView}>
                        <View style={styles.redView}/>
                        <Text style={{marginLeft: 5}}>{rowData.TITLE}</Text>
                    </View>
                    <Image
                        source={{uri: rowData.ACT_IMAGE}}
                        style={styles.thumbnail}
                        resizeMode={"cover"}
                    />
                    <View style={styles.cellBottomView}>
                        <Text numberOfLines={1}>{rowData.SUMMARY}</Text>
                    </View>

                </TouchableOpacity>
            </View>
        );
    }

}

export default connect((state) => {
    const {home} = state;
    return {
        home
    }
})(ActivitieListView);

const styles = StyleSheet.create({
    cellView: {
        height: 280
    },
    button: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 12,
    },
    thumbnail: {
        width: Screen.width,
        height: 200,
    },
    listView: {
        backgroundColor: '#f4f4f4',
    },
    cellTitleView: {
        height: 35,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center'

    },
    redView: {
        backgroundColor: 'red',
        height: 25,
        width: 5,
        marginLeft: 8
    },
    cellBottomView: {
        flex: 1,
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'center'
    }

});