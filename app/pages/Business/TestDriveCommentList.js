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
import {BGColor,BTNColor,BORDERColor, Screen,pixel1,ly_Toast} from '../../utils/CommonUtil'
import {updateDrive,getCommentList} from '../../actions/driveAction'
import LabelRow from '../../components/LabelRow'
import CarInfo from './CarInfo'
import Button from '../../components/Button'
import TestDriveBook from './TestDriveBook'
import UserDefaults from '../../utils/GlobalStorage'
import LoginView from '../Login/LoginView'
import {IMGURL} from '../../utils/RequestURL'


let pageIndex = 0;
let icon_star = `${IMGURL}/images/icon_xing_red.png`;

class TestDriveCommentList extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource : new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
        }
    }

    componentDidMount(){
        this.pulldown();
    }

    pulldown = () => {
        const { dispatch,CAR_SERIES_CODE} = this.props;
        dispatch(getCommentList(CAR_SERIES_CODE,1,(data)=>{
            pageIndex = 2;
            this.reloadDataSourec(data.DATA);

        }))
    };

    pullUp = ()=>{
        if(pageIndex>1){
            const { dispatch,CAR_SERIES_CODE,drive} = this.props;
            dispatch(getCommentList(CAR_SERIES_CODE,pageIndex,(data)=>{
                if(data.DATA.length>0){
                    let arr = drive.commentsList;
                    arr.push(...data.DATA)
                    dispatch(updateDrive({commentsList: arr}));
                    pageIndex ++;
                    this.reloadDataSourec(arr);
                }else if(pageIndex!=2){
                        ly_Toast("已经到底啦o_O",2000,0)
                }

            }))
        }

    };

    reloadDataSourec = (arr) => {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(arr)
        })
    };

    renderCell = (rowData, sectionID, rowID, highlightRow) => {
        let starImage =[];
        if( rowData.COMMENT_RATE && parseInt(rowData.COMMENT_RATE)>0){
            for(let i=0,len = rowData.COMMENT_RATE;i<len;i++ ){
                starImage.push(<Image resizeMode="contain"
                                      key={i}
                                      style={{width:10,height:10}}
                                      source={{uri:icon_star}} />)
            }
        }
        return (
            <View style={styles.cellView}>
                <View style={{flexDirection:"row",justifyContent:"space-between",paddingVertical:6}}>
                    <Text style={{color:BTNColor}}>{`${rowData.CUST_NAME.charAt(0)}**`}</Text>
                    <Text style={{marginLeft:20,color:"green"}}>{rowData.COMMENT_TIME}</Text>
                    <View style={{flexDirection:"row",alignSelf:"center"}}>{starImage}</View>
                </View>
                <Text style={{paddingVertical:6}}>{rowData.COMMENTS}</Text>
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
                         maxprice={MAX_GRUID_PRICE} />
                <Text style={{paddingLeft:15,paddingVertical:5}}>点评数: </Text>
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
                    onEndReached={this.pullUp}
                    enableEmptySections={true}
                />

                <Button text="试驾该车"
                        style={{
                            marginTop:10,
                            marginBottom:10,
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
                />
            </View>
        )
    }
}
export default connect((state)=>{
    const {drive} = state;
    return {
        drive
    }
})(TestDriveCommentList)

const styles = StyleSheet.create({
    cellView:{
        paddingVertical:5,
        paddingHorizontal:15,
        borderBottomWidth:pixel1,
        borderBottomColor:BORDERColor,
    }
})

