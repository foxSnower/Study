/**
 * Created by 楚寒 on 2016/10/3.
 */
import * as types from './actionTypes';
import {requestPOST} from '../utils/FetchUtil'
import {HANDLER} from '../utils/RequestURL'

import {ly_Toast} from '../utils/CommonUtil';
import UserDefaults from '../utils/GlobalStorage';

export function updateDrive(value) {
    return {
        type: types.UPDATE_DRIVE,
        value: value
    }
}

//试驾预约
export let testDrive = (userId,custName,tel,dlrCode,bookTime,carSeriesCode,saCode) => {
    return dispatch => {
        requestPOST(
            HANDLER,
            {
                "API_CODE": "TestDriveBook",
                "PARAM": {
                    LOGIN_USER_ID: userId,
                    CUST_NAME: custName,
                    CUST_TEL: tel,
                    DLR_CODE: dlrCode,
                    BOOK_TIME: bookTime,
                    CAR_SERIES_CODE: carSeriesCode,
                    SA_CODE: saCode
                }
            }     ,
            data => {
                console.log(data);
            },
            err => {
                console.log(err);
            }
        )
    }
}

//获取试驾车型
export let getCarTypes = ()=> {

    return dispatch => {

        requestPOST(
            HANDLER,
            {
                "API_CODE": "Car_Series",
                "PARAM": {
                    "CAR_BRAND_CODE": "",
                    "CAR_SERIES_CODE": ""
                }
            },
            (data)=> {

                if (data.DATA.length > 0) {
                    dispatch(updateDrive(dataMetalWork(data.DATA)));
                    setTimeout(function () {
                        dispatch(updateDrive({loaded: 1}))
                    },1000)

                } else {
                    setTimeout(function () {
                        dispatch(updateDrive({loaded: 1}))
                        ly_Toast("暂无数据")
                    },1000)
                }

            },
            (err)=> {
                dispatch(updateDrive({loaded: 2}));
            }
        )
    }
}
//获取点评数据
export let getCommentList = (code,pageIndex,listCallBack)=>{
    return dispatch =>{
        requestPOST(
            HANDLER,
            {
                "API_CODE": "TestDriveReviewList",
                "PARAM": {
                    CAR_SERIES_CODE: code
                },
                "PAGE_SIZE": 5,
                "PAGE_INDEX": pageIndex,
                "SORT": " CREATED_DATE DESC"
            },
            (data)=>{
                listCallBack(data);
            },
            (err)=>{
                alert(err.message)
                ly_Toast(err.message,2000,-20);
            }
        )
    }
}

//拼接数据
dataMetalWork = (dataArr)=> {
    let qichen = [], richan = [], carGroupName = [];
    dataArr.map((v,k) => {
        carGroupName.push(v.BODY_STRUCTURAL);
        v.CAR_SERIESS.map((carV,carK)=>{
            if (carV.CAR_BRAND_CODE == '1') {
                richan.push(carV);
            } else {
                qichen.push(carV);
            }
        })
    });

    let qichenDic = {};
    carGroupName.map((groupV,groupK) => {
        let qicheMinArr = [], isGetInto = false;
        qichen.map((v,k)=>{
            if(v.BODY_STRUCTURAL == groupV){
                isGetInto = true;
                qicheMinArr.push(v);
            }
        });
        if (isGetInto) {
            qichenDic[groupV] = qicheMinArr;
        }

    });

    let richanDic = {};
    carGroupName.map((groupV,groupK) => {
        let richanMinArr = [], isGetInto = false;
        richan.map((v,k)=>{
            if(v.BODY_STRUCTURAL == groupV){
                isGetInto = true;
                richanMinArr.push(v);
            }
        });
        if (isGetInto) {
            richanDic[groupV] = richanMinArr;
        }

    });

    return {qichenDic, richanDic};

};


// let qichenArr = [];
// carGroupName.map((groupV,groupK) => {
//     let qichenDic = {}, qichenMinArr = [], isGetInto = false;
//     qichen.map((v,k)=>{
//         if(v.BODY_STRUCTURAL == groupV){
//             isGetInto = true;
//             qichenDic['BODY_STRUCTURAL'] = groupV;
//             qichenMinArr.push(v);
//             qichenDic['arr'] = qichenMinArr;
//         }
//     });
//     if (isGetInto) {
//         qichenArr.push(qichenDic)
//     }
// });


// let richanArr = [];
// carGroupName.map((groupV,groupK) => {
//     let richanDic = {}, richanMinArr = [], isGetInto = false;
//     richan.map((v,k)=>{
//         if(v.BODY_STRUCTURAL == groupV){
//             isGetInto = true;
//             richanDic['BODY_STRUCTURAL'] = groupV;
//             richanMinArr.push(v);
//             richanDic[groupV] = richanMinArr;
//         }
//     });
//     if (isGetInto) {
//         richanArr.push(richanDic)
//     }
//
// });

// splitByCarBrandCode = (carTypesData)=> {
//     let qichen = [], richan = [];
//     for (let i = 0, len = carTypesData.length; i < len; i++) {
//         var arrCar = {};
//         if (carTypesData[i].CAR_SERIESS.length > 0) {
//             for (let j = 0, len = carTypesData[i].CAR_SERIESS.length; j < len; j++) {
//                 arrCar["group"] = carTypesData[i].BODY_STRUCTURAL;
//                 if (carTypesData[i].CAR_SERIESS[j].CAR_BRAND_CODE == "1") {   //日产车系数组
//                     arrCar["CAR_IMAGE"] = carTypesData[i].CAR_SERIESS[j].CAR_IMAGE.substring(1);
//                     arrCar["CAR_SERIES_CN"] = carTypesData[i].CAR_SERIESS[j].CAR_SERIES_CN;
//                     arrCar["ATTENTION_RATE"] = carTypesData[i].CAR_SERIESS[j].ATTENTION_RATE;
//                     arrCar["MIN_GRUID_PRICE"] = carTypesData[i].CAR_SERIESS[j].MIN_GRUID_PRICE
//                     arrCar["MAX_GRUID_PRICE"] = carTypesData[i].CAR_SERIESS[j].MAX_GRUID_PRICE
//                     richan.push(arrCar);
//                 } else if (carTypesData[i].CAR_SERIESS[j].CAR_BRAND_CODE == "2") {  //启辰车系数组
//                     arrCar["CAR_IMAGE"] = carTypesData[i].CAR_SERIESS[j].CAR_IMAGE.substring(1);
//                     arrCar["CAR_SERIES_CN"] = carTypesData[i].CAR_SERIESS[j].CAR_SERIES_CN;
//                     arrCar["ATTENTION_RATE"] = carTypesData[i].CAR_SERIESS[j].ATTENTION_RATE;
//                     arrCar["MIN_GRUID_PRICE"] = carTypesData[i].CAR_SERIESS[j].MIN_GRUID_PRICE
//                     arrCar["MAX_GRUID_PRICE"] = carTypesData[i].CAR_SERIESS[j].MAX_GRUID_PRICE
//                     qichen.push(arrCar);
//
//                 }
//                 arrCar = {};
//             }
//
//         }
//     }
//     return {qichen, richan}
// };