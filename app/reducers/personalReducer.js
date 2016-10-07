'use strict'
import * as types from '../actions/actionTypes'

const initialiState = {
    // 我的消费查询列表
    costList: [],
    // 我的预约列表
    orderList: [],
    // 预约详情
    orderDetail: null
}

export default function personal(state = initialiState, action = {}) {
    switch(action.type) {
        case types.COST_QUERY:
            return Object.assign({}, state, {
                costList: action.value
            })
        case types.FETCH_ORDER:
            return Object.assign({}, state, {
                orderList: action.value
            })
        case types.FETCH_ORDER_DETAIL:
            return Object.assign({}, state, {
                orderDetail: action.value
            })
        default:
            return state
    }
} 