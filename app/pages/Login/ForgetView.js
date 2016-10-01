import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native';

import connect from 'react-redux';
import {BGColor,BTNColor,Screen,pixelRation,validateMobile,GM_CALL} from '../../utils/CommonUtil';
import NavBar from '../../components/DefaultNavBar';
import LabelInput from '../../components/LabelInput';
import Button from '../../components/Button';
import Toast from 'react-native-root-toast';
import {updateRegist} from '../../actions/registAction'

class ForgetView extends Component{

    getVailidateCode = ()=>{
        const {dispatch} = this.props;
        const {mobile} =this.props.regist;
        if(mobile == undefined || mobile ==""){
            Toast.show("请输入手机号",{
                duration:2000,
            });
            return;
        }
        if(!validateMobile(mobile)){
            Toast.show("手机格式不正确",{
                duration:2000,
            })
            return;
        }
        alert(222);
    }
    render(){
        const {dispatch} = this.props;
        return(
            <View style={styles.page}>
                <NavBar title="注册"
                />
                <View style={{justifyContent: 'space-between', flex: 1}}>
                    <View>
                        <View style={styles.container}>
                            <LabelInput  label="手机号"
                                         labelStyle={{width:60}}
                                         placeholder="请输入手机号"
                                         defaultValue=""
                                         max={11}
                                         keyboardType="numeric"
                                         onChangeText={(text)=>{
                                             dispatch(updateRegist({mobile:text}))
                                         }}
                            >
                            </LabelInput>
                            <LabelInput  label="验证码"
                                         labelStyle={{width:60}}
                                         placeholder="请输入验证码"
                                         defaultValue=""
                                         max={6}
                                         keyboardType="numeric"
                            />

                            <LabelInput  label="新密码"
                                         labelStyle={{width:60}}
                                         placeholder="请输入8-12位密码,可以包括数字和字母"
                                         defaultValue=""
                                         type={true}
                                         max={20}
                            ></LabelInput>
                            <LabelInput  label="确认密码"
                                         labelStyle={{width:60}}
                                         placeholder="请输入8-12位密码,可以包括数字和字母"
                                         defaultValue=""
                                         type={true}
                                         max={20}
                            />
                            <TouchableOpacity style={styles.validateBtn}
                                              onPress={this.getVailidateCode}>
                                <Text>发送验证码</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.find}
                                          onPress={()=>{
                                              Linking.openURL(`tel:${GM_CALL}`);
                                          }}>
                            <Text style={{marginTop:10,paddingRight:10,marginBottom:30}}>注册遇到问题,联系客服</Text>
                        </TouchableOpacity>

                        <Button text="确  定"
                                style={{width:Screen.width-40,backgroundColor:BTNColor,alignSelf:"center",borderRadius:8}}
                                onPress={()=>{alert(1)}} />
                    </View>

                </View>
            </View>
        )
    }
}

// export default connect((state) => {
//     const {regist} = state;
//     return {
//         regist
//     }
// })(RegistView);

const styles = StyleSheet.create({
    find: {
        alignSelf: "flex-end"
    },
    page:{
        backgroundColor:BGColor,
        flex:1
    },
    container:{
        backgroundColor:"#fff",
        flex:1,
        marginTop:30,
        paddingLeft:30,
    },
    validateBtn:{
        borderColor:"#b2b2b2",
        borderWidth:1,
        padding:5,
        borderRadius:10,
        position:"absolute",
        top:60,
        right:10
    }
})
