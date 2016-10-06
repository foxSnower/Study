'use strict';

import * as types from '../actions/actionTypes';
// utils
import {IMGURL} from '../utils/RequestURL';

const initialiState = {
    car: null,
    title: '补缺通用',
    path: `${IMGURL}/image/car/big/补缺通用.jpg`,
    list: [],
    // 常见问题列表
    questionList: [],
    // 搜索框
    searchText: '',
    quesTitle: '',
    html: '',
    // 纯正备件列表
    replacementList: [],
    // 纯正备件详情
    replacementDetail: null
}

export default function wiki(state = initialiState, action = {}) {
    switch (action.type) {
        case types.FETCH_CAR_INFO:
            return Object.assign({}, state, action.value)
        case types.FETCH_IMG:
            return Object.assign({}, state, {
                path: action.path,
                title: action.title
            });
        case types.FETCH_ANSWER:
            return Object.assign({}, state, {
              list: action.value
            })
        case types.FETCH_QUESTION:
            return Object.assign({}, state, {
              questionList: action.value
            })
        // 搜索问题
        case types.SEARCH_QUESTION:
            return Object.assign({}, state, {
              questionList: action.value
            })
        case types.FETCH_QUESTION_DETAIL:
            return Object.assign({}, state, action.value)
        // 纯正备件列表
        case types.FETCH_REPLACEMENT:
            return Object.assign({}, state, {
                replacementList: action.value
            })
        // 纯正备件详情
        case types.FETCH_REPLACEMENT_DETAIL:
            return Object.assign({}, state, {
                replacementDetail: action.value
            })
        default:
            return state;
    }
}
