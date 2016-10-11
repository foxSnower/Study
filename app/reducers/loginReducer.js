/**
 * Created by DB on 16/6/24.
 */
'use strict';

import * as types from '../actions/actionTypes';
import { ly_Toast } from '../utils/CommonUtil'

//这里给初始值
const initialState = {
    code: 60,
    find_code:60,
    // 按钮文本
    loginBtnText: '登 录',
    loginBtnDisabled: false,
    reSendText:'发送验证码',
    reSendBtnDisabled:false,
    alreadyReg:false,
    findSendText:'发送验证码',
    findSendBtnDisabled:false,
    // 用户登录后的信息，包含车辆信息等
    userInfo: {},
    // 用户个人信息，比如地址、省会等
    userDetail: {},
    // 用户会员信息
    VIPInfo: {},
    //carInfo:{},
    cars: []
};

export default function fields(state = initialState, action = {}) {
    switch (action.type) {
        case types.UPDATE_LOGIN:
            return Object.assign({}, state, action.value);
        // 更新用户信息
        case types.UPDATE_USER_INFO:
            return Object.assign({}, state, {
                userInfo: action.value
            });
        case types.FETCH_VIP_INFO:
            return Object.assign({}, state, {
                VIPInfo: action.value
            });
        // 获取车辆信息
        case types.FETCH_CAR_INFO:
            return Object.assign({}, state, {
                cars: action.value
            });
        // 首页加载
        case types.INIT_INDEX:
            return Object.assign({}, state, {
                userInfo: action.value.userInfo,
                cars: action.value.carInfo.CARS
            });
        case types.FETCH_USER_INFO:
            return Object.assign({}, state,{
                userDetail: action.value
            });
        case "getVIPInfo":
            return Object.assign({}, state,{
                VIPInfo:action.value
            });
        case "getCarInfo":
            if(action.value === undefined){
                ly_Toast("服务器忙!",1000,-20);
                return;
            }else{
                return Object.assign({}, state,{
                    carInfo:action.value
                });
            }
        // 退出登录
        case types.LOGOUT:
            return Object.assign({}, state, {
                userInfo: {},
                cars: []
            });
        default:
            return state;
    }
}