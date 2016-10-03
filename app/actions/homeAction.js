/**
 * Created by DB on 16/6/24.
 */
import * as types from './actionTypes';
import {requestPOST} from '../utils/FetchUtil'
import {HANDLER} from '../utils/RequestURL'

export function updateHome(value) {
    return {
        type: types.UPDATE_HOME,
        value: value
    }
}

//首页头部活动接口数据
export let fetchAction = () => {

    return dispatch => {

        requestPOST(
            HANDLER,
            {
                "API_CODE": "FetchMessage",
                "PARAM": {"LOGIN_USER_ID": "NA"},
                "PAGE_SIZE": 10,
                "PAGE_INDEX": 1,
                "SORT": "ACT_ORDER ASC,act_start_time DESC"
            },
            (data) => {
                dispatch(updateHome({myActionData: data.DATA.ACTIONS}))
            },
            (error) => {

            }
        )
    }

};


//获取天气数据
export let fetchWeatherInfo = () => {

    return dispatch => {

        navigator.geolocation.getCurrentPosition(
            (position) => {

                requestPOST(
                    HANDLER,
                    {
                        "API_CODE": 'GetWeatherInfo',
                        "param": {
                            "LNG": Math.abs(position.coords.longitude).toString(),
                            "LAT": Math.abs(position.coords.latitude).toString()
                        }
                    },
                    (data) => {
                        dispatch(fetchOilInfo(data.DATA.showapi_res_body.cityInfo.c7));
                        dispatch(updateHome({weatherInfo: data.DATA.showapi_res_body.now}))
                    },
                    (error) => {
                        console.log(JSON.stringify(error))
                    }
                )
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );

    }

};

//获取油价数据
export let fetchOilInfo = (provive) => {

    return dispatch => {

        requestPOST(
            HANDLER,
            {
                "API_CODE": "GetOilInfo",
                "param": {
                    "PROVINCE": provive
                }
            },
            (data) => {
                dispatch(updateHome({oilInfo: data.DATA.showapi_res_body.list[0]}));
            },
            (error) => {

            }
        )
    }

};

//获取活动图 我这里有例子啊 没注意看... 对付异步的 我就喜欢这样 回调还有其他方法 在本地存储我也是用的回调方法
export let fetchActionList = (pageIndex, listBlock) => {

    return dispatch => {

        requestPOST(
            HANDLER,
            {
                "API_CODE":"NewCampaignList",
                "PARAM":{},
                "PAGE_SIZE":5,
                "PAGE_INDEX":pageIndex,
                "SORT":"to_number(ACT_ORDER) ASC,act_start_time DESC"
            },
            (data) => {
               // dispatch(updateHome({actionList: data.DATA}));
                listBlock(data.DATA);
                console.log(111);
            },
            (error) => {
                console.log(error)
            }
        )
    }

};

//获取详情
export let fetchActionDetail = (actionCode,actionData)=>{
    return dispatch => {
        requestPOST(
            HANDLER,
            {
                "API_CODE": "CampaignDetail",
                "PARAM": {
                    ACTION_CODE: actionCode
                }
            },
            (data) => {
                actionData(data.DATA[0]);
                dispatch(updateHome({actionDetail: data.DATA[0]}));
                //alert(JSON.stringify(data.DATA))
            },
            (error) => {
                console.log(error)
            }
        )
    }
}
