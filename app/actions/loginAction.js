/**
 * Created by DB on 16/6/24.
 */
import * as types from './actionTypes';
import {requestPOST} from '../utils/FetchUtil'
import {HANDLER} from '../utils/RequestURL'

import Toast from 'react-native-root-toast';
import UserDefaults from '../utils/GlobalStorage';

export function updateLogin(value) {
    return {
        type: types.UPDATE_LOGIN,
        value: value
    }
}


export let loginSubim = (mobile, password) =>{
    return dispatch => {
        requestPOST(
            HANDLER,
            {
                "API_CODE": "LoginNew",
                "PARAM": {
                    "MOBILE": mobile,
                    "VALIDATE_CODE": password,
                }
            },
            (data) => {
                //alert(JSON.stringify(data))
                //在这里做你的处理  就是这样  没问题吧
                if(data.RESULT_CODE == 0){
                    //登陆成功将用户信息写入缓存中
                    UserDefaults.setObject("userInfo",data.DATA[0]);

                    // UserDefaults.setObject("LOGIN_USER_ID",data.DATA[0].LOGIN_USER_ID);   //用户ID
                    // UserDefaults.setObject("USER_TYPE",data.DATA[0].USER_TYPE);     //用户类型 1 会员 2 潜客
                    // UserDefaults.setObject("LOGIN_MOBILE",data.DATA[0].LOGIN_MOBILE);  //登陆手机
                    // UserDefaults.setObject("CUST_NO",data.DATA[0].CUST_NO);      //客户编码
                    // UserDefaults.setObject("DLR_CUST_NO",data.DATA[0].DLR_CUST_NO);   //服务顾问
                    // UserDefaults.setObject("CUST_NAME",data.DATA[0].CUST_NAME);   //客户名称
                    // UserDefaults.setObject("CUST_TEL",data.DATA[0].CUST_TEL);     //客户电话
                    // UserDefaults.setObject("GENDER",data.DATA[0].GENDER);     //性别
                    // UserDefaults.setObject("CARD_NO",data.DATA[0].CARD_NO);   //会员卡号
                    // UserDefaults.setObject("VIN",data.DATA[0].VIN);          // VIN码
                    // UserDefaults.setObject("CAR_NO",data.DATA[0].CAR_NO);    //车牌号
                    // UserDefaults.setObject("HEAD_IMAGE",data.DATA[0].HEAD_IMAGE);  //头像
                    // UserDefaults.setObject("DLR_CODE",data.DATA[0].DLR_CODE);    //专营店编码
                    // UserDefaults.setObject("DLR_SHORT_NAME",data.DATA[0].DLR_SHORT_NAME);  //专营店简称
                    // UserDefaults.setObject("DYNAMIC_KEY",data.DATA[0].DYNAMIC_KEY);   //动态参数
                }else{
                    Toast.show(data.RESULT_DESC,{
                        duration:3000
                    })
                }
            },
            (error) => {

            }
        )
    }

};