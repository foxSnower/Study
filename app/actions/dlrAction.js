/**
 * Created by 楚寒 on 2016/10/4.
 */
import * as types from './actionTypes';
import {requestPOST} from '../utils/FetchUtil'
import {HANDLER} from '../utils/RequestURL'

import {ly_Toast} from '../utils/CommonUtil'

export function updateDlr(value) {
    return {
        type: types.UPDATE_DLR,
        value: value
    }
}

export let getCityData = () => {
    return dispatch => {
        requestPOST(
            HANDLER,
            {
                "API_CODE": "ProvincesAndCities",
                "PARAM": {}
            },
            data => {
                if(data.RESULT_CODE == '0'){
                    dispatch(updateDlr({provinceArr:data.DATA}))
                }else{
                    console.log("获取省份城市失败")
                }
            },
            err => {
                ly_Toast(err.message,2000,-20)
            }
        )
    }
}
//查询专营店
export let searchDlr = (json_param,pageIndex,listBlock) => {

    console.log(pageIndex);
    return dispatch => {

        requestPOST(
            HANDLER,
            {
                "API_CODE": 'DLR_Info',
                "PARAM": json_param,
                PAGE_SIZE: 10,
                PAGE_INDEX: pageIndex,
                SORT: "DISTANCE2 ASC"
            },
            (data) => {
                if(data.RESULT_CODE =='0'){
                    console.log(data.DATA);
                    listBlock(data.DATA)
                }else{
                    ly_Toast(data.RESULT.DESC,2000,0)
                }
            },
            (error) => {
                console.log(error)
            }
        )
    }
};
