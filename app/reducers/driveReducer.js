/**
 * Created by 楚寒 on 2016/10/3.
 */
'use strict';

import * as types from '../actions/actionTypes';

const initialState = {
    loaded: 0
};

export default function drive(state = initialState, action = {}) {

    switch (action.type) {
        case types.UPDATE_DRIVE:
            return {...state, ...action.value}; //Object.assign({}, state, action.value);
        default:

            return state
    }
}