/**
 * Created by 楚寒 on 2016/10/9.
 */
import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    Alert,
    BackAndroid,
    Platform
} from 'react-native';
// 
import {logout} from '../../actions/loginAction';
import { IMGURL } from '../../utils/RequestURL'
import LoginView from '../Login/LoginView'
import NavBar from '../../components/DefaultNavBar'
import TabBarView from '../../containers/TabBarView';
import UserDefaults from '../../utils/GlobalStorage'
import {Screen, pixel1, BTNColor, BORDERColor} from  '../../utils/CommonUtil';

class CommonRow extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const {title,content,imageUrl ,onPress} = this.props;
        return(
            <TouchableOpacity style={styles.row}
                              onPress={ onPress }>
                <Image source={{uri:imageUrl}}
                       resizeMode="cover"
                       style={{width:20,height:20}}/>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.content}>{content}</Text>
            </TouchableOpacity>
        )
    }
}

export default class SettingView extends Component {

    handleExitLogin = () => {
        const {dispatch} = this.props;
        //清空用户信息
        UserDefaults.setObject("userInfo",{});
        //清空车辆信息
        UserDefaults.setObject("carInfo",{});
        dispatch(logout());

        this.props.navigator.resetTo({
            component: TabBarView
        });
    }
    //点击退出登录
    handleExitApp = () => {
        BackAndroid.exitApp();
    }

    render(){
        const icon_close = `${IMGURL}/images/icon_close.png`;
        return(
            <View style = {styles.container}>
                <NavBar
                    title = "设置"
                    onBack = {()=> {
                        this.props.navigator.pop()
                    }}
                />
                <View>
                <CommonRow imageUrl={icon_close}
                           title="退出登录"
                            onPress={()=>{
                                Alert.alert("温馨提示","您确定要退出吗?",
                                    [
                                        {
                                            text:"取消",
                                            onPress:()=>{
                                                return
                                            }
                                        },
                                        {
                                            text:"确认",
                                            onPress:()=>{
                                                this.handleExitLogin()
                                            }
                                        }
                                    ]
                                )


                            }} />

                    {
                        Platform.OS === 'android' ?
                            <CommonRow imageUrl={icon_close}
                                       title="退出应用"
                                        onPress={()=>{
                                            Alert.alert("温馨提示","您确定要退出吗?",
                                                [
                                                    {
                                                        text:"取消",
                                                        onPress:()=>{
                                                            return
                                                        }
                                                    },
                                                    {
                                                        text:"确认",
                                                        onPress:()=>{
                                                            this.handleExitApp()
                                                        }
                                                    }
                                                ]
                                            )

                                            }
                                        }/>
                            : ""
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
    },
    row:{
        borderBottomWidth:0.8,
        borderBottomColor:"#d9d9d9",
        flexDirection: "row",
        alignItems:"center",
        padding:10,
        backgroundColor:"#fff",
        height:55
    },
    title:{
        color:"#2b2b2b",
        marginLeft:10,
        marginRight:10,
    },
    content:{
        color:"#2b2b2b",
        justifyContent: "center",
        alignItems:"center"
    }
})