'use strict';

import * as types from '../actions/actionTypes';
// utils
import {IMGURL} from '../utils/RequestURL';

const initialiState = {
    title: '补缺通用',
    path: `${IMGURL}/image/car/big/补缺通用.jpg`,
    list: [],
    questionList: []
}

export default function wiki(state = initialiState, action = {}) {
    switch (action.type) {
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
        default:
            return state;
    }
}
