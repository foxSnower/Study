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

