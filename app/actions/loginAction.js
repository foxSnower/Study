/**
 * Created by DB on 16/6/24.
 */
import * as types from './actionTypes';
import {
    requestPOST
} from '../utils/FetchUtil'
import {
    HANDLER
} from '../utils/RequestURL'

import {
    ly_Toast
} from '../utils/CommonUtil';
import UserDefaults from '../utils/GlobalStorage';

import RegistView from '../pages/Login/RegistView';
import CarBindView from '../pages/Personal/CarBindView'
import PersonalView from '../pages/Personal/PersonalView'

import {
    Alert
} from 'react-native'
import JPush from 'jpush-react-native'

export function updateLogin(value) {
    return {
        type: types.UPDATE_LOGIN,
        value: value
    }
}
export function initIndex(cb) {
    UserDefaults.objectForKey("userInfo", userInfo => {
        if (userInfo) {
            UserDefaults.objectForKey("carInfo", carInfo => {
                // 
                //alert(JSON.stringify(carInfo));
                cb({
                    type: "initIndex",
                    value: {
                        userInfo,
                        carInfo
                    }
                });
            })
        }
    });
};
//获取车辆信息
// export let getCarInfo = (userId,callback) => {
//     requestPOST(
//         HANDLER,
//         {
//             "API_CODE": "CarInfo",
//             "PAGE_SIZE": "20",
//             "PAGE_INDEX": 1,
//             "SORT": "BUY_DATE DESC",
//             "PARAM": {
//                 "LOGIN_USER_ID": userId
//             }
//         },
//         data => {
//             if(data.RESULT_CODE == "0"){
//                 callback({
//                     type:"getCarInfo",
//                     value:data.DATA
//                 })
//             }else{
//                 ly_Toast(data.RESULT_DESC+"===");
//                 return;
//             }
//         },
//         err => {
//             console.log(err)
//         }
//     );
// }

//获取会员信息
export let getVIPInfo = (userId, callback) => {
    requestPOST(
        HANDLER, {
            "API_CODE": "MemberInfo",
            "PARAM": {
                "LOGIN_USER_ID": userId
            }
        },
        (data) => {
            if (data.RESULT_CODE == "0") {
                callback({
                    type: "getVIPInfo",
                    value: data.DATA[0]
                })
            } else {
                ly_Toast(data.RESULT_DESC);
                return;
            }
        },
        (err) => {
            ly_Toast(err.message, -20)
            return;
        }
    )
}

//获取个人信息
export let getUserInfo = (userId, callback) => {
        requestPOST(
            HANDLER, {
                "API_CODE": "OwnerInfo",
                "PARAM": {
                    "LOGIN_USER_ID": userId
                }
            },
            (data) => {
                if (data.RESULT_CODE == "0") {
                    callback({
                        type: "getUserInfo",
                        value: data.DATA[0]
                    })
                } else {
                    ly_Toast(data.RESULT_DESC);
                    return;
                }
            },
            (err) => {
                ly_Toast(err.message, -20)
                return;
            }
        )
    }
    //修改密码
export let modifyUser = (phone, valiCode, pwd) => {
        return dispatch => {
            requestPOST(
                HANDLER, {
                    "API_CODE": "Forget",
                    "PARAM": {
                        "MOBILE": phone,
                        "CUST_PASSWORD": pwd,
                        "VALIDATE_CODE": valiCode,
                    }
                },
                (data) => {
                    dispatch(updateLogin({
                        reg_mobile: "",
                        reg_pwd: "",
                        reg_repwd: ""
                    }))
                    ly_Toast(data.RESULT_DESC)
                        //alert(JSON.stringify(data))
                }
            )
        }
    }
    //注册
export let addUser = (phone, valiCode, pwd, devices) => {
    return dispatch => {
        requestPOST(
            HANDLER, {
                "API_CODE": "Regist",
                "PARAM": {
                    "MOBILE": phone,
                    "CUST_PASSWORD": pwd,
                    "USER_TYPE": "1",
                    "VALIDATE_CODE": valiCode,
                    "ATTACH_INFO": devices
                }
            },
            (data) => {
                dispatch(updateLogin({
                        reg_mobile: "",
                        reg_pwd: "",
                        reg_repwd: ""
                    }))
                    //UserDefaults.setObject("userInfo",phone)
                alert(JSON.stringify(data))
            }
        )
    }
}

//获取验证码
export let getValidateCode = (phone, reg, nav) => {
    return dispatch => {
        requestPOST(
            HANDLER, {
                "API_CODE": "Send_SMS",
                "PARAM": {
                    "LOGIN_USER_ID": "SYS",
                    "CUST_TEL": phone,
                    "REG": reg,
                    "MSG_TYPE": "1",
                    "ATTACH1": "",
                    "ATTACH2": "",
                    "ATTACH3": ""
                }
            },
            (data) => {
                let sucessMsg = data.RESULT_DESC;
                if (data.RESULT_CODE == "0") {
                    ly_Toast(sucessMsg, 3000)
                    return;
                } else if (data.RESULT_CODE == "1" && data.DATA == "已注册") {
                    ly_Toast(sucessMsg, 3000, 20, () => {
                        nav.pop();
                    })
                } else if (data.RESULT_CODE == "1" && data.DATA == "未注册") {
                    ly_Toast(sucessMsg, 3000, 20, () => {
                        nav.push({
                            component: RegistView,
                            params: {
                                regPhone: phone
                            }
                        });
                    })
                }

            }
        )
    }
}

//登录，手机、账号与 navigator
export let loginSubim = (mobile, password, cb) => {
    requestPOST(
        HANDLER, {
            "API_CODE": "LoginNew",
            "PARAM": {
                "MOBILE": mobile,
                "VALIDATE_CODE": password,
            }
        },
        (userInfoData) => {
            //console.log(userInfoData);
            if (userInfoData.RESULT_CODE == 0) {
                //登陆成功将用户信息写入缓存中
                UserDefaults.setObject("userInfo", userInfoData.DATA[0]);
                cb({
                    type: types.LOGIN,
                    value: userInfoData.DATA[0]
                });

                

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
            } else {
                /*ly_Toast(data.RESULT_DESC, 3000)
                return;*/
                cb(JSON.stringify(userInfoData));
            }
        },
        (error) => {
            // alert('登陆失败');
            // dispatch(updateLogin({
            //     'loginBtnDisabled': false,
            //     'loginBtnText': '登录'
            // }));
            cb(JSON.stringify(error));
        }
    )

};

// Carinfo 获取车辆信息
export let fetchCarInfo = (value, cb) => {
    requestPOST(HANDLER, {
        "API_CODE": "CarInfo",
        "PAGE_SIZE": "20",
        "PAGE_INDEX": 1,
        "SORT": "BUY_DATE DESC",
        "PARAM": {
            "LOGIN_USER_ID": value
        }
    }, (data) => {
        if(data.RESULT_CODE === '0') {
            UserDefaults.setObject("carInfo", data.DATA);
            cb({
                type: types.FETCH_CAR_INFO,
                value: data.DATA.CARS
            });
        }else {
            cb(JSON.stringify(data));
        }
    }, (err) => {
        cb(JSON.stringify(err));
    });
};

// 退出登录
export let logout = () => {
    return {
        type: types.LOGOUT
    };
};