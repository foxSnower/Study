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
        dispatch(updateLogin({reg_mobile:reg_mobile}))
    }

    loginClick = () => {
        const {dispatch,navigator} = this.props;
        const {reg_mobile, password} = this.props.login;
        if(reg_mobile == undefined || reg_mobile ==""){
            ly_Toast("请输入手机号",2000)
            return;
        }
        if(!validateMobile(reg_mobile)){
            ly_Toast("手机格式不正确",2000);
            return;
        }
        if(password==undefined || password == '' ){
            ly_Toast("请输入密码",2000)
            return;
        }
        dispatch(updateLogin({'loginBtnText':"登录中...",'loginBtnDisabled': true}));
        dispatch(loginSubim(reg_mobile, password,navigator));
    }

    render() {
        const {dispatch, login} = this.props;
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


                <View style={{justifyContent: 'space-between', flex: 1}}>
                    <View>
                        <View style={styles.container}>
                            <LabelInput ref="phone"
                                        label="手机号"
                                        textStyle={{flex:1}}
                                        inputStyle={{flex:3}}
                                        placeholder="请输入用户名"
                                        max={11}
                                        hasRightIcon={true}
                                        keyboardType="numeric"
                                        onChangeText={(text) => {
                                            dispatch(updateLogin({reg_mobile: text}))
                                        }}

                            />

                            <LabelInput label="密码"
                                        placeholder="请输入密码"
                                        textStyle={{flex:1}}
                                        inputStyle={{flex:3}}
                                        type={true}
                                        hasRightIcon={true}
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
    },
    textStyle: {}
})
