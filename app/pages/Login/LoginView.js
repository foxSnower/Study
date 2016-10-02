import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux';
import {BGColor, BTNColor, Screen, pixelRation,validateMobile} from '../../utils/CommonUtil';
import NavBar from '../../components/DefaultNavBar';
import LabelInput from '../../components/LabelInput';
import Button from '../../components/Button';
import AgreementView from './AgreementView';
//import ForgetView from './ForgetView';
import RegistView from './RegistView';   //注册页面
import Toast from 'react-native-root-toast';
import {updateLogin, loginSubim} from '../../actions/loginAction'

import UserDefaults from '../../utils/GlobalStorage';

class LoginView extends Component {

    componentDidMount(){
        //获取缓存中的手机号码
        UserDefaults.objectForKey("userInfo",(data)=> {
            if (data) {
                alert(data["LOGIN_USER_ID"])
            }
        });
    }

    loginClick = () => {
        const {dispatch} = this.props;
        const {userID, password} = this.props.login;
        if(userID == undefined || userID ==""){
            Toast.show("请输入手机号",{
                duration:2000,
            });
            return;
        }
        if(!validateMobile(userID)){
            Toast.show("手机格式不正确",{
                duration:2000,
            })
            return;
        }
        if(password==undefined || password == '' ){
            Toast.show("请输入密码",{
                duration:2000,
            })
            return;
        }
        dispatch(loginSubim(userID, password));
    }

    render() {
        const {dispatch} = this.props;
        //iosMode returnKeyType 确认键的内容 enablesReturnKeyAutomatically 为空时禁用按钮 clearButtonMode 右侧显示删除
        //  const { label,labelStyle,textStyle,placeholder,keyboardType,inputType,max,iosMode}  = this.props;
        return (
            <View style={styles.page}>
                <NavBar title="登录"
                        rightText="注册"
                        hideRightButton={false}
                        onRightClick={()=> {
                            this.props.navigator.push({
                                component: RegistView
                            })
                        }}
                        onBack={()=> {
                            this.props.navigator.pop();
                        }}
                />
                {/* <Image style={{flex:1,width:Screen.width,height:Screen.height}}
                 source={require('../../image/0.jpg')}
                 resizeMode="cover"> */}

                <View style={{justifyContent: 'space-between', flex: 1}}>
                    <View>
                        <View style={styles.container}>
                            <LabelInput label="手机号"
                                        labelStyle={{width: 50}}
                                        placeholder="请输入用户名"
                                        defaultValue=""
                                        max={11}
                                        keyboardType="numeric"
                                        onChangeText={(text) => {
                                            dispatch(updateLogin({userID: text}))
                                        }}

                            />

                            <LabelInput label="密码"
                                        labelStyle={{width: 50}}
                                        textStyle={{borderBottomWidth: 0}}
                                        placeholder="请输入密码"
                                        defaultValue=""
                                        type={true}
                                        onChangeText={(text) => {
                                            dispatch(updateLogin({password: text}))
                                        }}
                            />
                        </View>

                        <TouchableOpacity style={styles.find}
                                          onPress={()=>{
                                              {/*this.props.navigator.push({*/}
                                                  {/*component:ForgetView*/}
                                              {/*})*/}
                                          }}>
                            <Text style={{marginTop: 10, paddingRight: 10, marginBottom: 30}}>找回密码</Text>
                        </TouchableOpacity>

                        <Button text="登  录"
                                style={{
                                    width: Screen.width - 40,
                                    backgroundColor: BTNColor,
                                    alignSelf: "center",
                                    borderRadius: 8
                                }}
                                onPress={this.loginClick}
                        />
                    </View>
                    <Button text="东风日产车主APP使用协议"
                            textStyle={{color: "#666", fontWeight: "300"}}
                            style={{marginBottom: 5, backgroundColor: BGColor}}
                            onPress={()=> {
                                this.props.navigator.push({
                                    component: AgreementView
                                })
                            }}/>
                </View>

            </View>
        )
    }
}

export default connect((state) => {
    const {login} = state;
    return {
        login
    }
})(LoginView);

const styles = StyleSheet.create({
    find: {
        alignSelf: "flex-end"
    },
    regist: {
        alignSelf: "flex-start"
    },
    page: {
        backgroundColor: BGColor,
        flex: 1
    },
    container: {
        backgroundColor: "#fff",
        flex: 1,
        marginTop: 30,
        paddingLeft: 30,
    },
    textStyle: {}
})
