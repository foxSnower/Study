/**
 * Created by DB on 16/6/24.
 */
'use strict';

import * as types from '../actions/actionTypes';

const initialState = {
    actionList: [],
    actionDetail:[],
};

export default function home(state = initialState, action = {}) {
    switch (action.type) {
        case types.UPDATE_HOME:
            return {...state, ...action.value}; //Object.assign({}, state, action.value);
        default:
            return state;
    }
}
