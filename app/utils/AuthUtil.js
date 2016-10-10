/*
  身份认证函数，传入两个参数，第一个用户类型，第二个要跳转的组件，第三个 navigator，用来跳转
  只能实现判断用户是否登录、是否绑定车辆，如果没有登录就跳转到登录页面
  如果没有绑定车辆就跳转到绑定车辆页面。
 */
"use strict";
import {
    Alert
} from 'react-native';
// page component
import LoginView from '../pages/Login/LoginView';
import CarBindView from '../pages/Personal/CarBindView';

// 
export default function auth(type, component, navigator) {
  if(type === "2") {
    // 用户登录且已经绑定车辆，直接跳转
    navigator.push({
      component: component
    });
  }else if(type === "1" || type === "3") {
    // 用户已经登录，但是没有绑定车辆
    Alert.alert("温馨提示", "您还未绑定车辆，是否现在进行绑定？", [
      {"text": "取消", onPress: ()=>{
        return;
      }},
      {"text": "确定", onPress: ()=>{
        navigator.push({
          component: CarBindView
        });
      }}
    ]);
  }else {
    // 处理用户没有登录，userInfo 为空的情况
    Alert.alert("温馨提示", "您还未登录，是否现在进行登录？", [
      {"text": "确定", onPress: ()=>{
        navigator.push({
          component: LoginView
        });
      }},
      {"text": "取消", onPress: ()=>{
        return;
      }}
    ]);
  }
}