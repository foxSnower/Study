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
    loginBtnText: '登 录',
    reSendText:'发送验证码',
    reSendBtnDisabled:false,
    loginBtnDisabled: false,
    alreadyReg:false,
    findSendText:'发送验证码',
    findSendBtnDisabled:false,
    userInfo:{},
    VIPInfo:{},
    carInfo:{}
};

export default function fields(state = initialState, action = {}) {
    switch (action.type) {
        case types.UPDATE_LOGIN:
            return Object.assign({}, state, action.value);
        case "getUserInfo":
            return Object.assign({}, state,{
                userInfo:action.value
            })
        case "getVIPInfo":
            return Object.assign({}, state,{
                VIPInfo:action.value
            })
        case "getCarInfo":
            if(action.value == undefined){
                ly_Toast("服务器忙!",1000,-20)
                return
            }else{
                return Object.assign({}, state,{
                    carInfo:action.value
                })
            }

        default:
            return state;
    }
}