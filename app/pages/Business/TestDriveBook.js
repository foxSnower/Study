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
import {BGColor,BTNColor,Screen,pixelRation,setDefaultTime,ly_Toast,validateMobile,validateDateExpries} from '../../utils/CommonUtil'
import LabelRow from '../../components/LabelRow'
import LabelInput from '../../components/LabelInput'
import CarInfo from './CarInfo'
import Button from '../../components/Button'
import {IMGURL} from '../../utils/RequestURL'
import DatePicker from '../../components/DatePicker'
import { updateDrive ,handleBook} from '../../actions/driveAction';
import DLRView from './DLRView'
import OrderView from '../../pages/Personal/OrderView'

class TestDriveBook extends Component {
    constructor(props){
        super(props)
        const { DLR_CODE,DLR_SHORT_NAME,LOGIN_MOBILE ,CUST_NAME}=this.props;

        this.state={
            dlrInfo:{DLR_CODE:DLR_CODE,DLR_SHORT_NAME:DLR_SHORT_NAME},
            strBookTime:setDefaultTime(2),
            maxTime:setDefaultTime(60,false),
            minTime:setDefaultTime(2,false),
            userName:CUST_NAME,
            mobile:LOGIN_MOBILE,
            btnText:"提交预约",
            btnDisabled:false
        }
    }
    componentDidMount(){
    }
    //提交试驾预约
    testDriveBook = ()=> {
        const {dispatch, LOGIN_USER_ID, CUST_NAME, CAR_SERIES_CODE} = this.props;
        if (this.state.userName == null || this.state.userName == '') {
            ly_Toast("请输入车主姓名");
            return;
        }
        if (this.state.mobile == null || this.state.mobile == '') {
            ly_Toast("请输入手机号");
            return;
        }
        if (!validateMobile(this.state.mobile)) {
            ly_Toast("手机号码格式不正确");
            return;
        }
        if (!this.state.dlrInfo.DLR_SHORT_NAME) {
            ly_Toast("请选择试驾专营店");
            return;
        }
        if (!this.state.strBookTime) {
            ly_Toast("预约时间不正确");
            return;
        }
        if(validateDateExpries(this.state.strBookTime.split(' ')[0])>-1){
            ly_Toast("请至少提前一天预约");
            return;
        }
        if(validateDateExpries(this.state.strBookTime.split(' ')[0])<-60){
            ly_Toast("亲，选择的时间太遥远了!");
            return;
        }
        let td_time  =this.state.strBookTime.replace(/-/g,'/');
        //(userId,custName,tel,dlrCode,bookTime,carSeriesCode,saCode)
        let obj = {
            LOGIN_USER_ID,
            userName:this.state.userName,
            mobile:this.state.mobile,strBookTime:td_time,
            DLR_CODE:this.state.dlrInfo.DLR_CODE,
            CAR_SERIES_CODE
        }
        this.setState({
            btnText:"正在提交...",
            btnDisabled:true
        })
        dispatch(handleBook(LOGIN_USER_ID,this.state.userName,this.state.mobile,td_time,this.state.dlrInfo.DLR_CODE,CAR_SERIES_CODE,"NA",res =>{
            this.setState({
                btnText:"提交预约",
                btnDisabled:false
            })
            if(res.RESULT_CODE == '0'){
                ly_Toast("预约成功",2000,20,()=>{
                    this.props.navigator.push({
                        component:OrderView
                    })
                })
            }else{
                ly_Toast(data.RESULT_DESC)
            }
        }))
    }

    //监听时间控件值更新
    handleDateChange(date){
        this.setState({
            strBookTime:date
        })
    }
    render(){
        const { dispatch } = this.props;
        const {CAR_IMAGE,CAR_SERIES_CN,MIN_GRUID_PRICE,MAX_GRUID_PRICE,LEVEL,LOGIN_USER_ID,LOGIN_MOBILE,CUST_NAME,DLR_CODE,DLR_SHORT_NAME} = this.props;
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
                    <LabelInput style={{height:40}}
                                label="车主姓名"
                                max={11}
                                hasRightIcon={true}
                                defaultValue={CUST_NAME}
                                onChangeText={(text) => {
                                    ly_Toast(text)
                                    this.setState({
                                        userName: text
                                    })
                                }}

                    />
                    <LabelInput style={{height:40}}
                                label="手机号"
                                hasRightIcon={true}
                                max={11}
                                defaultValue={LOGIN_MOBILE}
                                keyboardType="numeric"
                                onChangeText={(text) => {
                                    this.setState({
                                        mobile: text
                                    })
                                }}

                    />

                </View>
                <View style={{marginTop:15}}>
                    <LabelRow
                        title="试驾专营店"
                        content={this.state.dlrInfo.DLR_SHORT_NAME}
                        placeholder="请选择专营店"
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
                              content={this.state.strBookTime}
                              hasRightIcon={true}
                              iconUrl={icon_time}
                              onPress={()=>{
                                  this.picker.onPressDate()
                              }}></LabelRow>
                    <DatePicker ref={picker => this.picker = picker}
                                mode="datetime"
                                defaultDate = {this.state.strBookTime}
                                maxDate={ this.state.maxTime }
                                minDate={this.state.minTime}
                                onDateChange={
                                    this.handleDateChange.bind(this)
                                } />
                </View>
                <Text style={{marginLeft:20,marginTop:15}}>温馨提示:预约时间需要提前一天预约</Text>
                <Button text={this.state.btnText}
                        disabled={this.state.btnDisabled}
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

