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
                      .icon_cont {
                        width: 35px;
                        height: 40px;
                        float: left;
                        margin-right: 10px;
                      }
                      .icon_wiki_a {
                        background: url('http://14.23.175.49:880/Wap/images/icon_wiki_a.png') no-repeat center;
                        background-size: contain;
                      }
                    </style>
                  </head>
                  <body>
                    <h1 class="icon_cont icon_wiki_a"></h1>
                    ${data["DATA"][0]["ANSWER"]}
                  </body>
                </html>`
                cb({
                    type: types.FETCH_QUESTION_DETAIL,
                    value: html
                })
            }
        },
        (error) => {
            //alert(JSON.stringify(error))
        }
    )
}