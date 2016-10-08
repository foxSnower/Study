import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    Linking,
    TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux';
import {BGColor, BTNColor, Screen, pixelRation, GM_CALL, validateMobile, ly_Toast} from '../../utils/CommonUtil';
import NavBar from '../../components/DefaultNavBar';
import LabelInput from '../../components/LabelInput';
import Button from '../../components/Button';
import AgreementView from './AgreementView';    //注册协议
import LoginView from './LoginView'
import Icon from 'react-native-vector-icons/Ionicons'
import {updateLogin, getValidateCode, addUser} from '../../actions/loginAction';

import UserDefaults from '../../utils/GlobalStorage'

class RegistView extends Component {
    constructor(props){
        super(props);
    }
    //获取验证码逻辑
    getVailidateCode = ()=> {
        const {dispatch, navigator} = this.props;
        let {reg_mobile, code, alreadyReg} =this.props.login;
        if (reg_mobile == undefined || reg_mobile == "") {
            ly_Toast("请输入手机号");
            return;
        }
        if (!validateMobile(reg_mobile)) {
            ly_Toast("手机格式不正确");
            return;
        } else {
            dispatch(getValidateCode(reg_mobile, 2, navigator))
            if (alreadyReg) {
                this.props.navigator.push({
                    component: LoginView
                })
            }
        }
        let timer = setInterval(function () {
            if (code > 0) {
                dispatch(updateLogin({code: code--, reSendText: `重新发送(${code})`, reSendBtnDisabled: true}))
            } else {
                dispatch(updateLogin({code: 60, reSendText: '发送验证码', reSendBtnDisabled: false}))
                clearInterval(timer);
            }

        }, 1000)
    };
    //处理发送验证码按钮
    componentDidMount(){
        const {dispatch, regPhone } = this.props;
        if(regPhone){
            dispatch(updateLogin({reg_mobile: regPhone}))
        }
    }


    //注册
    reg = ()=> {
        const {dispatch} = this.props;
        const {reg_mobile, reg_pwd, reg_repwd, reg_valiCode} =this.props.login;
        if (reg_mobile == undefined || reg_mobile == "") {
            ly_Toast("请输入手机号");
            return;
        }
        if (!validateMobile(reg_mobile)) {
            ly_Toast("手机格式不正确");
            return;
        }
        if (reg_valiCode == undefined || reg_valiCode == '') {
            ly_Toast("请输入验证码");
            return;
        }
        if (reg_pwd == undefined || reg_pwd == '') {
            ly_Toast("请输入密码");
            return;
        } else if (reg_pwd.length < 8) {
            ly_Toast("密码不能小于8位");
            return;
        } else if (reg_pwd.length > 12) {
            ly_Toast("密码不能大于12位");
            return;
        }
        if (reg_repwd == undefined || reg_repwd == '') {
            ly_Toast("请输入确认密码");
            return;
        } else if (reg_repwd.length > 12) {
            ly_Toast("密码不能大于12位");
            return;
        } else if (reg_pwd != reg_repwd) {
            ly_Toast("两次密码不一致");
            return;
        }
        UserDefaults.objectForKey("deviceInfo", (device)=> {
            if (device) {
                //alert(`1:${reg_mobile},2:${reg_valiCode},3,${reg_pwd},4${JSON.stringify(device)}`)
                dispatch(addUser(reg_mobile, reg_valiCode, reg_pwd, device))

            } else {
                alert("Get DeviceInfo ERROR")
            }
        })

    };

    render() {

        const {dispatch} = this.props;
        const {reSendText, reSendBtnDisabled,reg_mobile} = this.props.login;
        return (
            <View style={styles.page}>
                <NavBar title="注册"
                        onBack={()=> {
                            this.props.navigator.pop();
                        }}
                />
                <View style={{justifyContent: 'space-between', flex: 1}}>
                    <View>
                        <View style={styles.container}>
                            <LabelInput label="手机号"
                                        textStyle={{flex:1}}
                                        inputStyle={{flex:3}}
                                        defaultValue={reg_mobile}
                                        placeholder="请输入手机号"
                                        max={11}
                                        keyboardType="numeric"
                                        onChangeText={(text)=> {
                                            dispatch(updateLogin({reg_mobile: text}))
                                        }}
                            >
                            </LabelInput>
                            <View style={{flexDirection:'row'}}>
                                <LabelInput label="验证码"
                                            style={{flex:1}}
                                            placeholder="请输入验证码"
                                            textStyle={{flex:1}}
                                            inputStyle={{flex:3}}
                                            max={6}
                                            keyboardType="numeric"
                                            onChangeText={(text)=> {
                                                dispatch(updateLogin({reg_valiCode: text}))
                                            }}
                                />
                                <TouchableOpacity style={styles.validateBtn}
                                                  onPress={this.getVailidateCode}
                                                  disabled={reSendBtnDisabled}>
                                    <Text style={{ textAlign: 'center'}}>{reSendText}</Text>
                                </TouchableOpacity>
                            </View>

                            <LabelInput label="密码"
                                        placeholder="请输入8-12位密码,可以包括数字和字母"
                                        type={true}
                                        textStyle={{flex:1}}
                                        inputStyle={{flex:3}}
                                        onChangeText={(text)=> {
                                            dispatch(updateLogin({reg_pwd: text}))
                                        }}
                                        max={20}
                            />
                            <LabelInput label="确认密码"
                                        textStyle={{flex:1}}
                                        inputStyle={{flex:3}}
                                        placeholder="请输入8-12位密码,可以包括数字和字母"
                                        type={true}
                                        onChangeText={(text)=> {
                                            dispatch(updateLogin({reg_repwd: text}))
                                        }}
                                        max={20}
                            />

                        </View>

                        <TouchableOpacity style={styles.find}
                                          onPress={()=> {
                                              Linking.openURL(`tel:${GM_CALL}`);
                                          }}>

                            <Text style={{marginTop: 10, marginRight: 10, marginBottom: 30}}>
                                <Icon name="ios-phone-portrait" size={14} color='#666'/> 注册遇到问题,联系客服</Text>
                        </TouchableOpacity>

                        <Button text="注  册"
                                style={{
                                    width: Screen.width - 40,
                                    backgroundColor: "#007AFF",
                                    alignSelf: "center",
                                    borderRadius: 8
                                }}
                                onPress={this.reg}/>
                    </View>

                    <Button text="东风日产车主APP使用协议"
                            textStyle={{color: "#666", fontWeight: "300"}}
                            style={{marginBottom: 10, alignSelf: "center", backgroundColor: BGColor}}
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
})(RegistView);

const styles = StyleSheet.create({
    find: {
        alignSelf: "flex-end"
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
    validateBtn: {
        flex: 2,
        borderColor: "#b2b2b2",
        borderWidth: 1,
        borderRadius: 10,
        justifyContent:'center',
        height: 35,
        alignSelf: 'center',
        marginRight: 15,
        position: "absolute",
        top: 4,
        right: 10
    }
})
