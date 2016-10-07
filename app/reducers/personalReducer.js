'use strict';
import * as types from '../actions/actionTypes';

const initialiState = {
    // 我的消费查询列表
    costList: [],
    // 我的预约列表
    orderList: [],
    // 预约详情
    orderDetail: null,
    // 消息
    messageType: [],
    // 消息详情列表
    messageList: []
};

export default function personal(state = initialiState, action = {}) {
    switch(action.type) {
        case types.COST_QUERY:
            return Object.assign({}, state, {
                costList: action.value
            });
        // 预约
        case types.FETCH_ORDER:
            return Object.assign({}, state, {
                orderList: action.value
            });
        // 预约详情
        case types.FETCH_ORDER_DETAIL:
            return Object.assign({}, state, {
                orderDetail: action.value
            });
        // 消息
        case types.FETCH_MESSAGE:
            return Object.assign({}, state, {
                messageType: action.value.MESSAGES
            });
        // 消息详情
        case types.FETCH_MESSAGE_LIST:
            return Object.assign({}, state, {
                messageList: action.value
            });
        default:
            return state;
    }
} 