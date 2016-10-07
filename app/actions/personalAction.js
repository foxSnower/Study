import * as types from './actionTypes';
// utils
import {requestPOST} from '../utils/FetchUtil';
import {HANDLER, IMGURL} from '../utils/RequestURL';

// 消费查询，传入用户id，分为多少页，当前查询第几页，排序规则，回调
export let costQuery = (userId, pageNum, index, sort, cb)=> {
    console.log('这次请求的 index 是', index)
    requestPOST(HANDLER, {
        "API_CODE":"ComsumeList",
        "PAGE_SIZE": pageNum,
        "PAGE_INDEX": index,
        "SORT": sort,
        "PARAM":{
            "LOGIN_USER_ID": userId
        }
    }, (data) => {
        //console.log('成功的 data 数据是：',data)
        if(data["RESULT_CODE"] === '0') {
            cb({
                type: types.COST_QUERY,
                value: data["DATA"]
            })
        }else {
            cb('error')
        }
    }, (err) => {
        //console.log('失败的 error 数据是：',err)
        cb('error')
    })
}

// 我的预约
export let fetchOrder = (userId, pageSize, pageIndex, sort, cb) => {
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

// 预约详情
export let fetchOrderDetail = (orderId, cb) => {
    requestPOST(HANDLER, {
        "API_CODE":"TestDriveDetail",
        "PARAM":{
            "BOOK_CODE": orderId
        }
    }, (data) => {
        if(data["RESULT_CODE"] === '0') {
            let img = require(`${IMGURL}${data["DATA"][0]["CAR_IMAGE"]}`)
            let orderDetail = data["DATA"][0]
            orderDetail.img = img
            cb({
                type: types.FETCH_ORDER_DETAIL,
                value: orderDetail
            })
        }else {
            cb('error')
        }
    }, (err) => {
        cb('error')
    })
}
