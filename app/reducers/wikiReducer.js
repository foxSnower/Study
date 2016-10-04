'use strict';

import * as types from '../actions/actionTypes';
import imageObj from '../utils/imageUtil';

const initialiState = {
    title: '补缺通用',
    img: require('../image/car/big/补缺通用.jpg'),
    list: [],
    questionList: []
}

export default function wiki(state = initialiState, action = {}) {
    switch (action.type) {
        case types.FETCH_IMG:
            let resource = imageObj[action.value]
            return Object.assign({}, state, {
                title: action.title,
                img: resource
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
