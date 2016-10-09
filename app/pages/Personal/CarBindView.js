/* Created by 楚寒 on 2016/10/7.
 */
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    Alert,
    TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux'
import NavBar from '../../components/DefaultNavBar'
import {IMGURL} from '../../utils/RequestURL'
import {BGColor,BTNColor,Screen,GetDateStr,ly_Toast,validateMobile} from '../../utils/CommonUtil'
import LabelRow from '../../components/LabelRow'
import LabelInput from '../../components/LabelInput'

import SelectPickerView from '../Business/CarBrandPicker'

import Button from '../../components/Button'
import { handleCarBind ,ReGetCarInfo} from '../../actions/carBindAction'
import UserDefaults from '../../utils/GlobalStorage'
import PersonalView from './PersonalView'



class CarBindView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName:"",
            carNo:"",
            mobile:"",
            vin:"",
            cardNo:"",
            bindTypeName:"",
            bindTypeValue:"",
            bindType:[
                {CAR_NO:"按车牌号码",VIN:"3"},
                {CAR_NO:"按会员卡号",VIN:"1"},
                {CAR_NO:"按VIN码",VIN:"2"},
            ],
            btnText:"立即绑定",
            btnDisabled:false
        };
    }

    componentDidMount(){
        this.setState({
            bindTypeName:"按车牌号码",
            bindTypeValue:"3",
        })
    }
    //点击车辆绑定
    handleCarBindClick = () => {
        if(this.state.bindTypeValue == "3"){
            if (this.state.carNo == null || this.state.carNo == '') {
                ly_Toast("请输入车牌号");
                return;
            }
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
        }else if(this.state.bindTypeValue == "1"){
            if (this.state.cardNo == null || this.state.cardNo == '') {
                ly_Toast("请输入会员卡号");
                return;
            }
        }else if(this.state.bindTypeValue == "2"){
            if (this.state.vin == null || this.state.vin == '') {
                ly_Toast("请输入VIN码");
                return;
            }
        }else{
            ly_Toast("发生错误")
            return;
        }
        this.setState({
            btnText:"正在绑定...",
            btnDisabled:true
        })
        let that = this ;
        UserDefaults.objectForKey("userInfo",userInfo => {
            if(userInfo){
                const { dispatch } = this.props;
                dispatch(handleCarBind({
                    "LOGIN_USER_ID": userInfo["LOGIN_USER_ID"],
                    "BIND_TYPE": this.state.bindTypeValue,
                    "CARD_NO": this.state.cardNo,
                    "VIN": this.state.vin,
                    "CAR_NO": this.state.carNo,
                    "CUST_NAME": this.state.userName,
                    "CUST_TEL": this.state.mobile
                },res => {
                    this.setState({
                        btnText:"立即绑定",
                        btnDisabled:false
                    })
                    if(res.RESULT_CODE == "0"){
                         alert(JSON.stringify(res.DATA[0]))
                        let userInfo2 = res.DATA[0]
                        userInfo2["LOGIN_USER_ID"] = userInfo["LOGIN_USER_ID"]
                        userInfo2["USER_TYPE"] = '2';
                        alert(JSON.stringify(userInfo2))
                        UserDefaults.setObject("userInfo",userInfo2);
                        //dispatch(ReGetCarInfo(userInfo["LOGIN_USER_ID"]))
                        Alert.alert("温馨提示","恭喜您,车辆绑定成功!",
                            [
                                {
                                    text:"确定",
                                    onPress:()=>{
                                        const { navigator } = that.props;
                                        if(navigator) {
                                            navigator.push({
                                                component:PersonalView
                                            });
                                        }
                                    }
                                }
                            ]
                        )
                    }else{
                        Alert.alert("温馨提示",res.RESULT_DESC,
                            [
                                {
                                    text:"确定",
                                    onPress:()=>{
                                        return;
                                    }
                                }
                            ]
                        )
                    }
                }))
            }else{
                ly_Toast("请先登录!")
                return
            }
        })
    };

    //根据绑定类型不同改变下面的内容
    renderByBindType = () => {
        if(this.state.bindTypeValue == "3"){
            return (
                <View>
                    <LabelInput style={{height:40,marginTop:15}}
                                label="车牌号"
                                hasRightIcon={true}
                                placeholder="请输入车牌号"
                                onChangeText={(text) => {
                                    this.setState({
                                        carNo: text
                                    })
                                }}

                    />
                    <LabelInput style={{height:40}}
                                label="车主姓名"
                                max={11}
                                hasRightIcon={true}
                                placeholder="请输入车主姓名"
                                onChangeText={(text) => {
                                    this.setState({
                                        userName: text
                                    })
                                }}

                    />
                    <LabelInput style={{height:40}}
                                label="手机号"
                                max={11}
                                hasRightIcon={true}
                                placeholder="请输入手机号"
                                keyboardType="numeric"
                                onChangeText={(text) => {
                                    this.setState({
                                        mobile: text
                                    })
                                }}

                    />
                    <View style={styles.desc}>
                        <Text>1、请完整输入车牌号码</Text>
                        <Text>2、车牌号码示例：粤A12345</Text>
                    </View>
                </View>
            )
        }else if(this.state.bindTypeValue == "1"){
            return(
                <View>
                    <LabelInput style={{height:40,marginTop:15}}
                                label="会员卡号"
                                hasRightIcon={true}
                                placeholder="请输入会员卡号"
                                onChangeText={(text) => {
                                    this.setState({
                                        cardNo: text
                                    })
                                }}

                    />
                    <View style={styles.desc}>
                    <Text>1、请完整输入会员卡号</Text>
                    <Text>2、会员卡号示例：F9999999</Text>
                        </View>
                </View>
            )
        }else if(this.state.bindTypeValue == "2"){
            return (
                <View>
                    <LabelInput style={{height:40,marginTop:15}}
                                label="VIN码"
                                hasRightIcon={true}
                                placeholder="请输入VIN码"
                                onChangeText={(text) => {
                                    this.setState({
                                        vin: text
                                    })
                                }}

                    />
                    <View style={styles.desc}>
                    <Text>1、请完整输入VIN码</Text>
                    <Text>2、VIN码示例：LGBFTN171WWZ100XX</Text>
                        </View>
                </View>
            )
        }
    };

    render(){
        const icon_go = `${IMGURL}/images/icon_link_go2.png`;
        return(
            <View style={{flex:1,backgroundColor:BGColor}}>
                <NavBar title="车主绑定"
                        onBack={()=>{
                            this.props.navigator.pop()
                        }}
                />
                <View style={{marginTop:15}}>
                    <LabelRow
                        title="绑定类型"
                        style={{color:"#000"}}
                        content={this.state.bindTypeName}
                        hasRightIcon={true}
                        isIcon={true}
                        iconUrl={icon_go}
                        iconStyle={{width:10,height:20}}
                        onPress={() => {
                            this.selectViewLocale.onShow()
                        }}/>
                    <SelectPickerView ref={(p)=>this.selectViewLocale = p}
                                      pickerArr={this.state.bindType}
                                      defaultValue={this.state.bindTypeValue}
                                      onChange={(itemValue, itemPosition)=> {
                                          this.setState({
                                              bindTypeName:this.state.bindType[itemPosition].CAR_NO,
                                              bindTypeValue:this.state.bindType[itemPosition].VIN,
                                          });
                                      }}
                                      onPressConfirm={
                                          ()=>{}
                                      }
                    />
                    {
                        this.renderByBindType()
                    }

                    <Button text={this.state.btnText}
                            disabled={this.state.btnDisabled}
                            style={{
                                marginTop:20,
                                width: Screen.width - 40,
                                backgroundColor: BTNColor,
                                alignSelf: "center",
                                borderRadius: 8
                            }}
                            onPress={this.handleCarBindClick}
                    />
                </View>
            </View>
        )
    }
}
export default connect((state)=>{
    const {carBind,login} = state;
    return {
        carBind,
        login
    }
})(CarBindView)

const styles = StyleSheet.create({
    desc:{
        padding:10
    }
})