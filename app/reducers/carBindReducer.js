/**
 * Created by 楚寒 on 2016/10/8.
 */
import * as types from '../actions/carBindAction';

export default function carBind(state = {},action = {}) {
    switch (action.type){
        case types.UPDATE_CARBIND:
            return  Object.assign({},state,action.value)
        default:
            return state
    }
}