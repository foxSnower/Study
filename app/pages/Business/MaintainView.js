/**
 * Created by 楚寒 on 2016/10/6.
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
import {IMGURL} from '../../utils/RequestURL'
import {BGColor,BTNColor,Screen,pixelRation,GetDateStr,ly_Toast,setDefaultTime,validateMobile} from '../../utils/CommonUtil'
import LabelRow from '../../components/LabelRow'
import LabelInput from '../../components/LabelInput'
import Button from '../../components/Button'
import DatePicker from '../../components/DatePicker'
import DLRView from './DLRView'
import UserDefaults from '../../utils/GlobalStorage'
import { updateBook } from '../../actions/bookAction';

import SelectPickerView from './CarBrandPicker'
import MaintainBookConfirmView from './MaintainBookConfirmView'


class MaintainView extends Component {
    constructor(props) {
        super(props)
        const {DLR_CODE, DLR_SHORT_NAME, LOGIN_MOBILE, CUST_NAME}=this.props;
        this.state = {
            dlrInfo: {DLR_CODE: DLR_CODE, DLR_SHORT_NAME: DLR_SHORT_NAME},
            strBookTime: setDefaultTime(2),
            maxTime: setDefaultTime(60, false),
            minTime: setDefaultTime(2, false),
            userName: CUST_NAME,
            mobile: LOGIN_MOBILE,
            mile: '',
            carInfoArr:[],
            carInfo:{}
        }
    }

    componentDidMount(){
        UserDefaults.objectForKey("carInfo",dataArr => {  //后台用户车的数量
                if(dataArr){
                    this.setState({
                        carInfoArr:dataArr.CARS,
                        carInfo:{
                            carNo:dataArr.CARS[0].CAR_NO,
                            vin:dataArr.CARS[0].VIN,
                            carSeriesCode:dataArr.CARS[0].CAR_SERIES_CODE,
                            carSeriesName:dataArr.CARS[0].CAR_SERIES_NAME
                        }
                    })
                }else{
                    ly_Toast("您还没有绑定车辆?")
                    return;
                }
            }
        )
    }

    //监听时间控件值更新
    handleDateChange(date){
        this.setState({
            strBookTime:date
        })
    }
    //跳转下一步
    handleMaintain = () => {
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
        if(!this.state.mile){
            ly_Toast("请输入保养里程");
            return;
        }
        //用户选择完了之后  把车牌保存到缓存中
        let td_time  =this.state.strBookTime.replace(/-/g,'/');
        this.props.navigator.push({
            component:MaintainBookConfirmView,
            params:{
                CUST_NAME:this.state.CUST_NAME,
                CUST_MOBILE:this.state.CUST_MOBILE,
                DLR_SHORT_NAME:this.state.dlrInfo.DLR_SHORT_NAME,
                DLR_CODE:this.state.dlrInfo.DLR_CODE,
                MILE:this.state.mile,
                CAR_NO:this.state.carInfo.carNo,
                VIN:this.state.carInfo.vin,
                CAR_SERIES_CODE:this.state.carInfo.carSeriesCode,
                CAR_SERIES_NAME:this.state.carInfo.carSeriesName,
            }
        })
    }

    render(){
        const {LOGIN_MOBILE, CUST_NAME} = this.props;
        const icon_time = `${IMGURL}/images/icon_time.png`;
        const icon_go = `${IMGURL}/images/icon_link_go2.png`;
        const icon_car = `${IMGURL}/images/icon_wiki_question.png`;
        console.log(`dataArr ${JSON.stringify(this.state.carInfo)}`)
        return(
            <View style={{flex:1,backgroundColor:BGColor}}>
                <NavBar title="保养预约"
                        onBack={()=>{
                            this.props.navigator.pop()
                        }}
                />
                <View style={{marginTop:15}}>
                    <LabelInput style={{height:40,backgroundColor:"#fff",borderBottomWidth:1/pixelRation,borderBottomColor:"#d9d9d9"}}
                                textStyle={{justifyContent:"center",width:60,color:"#2b2b2b",marginLeft:20,marginRight:20}}
                                inputStyle={{color:"#2b2b2b",justifyContent:"center"}}
                                label="车主姓名"
                                max={11}
                                hasRightIcon={true}
                                defaultValue={CUST_NAME}
                                onChangeText={(text) => {
                                    this.setState({
                                        userName: text
                                    })
                                }}

                    />
                    <LabelInput style={{height:40,backgroundColor:"#fff",borderBottomWidth:1/pixelRation,borderBottomColor:"#d9d9d9"}}
                                textStyle={{justifyContent:"center",width:60,color:"#2b2b2b",marginLeft:20,marginRight:20}}
                                inputStyle={{color:"#2b2b2b",justifyContent:"center"}}
                                label="手机号"
                                max={11}
                                hasRightIcon={true}
                                defaultValue={LOGIN_MOBILE}
                                keyboardType="numeric"
                                onChangeText={(text) => {
                                    this.setState({
                                        mobile: text
                                    })
                                }}

                    />
                    <LabelRow
                        title="选择车辆"
                        content={this.state.carInfo.carNo}
                        hasRightIcon={true}
                        placeholder="请选择车辆"
                        isIcon={true}
                        iconUrl={icon_car}
                        iconStyle={{width:26,height:26}}
                        onPress={() => {
                            this.selectViewLocale.onShow()
                        }}/>
                    <SelectPickerView ref={(p)=>this.selectViewLocale = p}
                                      pickerArr={this.state.carInfoArr}
                                      defaultValue={this.state.carInfo.CAR_NO}
                                      onChange={(itemValue, itemPosition)=> {
                                          this.setState({
                                                carInfo:{
                                                    carNo:this.state.carInfoArr[itemPosition].CAR_NO,
                                                    vin:this.state.carInfoArr[itemPosition].VIN,
                                                    carSeriesCode: this.state.carInfoArr[itemPosition].CAR_SERIES_CODE,
                                                    carSeriesName: this.state.carInfoArr[itemPosition].CAR_SERIES_NAME,
                                                }
                                          })
                                      }}
                                      onPressConfirm={
                                          this.pulldown
                                      }
                                      type={true}
                    />
                </View>
                <View style={{marginTop:15}}>
                    <LabelRow
                        title="保养专营店"
                        content={this.state.dlrInfo.DLR_SHORT_NAME}
                        hasRightIcon={true}
                        placeholder="请选择专营店"
                        iconUrl={icon_go}
                        iconStyle={{width:10}}
                        onPress={()=>{
                            this.props.navigator.push({
                                component:DLRView,
                                params:{
                                    refDlr:"1",
                                    getDlrInfo:(dlrInfo)=>{
                                        this.setState({
                                            dlrInfo
                                        })
                                    }
                                }
                            })
                        }}/>
                    <LabelRow title="预约时间"
                              content={this.state.strBookTime}
                              hasRightIcon={true}
                              iconUrl={icon_time}
                              onPress={()=>{
                                  this.picker.onPressDate()
                              }}/>
                    <DatePicker ref={picker => this.picker = picker}
                                mode="datetime"
                                defaultDate = {this.state.strBookTime}
                                maxDate={ this.state.maxTime }
                                minDate={this.state.minTime}
                                onDateChange={
                                    this.handleDateChange.bind(this)
                                } />
                </View>
                <View style={{marginTop:15}}>
                    <LabelInput style={{height:40,backgroundColor:"#fff",borderBottomWidth:1/pixelRation,borderBottomColor:"#d9d9d9"}}
                                textStyle={{justifyContent:"center",width:60,color:"#2b2b2b",marginLeft:20,marginRight:20}}
                                inputStyle={{color:"#2b2b2b",justifyContent:"center"}}
                                label="保养里程"
                                max={6}
                                placeholder="请输入保养里程      公里"
                                keyboardType="numeric"
                                onChangeText={(text) => {
                                    this.setState({
                                        mile: text
                                    })
                                }}

                    />
                </View>
                <Button text="下一步"
                        style={{
                            marginTop:20,
                            width: Screen.width - 40,
                            backgroundColor: BTNColor,
                            alignSelf: "center",
                            borderRadius: 8
                        }}
                        onPress={this.handleMaintain}
                />
            </View>
        )
    }
}
export default connect((state)=>{
    const {testDrive} = state;
    return {
        testDrive
    }
})(MaintainView)