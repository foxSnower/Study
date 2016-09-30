import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native';

import {BGColor,BTNColor,Screen,pixelRation} from '../../utils/CommonUtil';
import NavBar from '../../components/DefaultNavBar';
import LabelInput from '../../components/LabelInput';
import Button from '../../components/Button';
import AgreementView from './AgreementView';

export default class RegistView extends Component{
    render(){
        return(
            <View style={styles.page}>
                <NavBar title="注册"
                         />
                <View style={styles.container}>
                <LabelInput  label="手机号"
                             labelStyle={{width:60}}
                             placeholder="请输入用户名"
                             defaultValue=""
                             max={11}
                             keyboardType="numeric"
                              >
               <button text="发送验证码"></button>
                              </LabelInput>
               <LabelInput  label="验证码"
                            labelStyle={{width:60}}
                            placeholder="请输入用户名"
                            defaultValue=""
                            max={6}
                            keyboardType="numeric"
                              />
              <LabelInput  label="密码"
                           labelStyle={{width:60}}
                           placeholder="请输入用户名"
                           defaultValue=""
                           type={true}
                           max={20}
                             />
             <LabelInput  label="确认密码"
                          labelStyle={{width:60}}
                          placeholder="请输入用户名"
                          defaultValue=""
                          type={true}
                          max={20}
                            />
            </View>
            <TouchableOpacity style={styles.find}>
                    <Text style={{marginTop:10,paddingRight:10,marginBottom:30}}>注册遇到问题,联系客服</Text>
            </TouchableOpacity>

            <Button text="注  册"
                    style={{width:Screen.width-40,backgroundColor:"#007AFF",alignSelf:"center",borderRadius:8}}
                    onPress={()=>{alert(1)}} />
            <Button text="东风日产车主APP使用协议"
                    textStyle={{color:"#666",fontWeight:"300"}}
                    style={{marginBottom:10,alignSelf:"center",backgroundColor:BGColor}}
                    onPress={()=>{
                        this.props.navigator.push({
                            component:AgreementView
                        })
                    }} />

            </View>
        )
    }
}

const styles = StyleSheet.create({
      page:{
        backgroundColor:BGColor,
      },
      container:{
        backgroundColor:"#fff",
        flex:1,
        marginTop:30,
        paddingLeft:30,
      }
})
