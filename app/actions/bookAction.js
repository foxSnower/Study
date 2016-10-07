/**
 * Created by 楚寒 on 2016/10/6.
 */
import * as types from './actionTypes';
import {requestPOST} from '../utils/FetchUtil'
import {HANDLER} from '../utils/RequestURL'

import {ly_Toast} from '../utils/CommonUtil'

export function updateBook(val) {
    return {
        type:types.UPDATE_BOOK,
        value:val
    }
}

//获取当前地理位置信息
export let getCurrentLocatiom = (callback) => {
    return dispatch => {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                requestPOST(
                    HANDLER,
                    {
                        API_CODE : 'DLR_Info',
                        PARAM : {
                            LNG : Math.abs(position.coords.longitude).toString(),
                            LAT : Math.abs(position.coords.latitude).toString(),
                        },
                        PAGE_SIZE : 5,
                        PAGE_INDEX : 1,
                        SORT : "DISTANCE2 ASC"
                    },
                    (data) => {
                        //alert(JSON.stringify(data.DATA[0]))
                        callback({dlrInfo:data.DATA[0],lng:Math.abs(position.coords.longitude).toString(),lat:Math.abs(position.coords.latitude).toString()})
                    },
                    (error) => {
                        ly_Toast(error.message,1000,-20);
                    }
                )
            },
            (error) => {
                ly_Toast(error.message,1000,-20)
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );

    }
}

//查询检查更换信息
export let checkCarInfo = (carSeriesCode,dlrCode,mileItem,callback) => {
    return dispatch =>{
        requestPOST(
            HANDLER,
            {
                "API_CODE": "KeepfitBookInfo",
                "PARAM": {
                    "CAR_SERIES_CODE": carSeriesCode,
                    "DLR_CODE": dlrCode,
                    "MILE_NAME": mileItem
                }
            },
            (data)=>{
                callback(data);
            },
            (err)=>{
                console.log(err);
            }
        )
    }
}

//维修预约接口
export let handleRepairBook = (post_json,callback) => {
    alert(JSON.stringify(post_json))
    return dispatch => {
        requestPOST(
            HANDLER,
            {
                "API_CODE": "RepairBook",
                "PARAM": post_json
            },
            (data)=>{
                console.log(data);
                callback(data);
            },
            (err)=>{
                console.log(err);
            }
        )
    }

}

//代办预约接口
export let handleCommissionBook = (post_json,callback) => {
    return dispatch => {
        requestPOST(
            HANDLER,
            {
                "API_CODE": "AgentBook",
                "PARAM": post_json
            },
            (data)=>{
                console.log(data);
                callback(data);
            },
            (err)=>{
                console.log(err);
            }
        )
    }
}

//根据专营名称和编码获取代办业务信息
export let getCommissionInfo = ( dlrCode , dlrName , callback) => {
    return dispatch => {
        requestPOST(
            HANDLER,
            {
                "API_CODE": "AgentServices",
                "PARAM": {
                    "DLR_CODE": dlrCode,
                    "DLR_NAME": dlrName
                }
            },
            (data)=>{
                console.log(data);
                callback(data);
            },
            (err)=>{
                console.log(err);
            }
        )
    }
}

//保养预约
export let handleMaintainBook = (ly_app_user_id,_custName,_custTel,_vin,_car_no,_card_no,_dlrCode,_maintainMileage,_bookTime,callback) => {
    return dispatch =>{
        requestPOST(
            HANDLER,
            {
                "API_CODE": "KeepfitBook",
                "PARAM": {
                    "LOGIN_USER_ID": ly_app_user_id,
                    "CUST_NAME": _custName,
                    "CUST_TEL": _custTel,
                    "VIN": _vin,
                    "CAR_NO": _car_no,
                    "CARD_NO": _card_no,
                    "CAR_TYPE_CODE": "NA",
                    "DLR_CODE": _dlrCode,
                    "BOOK_TIME": _bookTime,
                    "CA_CODE": "NA",
                    "MILEAGE": _maintainMileage,
                    "PACKAGE_CODE": "NA"
                }
            },
            (data)=>{
                console.log(data);
                callback(data);
            },
            (err)=>{
                console.log(err);
            }
        )
    }
};

//排除法测试代码
export let testBook = (ly_app_user_id,_custName,_custTel,_vin,_car_no,callback) => {
    return dispatch =>{
        callback(123);
        console.log(ly_app_user_id,_custName,_custTel,_vin,_car_no)
    }
};

