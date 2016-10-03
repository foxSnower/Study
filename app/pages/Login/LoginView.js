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
import {BGColor, BTNColor, Screen, pixelRation,validateMobile,ly_Toast} from '../../utils/CommonUtil';
import NavBar from '../../components/DefaultNavBar';
import LabelInput from '../../components/LabelInput';
import Button from '../../components/Button';
import AgreementView from './AgreementView';
import ForgetView from './ForgetView';
import RegistView from './RegistView';   //注册页面
import {updateLogin, loginSubim} from '../../actions/loginAction'

import UserDefaults from '../../utils/GlobalStorage';

class LoginView extends Component {

    componentDidMount(){
        //获取缓存中的手机号码
        const {dispatch}  = this.props;
        const {reg_mobile}  = this.props.login;
        dispatch(updateLogin({userID:reg_mobile}))
    }

    loginClick = () => {
        const {dispatch,navigator} = this.props;
        const {userID, password} = this.props.login;
        if(userID == undefined || userID ==""){
            ly_Toast("请输入手机号",2000)
            return;
        }
        if(!validateMobile(userID)){
            ly_Toast("手机格式不正确",2000);
            return;
        }
        if(password==undefined || password == '' ){
            ly_Toast("请输入密码",2000)
            return;
        }
        dispatch(updateLogin({'loginBtnText':"登录中...",'loginBtnDisabled': true}));
        dispatch(loginSubim(userID, password,navigator));
    }

    render() {
        const {dispatch, login} = this.props;
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
                            <LabelInput ref="phone"
                                        label="手机号"
                                        placeholder="请输入用户名"
                                        max={11}
                                        keyboardType="numeric"
                                        onChangeText={(text) => {
                                            dispatch(updateLogin({userID: text}))
                                        }}

                            />

                            <LabelInput label="密码"
                                        placeholder="请输入密码"
                                        type={true}
                                        onChangeText={(text) => {
                                            dispatch(updateLogin({password: text}))
                                        }}
                            />
                        </View>

                        <TouchableOpacity style={styles.find}
                                          onPress={()=>{
                                              this.props.navigator.push({
                                                  component:ForgetView
                                              })
                                          }}>
                            <Text style={{marginTop: 10, marginRight: 10, marginBottom: 30}}>找回密码</Text>
                        </TouchableOpacity>

                        <Button text={login.loginBtnText}
                                style={{
                                    width: Screen.width - 40,
                                    backgroundColor: BTNColor,
                                    alignSelf: "center",
                                    borderRadius: 8
                                }}
                                onPress={this.loginClick}
                                disabled={login.loginBtnDisabled}
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
        paddingLeft: 20,
    },
    textStyle: {}
})
