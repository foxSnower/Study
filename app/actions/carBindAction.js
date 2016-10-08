/**
 * Created by 楚寒 on 2016/10/8.
 */
import * as types from './actionTypes';
import {requestPOST} from '../utils/FetchUtil'
import {HANDLER} from '../utils/RequestURL'

import {ly_Toast} from '../utils/CommonUtil'

export function updateCarBind(val) {
    return {
        type:types.UPDATE_CARBIND,
        value:val
    }
}

//车辆绑定
export let handleCarBind = (post_data,callback) => {
    return dispatch =>{
        requestPOST(
            HANDLER,
            {
                "API_CODE": "Bind_Carowner",
                "PARAM": post_data
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

