/**
 * Created by 楚寒 on 2016/10/6.
 */
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
    ListView,
    Alert,
    TextInput,
    TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux'
import NavBar from '../../components/DefaultNavBar'
import {IMGURL} from '../../utils/RequestURL'
import {BGColor,BORDERColor,BTNColor, Screen,pixel1,pixelRation,GetDateStr,ly_Toast,setDefaultTime,validateMobile,validateDateExpries} from '../../utils/CommonUtil'
import LabelRow from '../../components/LabelRow'
import LabelInput from '../../components/LabelInput'
import Button from '../../components/Button'
import DatePicker from '../../components/DatePicker'
import DLRView from './DLRView'
import UserDefaults from '../../utils/GlobalStorage'
import OrderView from '../../pages/Personal/OrderView'

import { handleCommissionBook,getCommissionInfo } from '../../actions/bookAction'

class CommissionView extends Component {
    constructor(props) {
        super(props)
        const {dispatch, DLR_CODE, DLR_SHORT_NAME, LOGIN_MOBILE, CUST_NAME}=this.props;
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            dlrInfo: {DLR_CODE: DLR_CODE, DLR_SHORT_NAME: DLR_SHORT_NAME},
            strBookTime: setDefaultTime(2),
            maxTime: setDefaultTime(60, false),
            minTime: setDefaultTime(2, false),
            userName: CUST_NAME,
            mobile: LOGIN_MOBILE,
            COMMISSION_CODE:'',
            commissionMark:"",
            commissionMarkCount:0,
            INDEX:"",
            height:0,
            btnDisabled:false,
            btnText:"立即预约"
        }

    }

    reloadDataSourec = (arrChange) => {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(arrChange),
        })
    };

    renderCell = (rowData, sectionID, rowID, highlightRow) => {
        let bdColor =  this.state.INDEX ==rowID?{backgroundColor:BTNColor}:{backgroundColor:"#FFF"}
        let txtColor =  this.state.INDEX ==rowID?{color:"#fff"}:{color:"#000"}
        return (
            <TouchableOpacity style={[styles.cellView,bdColor]}
                              onPress={()=>{
                                  this.setState({
                                      COMMISSION_CODE:rowData.COMMISSION_CODE,
                                      INDEX:rowID
                                  })
                              }}>
                <Text style={txtColor}>{rowData.COMMISSION_NAME}</Text>
            </TouchableOpacity>
        );
    }

    handleCommission = () => {
        const { dispatch } = this.props;
        //获取代办业务信息
        dispatch(getCommissionInfo(this.state.dlrInfo.DLR_CODE,this.state.dlrInfo.DLR_SHORT_NAME,res => {
            if(res.RESULT_CODE == 0){
                //alert(JSON.stringify(res.DATA))
                this.reloadDataSourec(res.DATA)
            }else{
                ly_Toast("获取代办业务信息失败")
            }
        }))
    }

    //提交代办预约
    handleCommissonBook = () => {
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
        //请选择代办业务类型
        if(this.state.COMMISSION_CODE == ''){
            ly_Toast("请选择代办业务类型");
            return;
        }
        if(this.state.commissionMark == ''){
            ly_Toast("请输入备注");
            return;
        }
        const { dispatch }  = this.props;
        this.setState({
            btnDisabled:true,
            btnText:"正在提交..."
        })
        UserDefaults.objectForKey("userInfo",data => {
            if(data){
                if(data["CARD_NO"]==""){
                    ly_Toast("您不是会员,没有代办权利");
                    return;
                }else{
                    dispatch(handleCommissionBook({
                        AGENT_CODE: this.state.COMMISSION_CODE,
                        BOOK_TIME: this.state.strBookTime,
                        CARD_NO: data["CARD_NO"],
                        CUST_NAME: this.state.userName,
                        CUST_TEL: this.state.mobile,
                        DLR_CODE: this.state.dlrInfo.DLR_CODE,
                        LOGIN_USER_ID: data["LOGIN_USER_ID"],
                        REMARK: this.state.commissionMark
                    },res => {
                        this.setState({
                            btnDisabled:false,
                            btnText:"立即预约"
                        })
                        if(res.RESULT_CODE == 0){
                            ly_Toast("预约成功",1000,20,()=>{
                                this.props.navigator.push({
                                    component:OrderView
                                })
                            });
                        }else{
                            Alert.alert("温馨提示",res.RESULT_DESC,
                            [
                                {
                                    text:"确定",
                                    onPress:()=>{
                                        this.props.navigator.push({
                                            component:OrderView
                                        })
                                    }
                                }
                            ]
                            )
                        }
                    }))
                }
            }else{
                console.log("没有获取到用户信息")
            }
        })

    }

    componentDidMount(){
        this.handleCommission()
    }

    //监听时间控件值更新
    handleDateChange(date){
        this.setState({
            strBookTime:date
        })
    }

    render(){
        const {LOGIN_MOBILE, CUST_NAME} = this.props;
        const icon_time = `${IMGURL}/images/icon_time.png`;
        const icon_go = `${IMGURL}/images/icon_link_go2.png`;
        const icon_car = `${IMGURL}/images/icon_wiki_question.png`;
        return(
            <View style={{flex:1,backgroundColor:BGColor}}>
                <NavBar title="代办预约"
                        onBack={()=>{
                            this.props.navigator.pop()
                        }}
                />
                <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={{marginTop:15}}>
                    <LabelInput
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
                    <LabelInput
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

                </View>
                <View style={{marginTop:15}}>
                    <LabelRow
                        title="代办专营店"
                        content={this.state.dlrInfo.DLR_SHORT_NAME}
                        hasRightIcon={true}
                        placeholder="请选择专营店"
                        iconUrl={icon_go}
                        iconStyle={{width:10}}
                        onPress={()=>{
                            this.props.navigator.push({
                                component:DLRView,
                                params:{
                                    refDlr:"3",
                                    getDlrInfo:(dlrInfo)=>{
                                        this.setState({
                                            dlrInfo
                                        })
                                        this.handleCommission()
                                    }
                                }
                            })
                        }}/>
                    <LabelRow title="期望时间"
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
                    <Text style={{paddingLeft:10}}>
                        代办业务(单选)
                    </Text>
                    <ListView   dataSource={this.state.dataSource}
                                renderRow={this.renderCell}
                                style={styles.listView}
                                enableEmptySections={true}
                    />
                </View>
                <View style={{marginTop:15,paddingHorizontal:10}}>
                    <Text style={{marginBottom:5}}>
                        代办备注
                    </Text>
                    <TextInput multiline={true}
                               maxLength={200}
                               style={[styles.textArea,{height: Math.max(35, this.state.height)}]}
                               clearButtonMode="while-editing"
                               placeholder="请输入代办备注"
                               enablesReturnKeyAutomatically={true}
                               keyboardType="default"
                               returnKeyType="done"
                               underlineColorAndroid="transparent"
                               onChange={(event)=>{
                                   this.setState({
                                       height: event.nativeEvent.contentSize.height,
                                   })
                               }}
                               onChangeText={ (text) => {

                                    this.setState({
                                        commissionMark:text,
                                        commissionMarkCount:text?text.length:0,

                                    })
                               }}
                    >

                    </TextInput>
                    <Text style={{alignSelf:"flex-end"}}>{this.state.commissionMarkCount}/200</Text>
                </View>
                </ScrollView>
                <Button text={this.state.btnText}
                        disabled={this.state.btnDisabled}
                        style={{
                            marginTop:5,
                            marginBottom:6,
                            width: Screen.width - 40,
                            backgroundColor: BTNColor,
                            alignSelf: "center",
                            borderRadius: 8
                        }}
                        onPress={this.handleCommissonBook}
                />
            </View>

        )
    }
}
export default connect((state)=>{
    const {book} = state;
    return {
        book
    }
})(CommissionView)

const styles = StyleSheet.create({
    textArea:{
        flex:1,
        borderColor:BORDERColor,
        borderWidth:pixel1,
        backgroundColor:"#fff",
        borderRadius:8,
    },
    listView:{
        paddingHorizontal:10,
        flex:1,
        flexWrap:"wrap",
    },
    cellView:{
        marginTop:6,
        alignItems:"center",
        justifyContent:"center",
        borderColor:BORDERColor,
        borderWidth:pixel1,
        borderRadius:10,
        backgroundColor:"#fff",
        paddingVertical:15,
        paddingHorizontal:15

    }
})