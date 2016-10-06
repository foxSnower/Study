import * as types from './actionTypes';

// utils
import {
    requestPOST
} from '../utils/FetchUtil';
import {
    HANDLER
} from '../utils/RequestURL';
import {
    IMGURL
} from '../utils/RequestURL';

// Carinfo 获取车辆信息
export let fetchCarInfo = (value, cb) => {
        requestPOST(HANDLER, {
            "API_CODE": "CarInfo",
            "PARAM": {
                "LOGIN_USER_ID": value
            }
        }, (data) => {
            if(data["RESULT_CODE"] === '0') {
                console.log('fetchCarInfo success')
                cb({
                    type: types.FETCH_CAR_INFO,
                    value: {
                        car: data["DATA"]["CARS"][0]
                    }
                })
            }
        }, (err) => {
            cb(err)
        })
    }
    // GetCarSeriesIMG 获取用车百科顶部图片
export let fetchImg = (value, cb) => {
    //在这个地方进行请求
    requestPOST(
        HANDLER, {
            API_CODE: "GetCarSeriesIMG",
            PARAM: {
                CAR_SERIES_CODE: value
            }
        },
        (data) => {
            cb({
                type: types.FETCH_IMG,
                path: IMGURL + data["DATA"][0]["CAR_BIG_IMAGE"],
                title: data["DATA"][0]["CAR_SERIES_NAME"] + data["DATA"][0]["CAR_SERIES_CODE"]
            })
        },
        (error) => {
            cb(error)
        }
    )
}

// CarAnswerType 获取用车答疑页面数据
export let fetchAnswer = (value, cb) => {
        // 获取数据
        requestPOST(
            HANDLER, {
                "API_CODE": "CarAnswerType",
                "PARAM": {
                    "CARSERS_ID": value,
                    "CARTYPE_ID": "",
                    "LOOKUP_TYPE_CODE": "DB0001"
                }
            },
            (data) => {
                //alert(JSON.stringify(data["DATA"]["SHOW_OTHERCOMMON"]))
                //cb(data)
                if (data["RESULT_CODE"] === "0") {
                    cb({
                        type: types.FETCH_ANSWER,
                        value: data["DATA"]["SHOW_OTHERCOMMON"]
                    })
                } else {
                    cb({
                        value: 'error'
                    })
                }
            },
            (error) => {
                //alert(JSON.stringify(error))
                cb({
                    type: types.FETCH_ANSWER,
                    value: error
                })
            }
        )
    }
    // 用车答疑页面搜索接口
export let searchQuestion = (value, cb) => {
        requestPOST(HANDLER, {
                "API_CODE": "CarSearch",
                "PARAM": {
                    "QUES_TITLE": value
                }
            },
            (data) => {
                console.log(data)
                cb({
                    type: types.SEARCH_QUESTION,
                    value: data["DATA"]
                })
            },
            (error) => {
                console.log(error)
                cb({
                    value: error
                })
            }
        )
    }
    // 常见问题
export let fetchQuestion = (id, type, cb) => {
    requestPOST(HANDLER, {
            "API_CODE": "CarUNCommonList",
            "PARAM": {
                "CARSERS_ID": id,
                "QUES_TYPE": type
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

// 查询问题详情
export let fetchQuestionDetail = (value, cb) => {
    requestPOST(HANDLER, {
            "API_CODE":"CarAnswerInfo",
            "PARAM":{
                "QUES_AND_CARTYPE_ID": value
            }
        },
        (data) => {
            console.log(data)
            if(data["RESULT_CODE"] === '0') {
                let html = `<html>
                  <head>
                    <style>
                        img {
                            width: 100%;
                        }
                    </style>
                  </head>
                  <body>
                    ${data["DATA"][0]["ANSWER"]}
                  </body>
                </html>`
                cb({
                    type: types.FETCH_QUESTION_DETAIL,
                    value: {
                        html,
                        quesTitle: data["DATA"][0]["QUES_TITLE"]
                    }
                })
            }
        },
        (error) => {
            //alert(JSON.stringify(error))
        }
    )
}

// 获取纯正备件
export let fetchReplacement = (value, cb)=> {
    requestPOST(HANDLER, {
            "API_CODE":"PureSparePartsList",
            "PARAM":{
            }
        },
        (data) => {
            console.log(data)
            if(data["RESULT_CODE"] === '0') {
                cb({
                    type: types.FETCH_REPLACEMENT,
                    value: data["DATA"]
                })
            }
        },
        (error) => {
            //alert(JSON.stringify(error))
        }
    )
}
// 获取纯正备件详情
export let fetchReplacementDetail = (value, cb)=> {
    requestPOST(HANDLER, {
            "API_CODE":"PureSparePartsInfo",
            "PARAM":{
                "PURE_CONFIG_PROP_ID":value
            }
        },
        (data) => {
            if(data["RESULT_CODE"] === '0') {
                cb({
                    type: types.FETCH_REPLACEMENT_DETAIL,
                    value: data["DATA"][0]
                })
            }
        },
        (error) => {
            //alert(JSON.stringify(error))
        }
    )
}
