import * as types from './actionTypes';

// utils
//import {requestPOST} from '../../utils/FetchUtil';
//import {HANDLER} from '../utils/RequestURL';

export let fetchImg = (value) => {
    //在这个地方进行请求

    // requestPOST(
    //     HANDLER, {
    //         API_CODE: "GetCarSeriesIMG",
    //         PARAM: {
    //             CAR_SERIES_CODE: "T31"
    //         }
    //     }:
    //     (data) => {
    //         dispatch(updateHome({
    //             myActionData: data.DATA.ACTIONS
    //         }))
    //     },
    //     (error) => {
    //
    //     }
    // )
    return {
        type: 'FETCH_IMG',
        title: value,
        value: value
    }
}
