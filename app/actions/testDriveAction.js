/**
 * Created by 楚寒 on 2016/10/3.
 */
import * as types from './actionTypes';
import {requestPOST} from '../utils/FetchUtil'
import {HANDLER} from '../utils/RequestURL'

import {ly_Toast} from '../utils/CommonUtil';
import UserDefaults from '../utils/GlobalStorage';


export function updateTestDrive(value) {
    return {
        type: types.UPDATE_TESTDRIVE,
        value: value
    }
}
//获取试驾车型
export function getCarTypes(callback) {
    return dispatch =>{
        requestPOST(
            HANDLER,
            {
                "API_CODE": "Car_Series",
                "PARAM": {
                    "CAR_BRAND_CODE": "",
                    "CAR_SERIES_CODE": ""
                }
            },
            (data)=>{
                callback(data.DATA)
            },
            (err)=>{
                alert(err);
                return;
            }
        )
    }
}