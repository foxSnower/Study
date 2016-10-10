/**
 * Created by 楚寒 on 2016/10/8.
 */
import * as types from './actionTypes';
import {requestPOST} from '../utils/FetchUtil'
import {HANDLER} from '../utils/RequestURL'

import {ly_Toast} from '../utils/CommonUtil'
import UserDefaults from  '../utils/GlobalStorage'

export function updateCarBind(val) {
    return {
        type:types.UPDATE_CARBIND,
        value:val
    }
}

//requestPOST(
export let ReGetCarInfo = (userId) => {
    return dispatch =>{
        requestPOST(
            HANDLER,
            {
                "API_CODE": "CarInfo",
                "PAGE_SIZE": "20",
                "PAGE_INDEX": 1,
                "SORT": "BUY_DATE DESC",
                "PARAM": {
                    "LOGIN_USER_ID": userId
                }
            },
            carData => {
                if(carData.RESULT_CODE=="0"){
                    dispatch({type:"getCarInfo",value:carData.DATA})
                    UserDefaults.setObject("carInfo",carData.DATA);
                }else{
                    ly_Toast(carData.RESULT_DESC)
                }
            },
            err => {
                console.log(err)
            }
        )
    }
}


//车辆绑定
export let handleCarBind = (post_data,callback) => {
    requestPOST(
        HANDLER,
        {
            "API_CODE": "Bind_Carowner",
            "PARAM": post_data
        },
        (data)=>{
            console.log("绑定车辆", data);
            if(data.RESULT_CODE === "0") {
                callback({
                    type: types.CAR_BIND,
                    value: data.DATA[0]
                });
            }else {
                callback(JSON.stringify(data));
            }
        },
        (err)=>{
            callback(JSON.stringify(err));
        }
    )
}

