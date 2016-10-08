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
import {BGColor, BTNColor, Screen, pixelRation,GM_CALL, validateMobile,ly_Toast} from '../../utils/CommonUtil';
import NavBar from '../../components/DefaultNavBar';
import LabelInput from '../../components/LabelInput';
import Button from '../../components/Button';
import LoginView from './LoginView'
import Icon from 'react-native-vector-icons/Ionicons'
import {updateLogin,getValidateCode,modifyUser} from '../../actions/loginAction';

import UserDefaults from '../../utils/GlobalStorage'

class ForgetView extends Component {
    //获取验证码逻辑
    getVailidateCode = ()=> {
        const {dispatch} = this.props;
        let {find_mobile,find_code} =this.props.login;
        if(find_mobile == undefined || find_mobile ==""){
            ly_Toast("请输入手机号");
            return;
        }
        if(!validateMobile(find_mobile)){
            ly_Toast("手机格式不正确");
            return;
        }else{
            dispatch(getValidateCode(find_mobile,1,this.props.navigator))
            // if(alreadyReg){
            //     this.props.navigator.push({
            //         component:LoginView
            //     })
            // }
        }
        let timer = setInterval(function () {
            if(find_code>0){
                dispatch(updateLogin({find_code:find_code--,findSendText:`重新发送(${find_code})`,findSendBtnDisabled:true}))
            }else{
                dispatch(updateLogin({find_code:60,findSendText:'发送验证码',findSendBtnDisabled:false}))
                clearInterval(timer);
            }

        },1000)

    }
    //处理发送验证码按钮


    //修改
    modify =()=>{
        const {dispatch} = this.props;
        const {find_mobile,find_pwd,find_repwd,find_valiCode} =this.props.login;
        if(find_mobile == undefined || find_mobile ==""){
            ly_Toast("请输入手机号");
            return;
        }
        if(!validateMobile(find_mobile)){
            ly_Toast("手机格式不正确");
            return;
        }
        if(find_valiCode == undefined || find_valiCode == ''){
            ly_Toast("请输入验证码");
            return;
        }
        if(find_pwd==undefined || find_pwd == '' ){
            ly_Toast("请输入密码");
            return;
        }else if(find_pwd.length<8){
            ly_Toast("密码不能小于8位");
            return;
        }else if(find_pwd.length>12){
            ly_Toast("密码不能大于12位");
            return;
        }
        if(find_repwd==undefined || find_repwd == '' ){
            ly_Toast("请输入确认密码");
            return;
        }else if(find_pwd.length>12){
            ly_Toast("密码不能大于12位");
            return;
        }else if(find_pwd!=find_repwd){
            ly_Toast("两次密码不一致");
            return;
        }
        dispatch(modifyUser(find_mobile,find_valiCode,find_pwd))


    }

    render() {

        const {dispatch} = this.props;
        const {findSendText,findSendBtnDisabled,reg_mobile} = this.props.login;
        return (
            <View style={styles.page}>
                <NavBar title="找回密码"
                        onBack={()=>{
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
                                            dispatch(updateLogin({find_mobile: text}))
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
                                                dispatch(updateLogin({find_valiCode:text}))
                                            }}
                                />
                                <TouchableOpacity style={styles.validateBtn}
                                                  onPress={this.getVailidateCode}
                                                  disabled={findSendBtnDisabled}>
                                    <Text style={{ textAlign: 'center'}}>{findSendText}</Text>
                                </TouchableOpacity>
                            </View>

                            <LabelInput label="新密码"
                                        placeholder="请输入8-12位密码,可以包括数字和字母"
                                        type={true}
                                        textStyle={{flex:1}}
                                        inputStyle={{flex:3}}
                                        onChangeText={(text)=> {
                                            dispatch(updateLogin({find_pwd: text}))
                                        }}
                                        max={20}
                            />
                            <LabelInput label="确认密码"
                                        textStyle={{flex:1}}
                                        inputStyle={{flex:3}}
                                        placeholder="请输入8-12位密码,可以包括数字和字母"
                                        type={true}
                                        onChangeText={(text)=> {
                                            dispatch(updateLogin({find_repwd:text}))
                                        }}
                                        max={20}
                            />

                        </View>

                        <TouchableOpacity style={styles.find}
                                          onPress={()=>{
                                              Linking.openURL(`tel:${GM_CALL}`);
                                          }}>
                            <Text style={{marginTop: 10, marginRight: 10, marginBottom: 30}}>
                                <Icon name="ios-phone-portrait" size={14} color='#666'/> 联系客服</Text>
                        </TouchableOpacity>

                        <Button text="确 认"
                                style={{
                                    width: Screen.width - 40,
                                    backgroundColor: BTNColor,
                                    alignSelf: "center",
                                    borderRadius: 8
                                }}
                                onPress={this.modify}/>
                    </View>
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
})(ForgetView);

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
