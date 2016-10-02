'use strict';

import * as types from '../actions/actionTypes';
import imageObj from '../utils/imageUtil';

const initialiState = {
    title: '补缺通用',
    img: require('../image/car/big/补缺通用.jpg')
}

export default function wiki(state = initialiState, action = {}) {
    switch (action.type) {
        case types.FETCH_IMG:
            var resource = imageObj[action.value]
            return Object.assign({}, state, {
                title: action.title,
                img: resource
            })
        default:
            return state;
    }
}
