'use strict';
import React,{Component} from 'react';
import{
    Text,
    View,
    StyleSheet,
    Image,
    Alert,
    TouchableOpacity,
    ScrollView,
    Platform
}from 'react-native';
// third modules
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
// utils
import {Screen, pixel1} from '../../utils/CommonUtil';
import UserDefaults from  '../../utils/GlobalStorage';
import { IMGURL } from '../../utils/RequestURL';
// action
import {fetchScores, fetchAvatar, changeAvatar,handleCarUnbind} from '../../actions/personalAction';
// sigle component
import CustomButton from '../Home/CustomButton';
// page component
import LoginView from '../../pages/Login/LoginView';
// 消费查询
import CostQuery from './CostQueryView';
// 我的预约
import Order from './OrderView';
// 我的消息
import Message from './MessageView';
// 车辆绑定
import CarBindView from './CarBindView';
// 积分明细
import Point from './PointView';
// 意见反馈
import Suggest from './SuggestView';

import SettingView from './SettingView'

import PersonalInfoView from './PersonalInfoView'

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
            component: PersonalInfoView
        },
        {
            text:"解除绑定",
            targetComponent:"解除绑定",
            image:require("../../image/icon_uc_unbind.png"),
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

class PersonalView extends Component{
    constructor(props){
        super(props);
        this.state = {
            userType : "",
            userName:"",
            userPhone:'',
            userCardNo:''
        };

        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    }

    componentDidMount(){
        const {dispatch} = this.props;
        UserDefaults.objectForKey("userInfo",userInfo => {
            //alert(JSON.stringify(userInfo))
            if(userInfo){
                this.setState({
                    userType : userInfo["USER_TYPE"],
                    userName:userInfo["CUST_NAME"],
                    userPhone:userInfo["LOGIN_MOBILE"],
                    userCardNo:userInfo["CARD_NO"]
                });

                // 使用用户id 去查询积分
                fetchScores(userInfo.LOGIN_USER_ID, (action)=> {
                    if(action !== 'error') {
                        dispatch(action);
                    }else {
                        alert('获取积分失败');
                    }
                });
            }
        });

        UserDefaults.objectForKey("avatar", source => {
            if(source){
                dispatch(fetchAvatar(source));
            }
        });
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
                                                if(item.text=="解除绑定"){
                                                    Alert.alert("温馨提示","请确认是否解除车辆绑定？",
                                                        [
                                                            {
                                                                text:"取消",
                                                                onPress:()=>{
                                                                    return;
                                                                }
                                                            },
                                                            {
                                                                text:"确认解除",
                                                                onPress:()=>{
                                                                    this.handleCarUnbind();
                                                                }
                                                            }
                                                        ]
                                                    )
                                                }else{
                                                    this.props.navigator.push({
                                                        component: item.component
                                                    })
                                                }
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
                                                if(item.text == "车主绑定"){
                                                    this.props.navigator.push({
                                                        component: CarBindView,
                                                        params:{
                                                            getUserInfo:(user)=>{
                                                                this.setState({
                                                                    userName:user.userName,
                                                                    userPhone:user.userPhone
                                                                })
                                                            }
                                                        }
                                                    })

                                                }else{
                                                    if(item.component){
                                                        this.props.navigator.push({
                                                            component: item.component
                                                        })
                                                    }else{
                                                        return
                                                    }
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

    //车主解绑
    handleCarUnbind = () => {
        UserDefaults.objectForKey("userInfo",userInfo => {
            if(userInfo) {
                const {dispatch} = this.props;
                dispatch(handleCarUnbind(userInfo["LOGIN_USER_ID"],()=>{
                    Alert.alert("温馨提示","解绑成功!",
                        [
                            {
                                text:"确定",
                                onPress:()=>{
                                    const {personal} = this.props;
                                    const uc_img = `${IMGURL}/images/uc_img.png`;
                                    dispatch(changeAvatar(uc_img));
                                    //清空积分
                                    //dispatch(personal.scores({TOTAL_POINT:0}))
                                    //还原头像
                                    UserDefaults.setObject('avatar', uc_img);
                                    //清空用户信息缓存
                                    UserDefaults.setObject("userInfo",{
                                        USER_TYPE:"3",
                                        CUST_NAME:"",
                                        GENDER:"2",
                                        CUST_NO:"",
                                        CARD_NO:"",
                                        VIN:"",
                                        CAR_NO:"",
                                        DLR_CODE:"",
                                        DLR_SHORT_NAME:"",
                                    })
                                }
                            }
                        ]
                    )
                }))
            }
        })
    };

    // 选择照片
    selectPhotoTapped() {
        const {dispatch} = this.props;
        const options = {
            title: '选择一张照片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '从相册选取',
            allowsEditing: false,
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };
        // showImagePicker 显示模态框方法，接收一个参数配置显示的文本
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                //
                var source;

                if (Platform.OS === 'android') {
                    source = {uri: response.uri, isStatic: true};
                } else {
                    source = {uri: response.uri.replace('file://', ''), isStatic: true};
                }

                dispatch(changeAvatar(source))
                // 写入本地存储
                UserDefaults.setObject('avatar', source);
            }
        });
    };
    
    render(){
        // 
        const {personal} = this.props;

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
                            <TouchableOpacity
                                onPress = {this.selectPhotoTapped}
                            >
                                <Image style={styles.avator}
                                    source={personal.avatar} 
                                />
                            </TouchableOpacity>
                            <Text style={styles.name}>
                                {this.state.userType == 2 ? this.state.userName : `未入会`}
                            </Text>
                            <Text style={styles.type}>
                                {this.state.userType == 2 ? `会员卡号: ${this.state.userCardNo}`:
                                 `手机号: ${this.state.userPhone}`
                                }
                            </Text>
                        </View>
                        <TouchableOpacity 
                            style={styles.point}
                            onPress = {()=> {
                                this.props.navigator.push({
                                    component: Point
                                })
                            }}
                        >
                            <Image
                                style = {{width: 14, height: 16}}
                                source = {require('../../image/icon_core.png')}
                            />
                            <Text style={styles.pointText}>
                                {`${personal.scores.TOTAL_POINT}  >`}
                            </Text>
                        </TouchableOpacity>
                    </Image>
                    {
                        this.renderMidItem()
                    }
                    <View style={styles.bottomItem}>
                        <TouchableOpacity 
                            style={styles.li} 
                            activeOpacity={0.7}
                            onPress = {()=> {
                                this.props.navigator.push({
                                    component: Suggest
                                })
                            }}
                        >
                            <Image style={{width:20,height:20}}
                                   source={{uri:icon_ip}} />
                            <Text style={{marginLeft:15,flex:5}}>意见反馈
                            </Text>
                            <Image style={styles.arrow} source={{uri:icon_go}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.li} activeOpacity={0.7}
                                                onPress={()=>{
                                                    this.props.navigator.push({
                                                        component:SettingView
                                                    })
                                                }}>
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

export default connect((state)=> {
    const {personal} = state;
    return {
        personal
    };
})(PersonalView)

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
    point:{
        flexDirection: "row",
        position:"absolute",
        right:-15,
        top:50,
        paddingHorizontal: 10,
        justifyContent:"center",
        alignItems: "center",
        height:30,
        backgroundColor:"rgba(0,0,0,0.4)",
        borderRadius:30
    },
    pointText:{
        color:"#fff",
        paddingLeft:10,
        paddingRight:10
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
