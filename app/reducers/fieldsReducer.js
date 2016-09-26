/**
 * Created by DB on 16/6/24.
 */
'use strict';

import * as types from '../actions/actionTypes';

export default function fields(state = {}, action = {}) {
    switch (action.type) {
        case types.UPDATE_FIELDS:
            return Object.assign({}, state, action.value);
        default:
            return state;
    }
}