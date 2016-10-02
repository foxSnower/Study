/**
 * Created by DB on 16/6/24.
 */
'use strict';

import * as types from '../actions/actionTypes';

//这里给初始值
const initialState = {
    code: 60,
    find_code:60,
    loginBtnText: '登 录',
    reSendText:'发送验证码',
    reSendBtnDisabled:false,
    loginBtnDisabled: false,
    alreadyReg:false,
    findSendText:'发送验证码',
    findSendBtnDisabled:false,
};

export default function fields(state = initialState, action = {}) {
    switch (action.type) {
        case types.UPDATE_LOGIN:
            return Object.assign({}, state, action.value);
        default:
            return state;
    }
}