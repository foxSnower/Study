import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

import {BGColor,BTNColor,Screen,pixelRation} from '../../utils/CommonUtil';
import NavBar from '../../components/DefaultNavBar';
import  LabelInput from '../../components/LabelInput';
import Button from '../../components/Button';

export default class LoginView extends Component{

    render(){
      //iosMode returnKeyType 确认键的内容 enablesReturnKeyAutomatically 为空时禁用按钮 clearButtonMode 右侧显示删除
     //  const { label,labelStyle,textStyle,placeholder,keyboardType,inputType,max,iosMode}  = this.props;
      return(
          <View style={styles.page}>
              <NavBar title="登录"
                      rightText="注册"
                      onRightClick={()=>{alert("zhuce")}} />
              <View style={styles.container}>
                <LabelInput label="手机号"
                            labelStyle={{width:50}}
                            placeholder="请输入用户名"
                            defaultValue=""
                            max={11}
                            keyboardType="numeric"
                             />

               <LabelInput label="密码"
                           labelStyle={{width:50}}
                           textStyle={{borderBottomWidth:0}}
                           placeholder="请输入密码"
                           defaultValue=""
                           type={true}
                            />
              </View>

              <TouchableOpacity style={styles.find}>
                      <Text style={{marginTop:10,paddingRight:10,marginBottom:30}}>找回密码</Text>
              </TouchableOpacity>

              <Button text="登  录"
                      style={{width:Screen.width-40,backgroundColor:BTNColor,alignSelf:"center",borderRadius:8}}
                      onPress={()=>{alert(1)}} />
          </View>
      )
    }
}
const styles = StyleSheet.create({
      find:{
        alignSelf:"flex-end"
      },
      regist:{
        alignSelf:"flex-start"
      },
      page:{
        backgroundColor:BGColor,
      },
      container:{
        backgroundColor:"#fff",
        flex:1,
        marginTop:30,
        paddingLeft:30,
      },
      textStyle:{
      }
})
