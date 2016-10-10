"use strict";
import React, {
    Component
} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Alert
} from 'react-native';
import {connect} from 'react-redux';
// util
import UserDefaults from '../../utils/GlobalStorage';
import {
    pixel1,
    BORDERColor
} from '../../utils/CommonUtil';
import auth from '../../utils/AuthUtil';
// common component
import NavBar from '../../components/DefaultNavBar';
import CustomButton from './CustomButton';
// page component
import DLRView from '../Business/DLRView';
import TestDriveHomeView from '../Business/TestDriveHomeView';
import CommissionView from '../Business/CommissionView';
import LoginView from '../Login/LoginView';
import MaintainView from '../Business/MaintainView';
import RescueView from '../Business/RescueView';
import CarBindView from '../Personal/CarBindView';
import RepairView from '../Business/RepairView';
import BaiduMapDemo from '../Business/BaiduMapDemo';

const customerButtonItems = [
    [{
        text: "保养预约",
        targetComponent: "MaintainBookView",
        image: require("../../image/icon_bus_protect.png"),
        secText: "为车主解决汽车保养难题",
        component: MaintainView //这里理解把 没用到这个啊 为什么这里不明白 不是就用到2个吗
    }, {
        text: "维修预约",
        targetComponent: "RepairBookView",
        image: require("../../image/icon_bus_maintain.png"),
        secText: "为您提供贴心维修服务",
        component: RepairView
    }],
    [{
        text: "4S店查询",
        targetComponent: DLRView,
        image: require("../../image/icon_bus_dri.png"),
        secText: "可查询省市或附近专营店",
        component: DLRView
    }, {
        text: "代办预约",
        targetComponent: "CommissionView",
        image: require("../../image/icon_bus_do.png"),
        secText: "可代办车险年票等",
        component: CommissionView
    }],
    [{
        text: "试驾预约",
        targetComponent: "TestDriveView",
        image: require("../../image/icon_bus_drive.png"),
        secText: "在线预约试驾各类车型",
        component: TestDriveHomeView
    }, {
        text: "紧急救援",
        targetComponent: "Rescue",
        image: require("../../image/icon_bus_help.png"),
        secText: "为您提供及时的救援",
        component: RescueView
    }],

];
class BussinessView extends Component {
    constructor(props) {
        super(props);
        this.handleCustomerClick = this.handleCustomerClick.bind(this);
    }


    handleCustomerClick(component){
        const userInfo = this.props.login.userInfo;
        // 如果用户信息存在
        switch (parseInt(userInfo["USER_TYPE"])) {
            // 如果用户类型是0，即未登录
            case 0:
                if (component == 1 || component == 2 || component == 4) {
                    //未登录 紧急救援、4S点查询不需要登录也可查看
                    Alert.alert("温馨提示", "您还未登录，是否现在进行登录？", [
                      {"text": "取消", onPress: ()=>{
                        return;
                      }},
                      {"text": "确定", onPress: ()=>{
                        this.props.navigator.push({
                            component: LoginView
                        });
                      }}
                    ]);
                } else if (component == 3) {
                    this.props.navigator.push({
                        component: DLRView
                    })
                } else if (component == 5) {
                    this.props.navigator.push({
                        component: TestDriveHomeView
                    })
                } else if (component == 6) {
                    this.props.navigator.push({
                        component: RescueView
                    })
                }
                break;
            // 登录没有绑定车辆 
            case 1: 
                if (component == 1 || component == 2 || component == 4) {
                    // 保养、维修、代办预约 需要绑定车辆
                    Alert.alert("温馨提示", "您还未绑定车辆，是否现在进行绑定？", [
                      {"text": "取消", onPress: ()=>{
                        return;
                      }},
                      {"text": "确定", onPress: ()=>{
                        this.props.navigator.push({
                            component: CarBindView
                        });
                      }}
                    ]);
                } else if (component == 3) {
                    this.props.navigator.push({
                        component: DLRView
                    })
                } else if (component == 5) {
                    this.props.navigator.push({
                        component: TestDriveHomeView
                    })
                } else if (component == 6) {
                    this.props.navigator.push({
                        component: RescueView
                    })
                }
                break;
            case 2: //身份验证通过
                let params = {
                    LOGIN_USER_ID: userInfo["LOGIN_USER_ID"],
                    LOGIN_MOBILE: userInfo["LOGIN_MOBILE"],
                    CUST_NAME: userInfo["CUST_NAME"],
                    DLR_CODE: userInfo["DLR_CODE"],
                    DLR_SHORT_NAME: userInfo["DLR_SHORT_NAME"],
                };
                if (component == 1) {
                    this.props.navigator.push({
                        component: MaintainView,
                        params
                    })
                } else if (component == 2) {
                    this.props.navigator.push({
                        component: RepairView,
                        params
                    })
                } else if (component == 3) {
                    this.props.navigator.push({
                        component: DLRView,
                        params
                    })
                } else if (component == 4) {
                    this.props.navigator.push({
                        component: CommissionView,
                        params
                    })
                } else if (component == 5) {
                    this.props.navigator.push({
                        component: TestDriveHomeView,
                        params
                    })
                } else if (component == 6) {
                    this.props.navigator.push({
                        component: RescueView,
                        params
                    })
                }
                break;
            case 3:
                if (component == 1 || component == 2 || component == 4) {
                    // 已经登录，但是没有绑定车辆
                    Alert.alert("温馨提示", "您还未绑定车辆，是否现在进行绑定？", [
                      {"text": "取消", onPress: ()=>{
                        return;
                      }},
                      {"text": "确定", onPress: ()=>{
                        this.props.navigator.push({
                            component: CarBindView
                        });
                      }}
                    ]);
                } else if (component == 3) {
                    this.props.navigator.push({
                        component: DLRView
                    })
                } else if (component == 5) {
                    this.props.navigator.push({
                        component: TestDriveHomeView
                    })
                } else if (component == 6) {
                    this.props.navigator.push({
                        component: RescueView
                    })
                }
                break;
            default:
                if (component == 1 || component == 2 || component == 4) {
                    Alert.alert("温馨提示", "您还未登录，是否现在进行登录？", [
                      {"text": "取消", onPress: ()=>{
                        return;
                      }},
                      {"text": "确定", onPress: ()=>{
                        this.props.navigator.push({
                            component: LoginView
                        });
                      }}
                    ]);
                } else if (component == 3) {
                    this.props.navigator.push({
                        component: DLRView
                    })
                } else if (component == 5) {
                    this.props.navigator.push({
                        component: TestDriveHomeView
                    })
                } else if (component == 6) {
                    this.props.navigator.push({
                        component: RescueView
                    })
                }
                break;
        }
    }

    render() {
        return (
            <View style={{flex:1}}>
                <NavBar title="爱车" hideLefButton={true} />
                {
                    customerButtonItems.map((row,index)=>{
                        return (
                            <View style={{flex:1,flexDirection:"row",borderBottomWidth:pixel1,borderColor:BORDERColor}} key={index}>
                                    {
                                        row.map((item,index2)=>{
                                            return (
                                                <CustomButton style={{flex:1,marginBottom:10}}
                                                              image={item.image}
                                                              imageStyle={{marginTop:15,maxWidth:80}}
                                                              key={index2}
                                                              textStyle={{marginBottom:10,fontSize:12}}
                                                              text={item.text}
                                                              onPress={()=>{
                                                                  switch (item.text){
                                                                      case "保养预约":
                                                                          this.handleCustomerClick(1)
                                                                          break;
                                                                      case "维修预约":
                                                                            this.handleCustomerClick(2)
                                                                          break;
                                                                      case "4S店查询":
                                                                          this.handleCustomerClick(3)
                                                                          break;
                                                                      case "代办预约":
                                                                          this.handleCustomerClick(4)
                                                                          break;
                                                                      case "试驾预约":
                                                                          this.handleCustomerClick(5)
                                                                          break;
                                                                      case "紧急救援":
                                                                          this.handleCustomerClick(6)
                                                                          break;
                                                                      default:
                                                                          return ;
                                                                  }
                                                              }
                                                              }
                                                              secText={item.secText}
                                                              secTextStyle={{marginBottom:5,fontSize:12}}
                                                />
                                            )
                                        })
                                    }
                                </View>
                        )
                    })
                }
            </View>
        )
    }
}

export default connect((state)=> {
    const {login} = state;
    return {
        login
    }
})(BussinessView)