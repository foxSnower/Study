/**
 * Created by 楚寒 on 2016/10/3.
 */
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    ListView,
    RefreshControl,
    TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux'
import NavBar from '../../components/DefaultNavBar'
import {BGColor,BTNColor,Screen} from '../../utils/CommonUtil'
import {updateDrive,getCommentList} from '../../actions/driveAction'
import LabelRow from '../../components/LabelRow'
import CarInfo from './CarInfo'
import Button from '../../components/Button'
import TestDriveBook from './TestDriveBook'
import UserDefaults from '../../utils/GlobalStorage'
import LoginView from '../Login/LoginView'


let pageIndex = 0;
class TestDriveCommentList extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource : new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
        }
    }

    componentDidMount(){
        this.pullUp();
    }

    pullUp = ()=>{
        const { dispatch,CAR_SERIES_CODE} = this.props;
        pageIndex = 1;
        dispatch(getCommentList(CAR_SERIES_CODE,1,(data)=>{
            dispatch(updateDrive({commentsList: data}));
            this.reloadDataSourec(data);
            pageIndex = 2;
        }))
    }

    pulldown = () => {

        pageIndex = 1;
        const {dispatch,CAR_SERIES_CODE} = this.props;
        dispatch(getCommentList(CAR_SERIES_CODE,1,(data)=>{
            dispatch(updateDrive({commentsList: data}));
            this.reloadDataSourec(data);
            pageIndex = 2;
        }));
    };

    reloadDataSourec = (arr) => {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(arr)
        })
    };

    renderCell = (rowData, sectionID, rowID, highlightRow) => {
        return (
            <View style={styles.cellView}>
                <Text>124132</Text>
            </View>
        );
    }

    render(){
        const {dispatch,testDrive,CAR_IMAGE,CAR_SERIES_CN,MIN_GRUID_PRICE,MAX_GRUID_PRICE,LEVEL,COMMENT_COUNT,CAR_SERIES_CODE} = this.props;
        return(
            <View style={{flex:1,backgroundColor:BGColor}}>
                <NavBar title="查看点评"
                        onBack={()=>{
                            this.props.navigator.pop()
                        }}
                />
                <CarInfo imgUrl={CAR_IMAGE}
                         carType={CAR_SERIES_CN}
                         level={LEVEL}
                         minprice={MIN_GRUID_PRICE}
                         maxprice={MAX_GRUID_PRICE}></CarInfo>
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

                <Button text="试驾该车"
                        style={{
                            marginTop:20,
                            width: Screen.width - 40,
                            backgroundColor: BTNColor,
                            alignSelf: "center",
                            borderRadius: 8
                        }}
                        onPress={()=>{
                            UserDefaults.objectForKey("userInfo", (data)=> {
                                if (!data || !data["LOGIN_USER_ID"]) {
                                    this.props.navigator.push({
                                        component: LoginView
                                    })
                                } else {
                                    this.props.navigator.push({
                                        component:TestDriveBook,
                                        params:{
                                            CAR_IMAGE:CAR_IMAGE,
                                            CAR_SERIES_CN:CAR_SERIES_CN,
                                            MIN_GRUID_PRICE:MIN_GRUID_PRICE,
                                            MAX_GRUID_PRICE:MAX_GRUID_PRICE,
                                            COMMENT_COUNT:COMMENT_COUNT,
                                            CAR_SERIES_CODE:CAR_SERIES_CODE,
                                            LEVEL:LEVEL,
                                            LOGIN_USER_ID:data["LOGIN_USER_ID"],
                                            LOGIN_MOBILE:data["LOGIN_MOBILE"],
                                            CUST_NAME:data["CUST_NAME"],
                                            DLR_CODE:data["DLR_CODE"],
                                            DLR_SHORT_NAME:data["DLR_SHORT_NAME"],
                                        }
                                    })
                                }
                            });
                            }}
                ></Button>
            </View>
        )
    }
}
export default connect((state)=>{
    const {testDrive} = state;
    return {
        testDrive
    }
})(TestDriveCommentList)

const styles = StyleSheet.create({
    cellView:{
    }
})

