'use strict';
import React,{Component} from 'react';
import{
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
ScrollView
}from 'react-native';
import CustomButton from '../Home/CustomButton';
import {Screen, pixel1} from '../../utils/CommonUtil';
// page component
import LoginView from '../../pages/Login/LoginView';
// 消费查询
import CostQuery from './CostQueryView';
// 我的预约
import Order from './OrderView';
// 我的消息
import Message from './MessageView';
import CarBindView from './CarBindView'
import UserDefaults from  '../../utils/GlobalStorage'

import { IMGURL } from '../../utils/RequestURL'

const userType1 = [
    [
        {
            text:"车主绑定",
            targetComponent:"车主绑定",
            image:require("../../image/icon_uc_bind.png"),
            component: CarBindView
        },
        {
            text:"我的预约",
            targetComponent:"我的预约",
            image:require("../../image/icon_uc_book.png"),
            component: Order
        },
        {
            text:"我的活动",
            targetComponent:"我的活动",
            image:require("../../image/icon_uc_activity.png"),
            component: LoginView
        }
    ],
    [
        {
            text:"我的消息",
            targetComponent:"我的消息",
            image:require("../../image/icon_uc_msg.png"),
            component: Message
        },
        {
            text:"",
            targetComponent:"我的消息",
        },
        {
            text:"",
            targetComponent:"我的消息",
        }
    ]
];

const userType2 = [
    [
        {
            text:"车主信息",
            targetComponent:"车主信息",
            image:require("../../image/icon_uc_info.png"),
            component: LoginView
        },
        {
            text:"解除绑定",
            targetComponent:"解除绑定",
            image:require("../../image/icon_uc_unbind.png"),
            component: LoginView
        },
        {
            text:"我的预约",
            targetComponent:"我的预约",
            image:require("../../image/icon_uc_book.png"),
            component: Order
        },
    ],
    [
        {
            text:"我的活动",
            targetComponent:"我的活动",
            image:require("../../image/icon_uc_activity.png"),
            component: LoginView
        },
        {
            text:"消费查询",
            targetComponent:"消费查询",
            image:require("../../image/icon_uc_pays.png"),
            component: CostQuery
        },
        {
            text:"我的消息",
            targetComponent:"我的消息",
            image:require("../../image/icon_uc_msg.png"),
            component: Message
        },
    ]
];
export default class PersonalView extends Component{
    constructor(props){
        super(props);
        this.state = {
            userType : "",
            userName:"",
            userPhone:'',
            userCardNo:'',
        }
    }

    componentDidMount(){
        UserDefaults.objectForKey("userInfo",userInfo => {
            alert(JSON.stringify(userInfo))
            if(userInfo){
                this.setState({
                    userType : userInfo["USER_TYPE"],
                    userName:userInfo["CUST_NAME"],
                    userPhone:userInfo["LOGIN_MOBILE"],
                    userCardNo:userInfo["CARD_NO"],
                })
            }
        })
    }

    renderMidItem(){
        let aItems = [];
            if(this.state.userType == 2){
                userType2.map((row, index)=>{
                    aItems.push(
                        <View style={{flexDirection:"row",backgroundColor:"#fff"}} key={index}>
                            {
                                row.map((item,index2)=>{
                                    return(
                                        <CustomButton style={{flex:1}}
                                                      imageStyle={styles.imageItems}
                                                      image={item.image}
                                                      key={index2}
                                                      textStyle={{marginBottom:10,fontSize:12,marginTop:5}}
                                                      text={item.text}
                                                      onPress={()=> {
                                                          this.props.navigator.push({
                                                              component: item.component
                                                          })
                                                      }}
                                        />
                                    )
                                })
                            }
                        </View>
                    )
                })
            }else{
                userType1.map((row, index)=>{
                    aItems.push(
                        <View style={{flexDirection:"row",backgroundColor:"#fff"}} key={index}>
                            {
                                row.map((item,index2)=>{
                                    return(
                                        <CustomButton style={{flex:1}}
                                                      imageStyle={styles.imageItems}
                                                      image={item.image?item.image:null}
                                                      key={index2}
                                                      textStyle={{marginBottom:10,fontSize:12,marginTop:5}}
                                                      text={item.text}
                                                      onPress={()=> {
                                                          if(item.component){
                                                              this.props.navigator.push({
                                                                  component: item.component
                                                              })
                                                          }else{
                                                              return
                                                          }
                                                      }}
                                        />
                                    )
                                })
                            }
                        </View>
                    )
                })
            }
            return aItems;

    }
    
    render(){
        const icon_go = `${IMGURL}/images/icon_link_go2.png`;
        const icon_ip = `${IMGURL}/images/icon_uc_opinion.png`;
        const icon_set = `${IMGURL}/images/icon_uc_set.png`;


        return(
            <ScrollView>
            <View style={{backgroundColor:"#efeff4"}}>
                <Image style={styles.backgroundImage}
                       resizeMode="cover"
                       source={require("../../image/uc_bg.jpg")} >
                       <View style={styles.container}>
                           <Image style={styles.avator}
                                  source={require("../../image/uc_img.jpg")} />
                           <Text style={styles.name}>
                               {this.state.userType == 2 ? this.state.userName : `未入会`}
                           </Text>
                           <Text style={styles.type}>
                               {this.state.userType == 2 ? `会员卡号: ${this.state.userCardNo}`:
                                 `手机号: ${this.state.userPhone}`
                               }

                           </Text>
                       </View>
                       <View style={styles.point}>
                            <Text style={styles.pointText}>
                            积分:286 >
                            </Text>
                       </View>
                </Image>
                {
                    this.renderMidItem()
                }
                <View style={styles.bottomItem}>
                    <TouchableOpacity style={styles.li} activeOpacity={0.7}>
                        <Image style={{width:20,height:20}}
                               source={{uri:icon_ip}} />
                        <Text style={{marginLeft:15,flex:5}}>意见反馈
                        </Text>
                        <Image style={styles.arrow} source={{uri:icon_go}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.li} activeOpacity={0.7}>
                        <Image  style={{width:20,height:20}}
                                source={{uri:icon_set}} />
                        <Text style={{marginLeft:15,flex:5}}>设置
                        </Text>
                        <Image style={styles.arrow} source={{uri:icon_go}} />
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    backgroundImage:{
        width:Screen.width,
        height:Screen.height*0.4
    },
    avator:{
        width:80,
        height:80,
        borderRadius:40,
        shadowColor:"#333",
    },
    name:{
        marginTop:5,
        marginBottom:5,
        color:"#fff"
    },
    type:{
        color:"#fff"
    },
    pointText:{
        color:"#fff",
        paddingLeft:15,
        paddingRight:15,
    },
    point:{
        position:"absolute",
        right:-15,
        top:50,
        justifyContent:"center",
        height:30,
        backgroundColor:"rgba(0,0,0,0.4)",
        borderRadius:30
    },
    imageItems:{
        width:50,
        height:50,
        marginTop:15,
    },
    bottomItem:{
        width:Screen.width,
        backgroundColor:"#fff",
        marginTop:10,
        marginBottom:10
    },
    li:{
        flex:1,
        alignItems:"center",
        borderBottomWidth:1,
        borderBottomColor:"#eee",
        flexDirection:"row",
        height:50,
        paddingLeft:20
    },
    arrow:{
        right:20,
        width:10,
        height:20,
    }
})
