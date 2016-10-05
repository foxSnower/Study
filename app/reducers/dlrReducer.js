/**
 * Created by 楚寒 on 2016/10/4.
 */
import * as types from '../actions/actionTypes';

const initialState = {
    loaded: false,
    province_name: "北京",
    province_id: "1",
    cityArr: [],
    provinceArr: [],
    city_name: "北京",
    city_id: "20001",

};

export default function home(state = initialState, action = {}) {
    switch (action.type) {
        case types.UPDATE_DLR:
            return {...state, ...action.value}; //Object.assign({}, state, action.value);
        default:
            return state;
    }
}