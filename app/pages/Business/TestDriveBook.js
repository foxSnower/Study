/**
 * Created by 楚寒 on 2016/10/3.
 */
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux'
import NavBar from '../../components/DefaultNavBar'
import {BGColor,BTNColor,Screen,pixelRation} from '../../utils/CommonUtil'
import LabelRow from '../../components/LabelRow'
import LabelInput from '../../components/LabelInput'
import CarInfo from './CarInfo'
import Button from '../../components/Button'
import {IMGURL} from '../../utils/RequestURL'
import DatePicker from '../../components/DatePicker'
import { updateDrive } from '../../actions/driveAction';
import DLRView from './DLRView'

class TestDriveBook extends Component {
    constructor(props){
        super(props)
        const { DLR_CODE,DLR_SHORT_NAME }=this.props;
        this.state={
            dlrInfo:{DLR_CODE:DLR_CODE,DLR_SHORT_NAME:DLR_SHORT_NAME}
        }
    }
    componentDidMount(){
    }
    //提交试驾预约
    testDriveBook = ()=>{
        const {dispatch,testDrive,LOGIN_USER_ID,LOGIN_MOBILE,CUST_NAME,DLR_CODE,DLR_SHORT_NAME,CAR_SERIES_CODE} = this.props;
    }
    render(){
        const { dispatch } = this.props;
        const {CAR_IMAGE,CAR_SERIES_CN,MIN_GRUID_PRICE,MAX_GRUID_PRICE,LEVEL,LOGIN_USER_ID,LOGIN_MOBILE,CUST_NAME,DLR_CODE,DLR_SHORT_NAME} = this.props;
        dispatch(updateDrive({dlrInfo:{DLR_SHORT_NAME:DLR_SHORT_NAME,DLR_CODE:DLR_CODE}}))
        const icon_time = `${IMGURL}/images/icon_time.png`;
        const icon_go = `${IMGURL}/images/icon_link_go2.png`;
        return(
            <View style={{flex:1,backgroundColor:BGColor}}>
                <NavBar title="试驾预约"
                        onBack={()=>{
                            this.props.navigator.pop()
                        }}
                />
                <CarInfo imgUrl={CAR_IMAGE}
                         carType={CAR_SERIES_CN}
                         level={LEVEL}
                         minprice={MIN_GRUID_PRICE}
                         maxprice={MAX_GRUID_PRICE}></CarInfo>
                <View style={{marginTop:15}}>
                    <LabelInput style={{height:40,backgroundColor:"#fff",borderBottomWidth:1/pixelRation,borderBottomColor:"#d9d9d9"}}
                                textStyle={{justifyContent:"center",width:60,color:"#2b2b2b",marginLeft:20,marginRight:20}}
                                inputStyle={{color:"#2b2b2b",justifyContent:"center"}}
                                label="车主姓名"
                                value={CUST_NAME}
                                onChangeText={(text) => {
                                    dispatch(updateDrive({userName: text}))
                                }}

                    />
                    <LabelInput style={{height:40,backgroundColor:"#fff",borderBottomWidth:1/pixelRation,borderBottomColor:"#d9d9d9"}}
                                textStyle={{justifyContent:"center",width:60,color:"#2b2b2b",marginLeft:20,marginRight:20}}
                                inputStyle={{color:"#2b2b2b",justifyContent:"center"}}
                                label="手机号"
                                max={11}
                                value={LOGIN_MOBILE}
                                keyboardType="numeric"
                                onChangeText={(text) => {
                                    dispatch(updateDrive({mobile: text}))
                                }}

                    />

                </View>
                <View style={{marginTop:15}}>
                    <LabelRow
                        title="试驾专营店"
                        content={this.state.dlrInfo.DLR_SHORT_NAME}
                        hasRightIcon={true}
                        iconUrl={icon_go}
                        iconStyle={{width:10}}
                        onPress={()=>{
                            this.props.navigator.push({
                                component:DLRView,
                                params:{
                                    refDlr:"4",
                                    getDlrInfo:(dlrInfo)=>{
                                        this.setState({
                                            dlrInfo
                                        })
                                    }
                                }

                            })
                        }}></LabelRow>
                    <LabelRow title="预约时间"
                              content="2016年10月4日 01:15"
                              hasRightIcon={true}
                              iconUrl={icon_time}
                              onPress={()=>{
                                  this.props.navigator({
                                      component:DLRView,
                                      params:{
                                          refDlr:"4",
                                          getDlrInfo:(dlrInfo)=>{
                                                this.setState({
                                                    dlrInfo
                                                })
                                          }
                                      }

                                  })
                              }}></LabelRow>
                </View>
                <DatePicker></DatePicker>
                <Text style={{marginLeft:20,marginTop:15}}>温馨提示:预约时间需要提前一天预约</Text>
                <Button text="提交预约"
                        style={{
                            marginTop:20,
                            width: Screen.width - 40,
                            backgroundColor: BTNColor,
                            alignSelf: "center",
                            borderRadius: 8
                        }}
                        onPress={this.testDriveBook}
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
})(TestDriveBook)

