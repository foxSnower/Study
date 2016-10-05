'use strict';

import * as types from '../actions/actionTypes';
// utils
import {IMGURL} from '../utils/RequestURL';

const initialiState = {
    car: null,
    title: '补缺通用',
    path: `${IMGURL}/image/car/big/补缺通用.jpg`,
    list: [],
    questionList: [],
    // 搜索框
    searchText: '',
    html: ''
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
            return Object.assign({}, state, {
                html: action.value
            })
        default:
            return state;
    }
}
