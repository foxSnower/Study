'use strict';
import * as types from './actionTypes';
// utils
import {requestPOST} from '../utils/FetchUtil';
import {HANDLER, IMGURL} from '../utils/RequestURL';

// 获取用户头像
export let fetchAvatar = (source)=> {
    return {
        type: types.FETCH_AVATAR,
        value: source
    };
};
// 修改头像 
export let changeAvatar = (source)=> {
    return {
        type: types.CHANGE_AVATAR,
        value: source
    };
};

//车辆解绑
export let handleCarUnbind = (userId,callback) => {
    requestPOST(HANDLER, {
        "API_CODE": "Carowner_Release",
        "PARAM": {
            "LOGIN_USER_ID": userId
        }
    }, (data) => {
        if(data["RESULT_CODE"] === '0') {
            callback({
                type: "carUnbind"
            });
        }else {
            alert(data["RESULT_DESC"])
            // alert("解绑失败")
        }
    }, (err) => {
        console.log(err);
    });
}
// 获取积分
export let fetchScores = (userId, cb)=> {
     requestPOST(HANDLER, {
        "API_CODE":"MyScores",
        "PARAM":{
            "LOGIN_USER_ID": userId
        }
    }, (data) => {
        console.log(data);
        if(data["RESULT_CODE"] === '0') {
            cb({
                type: types.FETCH_SCORES,
                value: data.DATA[0]
            });
        }else {
            cb('error');
        }
    }, (err) => {
        console.log(err);
        cb('error');
    });
}

// 消费查询，传入用户id，分为多少页，当前查询第几页，排序规则，回调
export let costQuery = (userId, pageSize, index, cb)=> {
    console.log('这次请求的 index 是', index);
    requestPOST(HANDLER, {
        "API_CODE":"ComsumeList",
        "PAGE_SIZE": pageSize,
        "PAGE_INDEX": index,
        "SORT": 'TRANS_TIME DESC',
        "PARAM":{
            "LOGIN_USER_ID": userId
        }
    }, (data) => {
        console.log('成功的 data 数据是：',data);
        if(data["RESULT_CODE"] === '0') {
            cb({
                type: types.COST_QUERY,
                value: data["DATA"]
            });
        }else {
            cb('error');
        }
    }, (err) => {
        console.log('失败的 error 数据是：',err);
        cb('error');
    });
};

// 我的预约
export let fetchOrder = (userId, pageSize, pageIndex, cb) => {
    requestPOST(HANDLER, {
        "API_CODE":"MyBookList",
        "PAGE_SIZE": pageSize,
        "PAGE_INDEX": pageIndex,
        "SORT":"BILL_TIME DESC",
        "PARAM":{
            "LOGIN_USER_ID": userId
        }
    }, (data) => {
        console.log('成功的 data 数据是：',data);
        if(data["RESULT_CODE"] === '0') {
            cb({
                type: types.FETCH_ORDER,
                value: data["DATA"]
            });
        }else {
            cb('error');
        }
    }, (err) => {
        console.log('失败的 error 数据是：',err);
        cb('error');
    });
};

// 预约详情
export let fetchOrderDetail = (orderId, cb) => {
    requestPOST(HANDLER, {
        "API_CODE":"TestDriveDetail",
        "PARAM":{
            "BOOK_CODE": orderId
        }
    }, (data) => {
        if(data["RESULT_CODE"] === '0') {
            let img = `${IMGURL}${data["DATA"][0]["CAR_IMAGE"]}`;
            let orderDetail = data["DATA"][0];
            orderDetail.img = img;
            cb({
                type: types.FETCH_ORDER_DETAIL,
                value: orderDetail
            });
        }else {
            cb('error');
        }
    }, (err) => {
        cb('error');
    });
};

// 我的消息
export let fetchMessage = (userId, cb)=> {
    requestPOST(HANDLER, {
        "API_CODE":"FetchMessage",
        "PARAM":{
            "LOGIN_USER_ID": userId
        }
    }, (data) => {
        if(data["RESULT_CODE"] === '0') {
            cb({
                type: types.FETCH_MESSAGE,
                value: data.DATA
            });
        }else {
            cb('error');
        }
    }, (err) => {
        cb('error');
    });
};

// 消息详情
export let fetchMessageList = (type, userId, cb)=> {
    requestPOST(HANDLER, {
        "API_CODE": type,
        "PARAM":{
            "LOGIN_USER_ID": userId
        }
    }, (data) => {
        console.log(data)
        if(data["RESULT_CODE"] === '0') {
            cb({
                type: types.FETCH_MESSAGE_LIST,
                value: data.DATA.MESSAGES
            });
        }else if(data.RESULT_CODE === '1' && data.DATA.MESSAGES.length === 0) {
            // 调接口成功，但是没有数据的情况
            cb({
                type: types.FETCH_MESSAGE_LIST,
                value: []
            });
        }else {
            cb('error');
        }
    }, (err) => {
        cb('error');
    });
};

// 意见反馈上传图片
export let addImage = (obj)=> {
    return {
        type: types.ADD_IMAGE,
        value: obj
    };
};
// 意见反馈删除图片
export let deleteImage = (index)=> {
    return {
        type: types.DELETE_IMAGE,
        value: index
    };
};
// 意见反馈提交

export let submitSuggest = (submitContent, userId, cb)=> {
    requestPOST(HANDLER, {
        "API_CODE":"FeedBack",
        "PARAM":{
            "USER_ID": userId,
            "DEVICE_TYPE": submitContent.deviceModel,
            "OS_VERSION": submitContent.deviceOs,
            "FB_TYPE": submitContent.type,
            "FB_CONTENTS": submitContent.content,
            "DEVICE_NAME": submitContent.deviceName,
            "ATTACHS": submitContent.imgList
        }
    }, (data) => {
        if(data.RESULT_CODE === '0') {
            // 提交成功
            cb({
                type: types.SUBMIT_SUGGEST,
                value: submitContent
            });
        }else {
            cb(data);
        }
    }, (err) => {
        cb(err);
    });
};