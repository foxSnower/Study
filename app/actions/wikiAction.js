import * as types from './actionTypes';

// utils
import {
    requestPOST
} from '../utils/FetchUtil';
import {
    HANDLER
} from '../utils/RequestURL';

export let fetchImg = (value) => {
    //在这个地方进行请求

    // requestPOST(
    //     HANDLER, {
    //         API_CODE: "GetCarSeriesIMG",
    //         PARAM: {
    //             CAR_SERIES_CODE: "T31"
    //         }
    //     },
    //     (data) => {
    //         dispatch(updateHome({
    //             myActionData: data.DATA.ACTIONS
    //         }))
    //     },
    //     (error) => {
    //
    //     }
    // )
    return {
        type: types.FETCH_IMG,
        title: value,
        value: value
    }
}

// 用车答疑
export let fetchAnswer = (value, cb) => {
    // 获取数据
    requestPOST(
            HANDLER, {
                "API_CODE": "CarAnswerType",
                "PARAM": {
                    "CARSERS_ID": "",
                    "CARTYPE_ID": "",
                    "LOOKUP_TYPE_CODE": "DB0001"
                }
            },
            (data) => {
                //alert(JSON.stringify(data["DATA"]["SHOW_OTHERCOMMON"]))
                //cb(data)
                cb({
                    type: types.FETCH_ANSWER,
                    value: data["DATA"]["SHOW_OTHERCOMMON"]
                })
            },
            (error) => {
                //alert(JSON.stringify(error))
                cb({
                    type: types.FETCH_ANSWER,
                    value: JSON.stringify(error)
                })
            }
        )
}

// 常见问题
export let fetchQuestion = (value, cb) => {
    requestPOST(
        HANDLER, {
            "API_CODE": "CarCommonList",
            "PARAM": {
                //"CARSERS_ID": "10220",
                "CARSERS_ID": value,
                "CARTYPE_ID": "0"
            }
        },
        (data) => {
            //alert(JSON.stringify(data["DATA"]["SHOW_OTHERCOMMON"]))
            //cb(data)
            cb({
                type: types.FETCH_QUESTION,
                value: data["DATA"]
            })
        },
        (error) => {
            //alert(JSON.stringify(error))
            cb({
                type: types.FETCH_ANSWER,
                value: JSON.stringify(error)
            })
        }
    )
}
