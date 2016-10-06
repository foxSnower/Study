/**
 * Created by 楚寒 on 2016/10/6.
 */
import * as types from '../actions/bookAction';

export default function book(state = {},action = {}) {
    switch (action.type){
        case types.UPDATE_BOOK:
          return  Object.assign({},state,action.value)
        default:
            return state
    }
}