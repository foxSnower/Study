/**
 * Created by 楚寒 on 2016/10/3.
 */
'use strict';

import * as types from '../actions/actionTypes';

const initialState ={

};

export default function testDrive(state = initialState,action = {}) {
    switch (action.types){
        case types.UPDATE_TESTDRIVE:
            return Object.assign({},state,action.value)
        default:
            return state
    }
}