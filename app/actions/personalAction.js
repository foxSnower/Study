import * as types from './actionTypes';
// utils
import {requestPOST} from '../utils/FetchUtil';
import {HANDLER} from '../utils/RequestURL';

// 消费查询，传入用户id，分为多少页，当前查询第几页，排序规则，回调
export let costQuery = (userId, pageNum, index, sort, cb)=> {
    requestPOST(HANDLER, {
        "API_CODE":"ComsumeList",
        "PAGE_SIZE": pageNum,
        "PAGE_INDEX": index,
        "SORT": sort,
        "PARAM":{
            "LOGIN_USER_ID": userId
        }
    }, (data) => {
        if(data["RESULT_CODE"] === '0') {
            cb({
                type: types.COST_QUERY,
                value: data["DATA"]
            })
        }else {
            cb('error')
        }
    }, (err) => {
        cb('error')
    })
}

// 我的预约
export let fetchOrder = (userId, pageSize, pageIndex, sort) => {
    requestPOST(HANDLER, {
            "API_CODE":"MyBookList",
            "PAGE_SIZE": pageSize,
            "PAGE_INDEX": pageIndex,
            "SORT": sort,
            "PARAM":{
                "LOGIN_USER_ID": userId
            }
        }, (data) => {
        if(data["RESULT_CODE"] === '0') {
            cb({
                type: types.COST_QUERY,
                value: data["DATA"]
            })
        }else {
            cb('error')
        }
    }, (err) => {
        cb('error')
    })
}
