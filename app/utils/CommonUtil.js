/**
 * Created by DB on 16/7/20.
 */
import {
    Dimensions,
    PixelRatio,
    Platform
} from  'react-native';
import Toast from 'react-native-root-toast';

export const Debug = false;    //设置开发模式
export const BAIDU_MAP_KEY = 'IfMMDZYerUgh6yfc7MtKqOpCv0e4hMLd';
export const GM_CALL = "400-830-8899";   //登录异常客服电话
export const Screen = Dimensions.get('window');   //获取屏幕

export const MainColor = '#825897';
export const BGColor = '#efeff4';      //app背景颜色
export const BTNColor = '#ef4f4f';     //按钮红色通用
export const BORDERColor = '#d9d9d9';  //通用border颜色


export const pixelRation = PixelRatio.get();   //1像素的兼容处理

export const pixel1 = 1 / pixelRation;

export const PlatformiOS = Platform.OS === 'ios';

export function naviGoBack(navigator) {
    if (navigator && navigator.getCurrentRoutes().length > 1) {
        navigator.pop();
        return true;
    }
    return false;
}

export function validateMobile(tel) {    //校验手机
    if (!tel)
        return false;
    var reg = /^0?1[3|4|5|8|7][0-9]\d{8}$/;
    return reg.test(tel);
}

export function ly_Toast(msg,dur=2000,pos=20,fn=()=>{}) {
    // 20 : TOP   0 :CENTER -20 BOTTOM
    Toast.show(msg,{
        duration:dur,
        position:pos,
        onHidden:()=>{
            fn()
        }
    })
}
//设置初始化的时间
export function setDefaultTime(day = 1,stringBack = true) {
    var dd = new Date();
    dd.setDate(dd.getDate() + day);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期
    var d = dd.getDate();
    if (m < 10) m = "0" + m;
    if (d < 10) d = "0" + d;
    return  stringBack == true ? (y + '-' + m + '-' + d + ' ' + '10:00') :dd;
}
//判断时间范围
/*验证时间*/
//日期相减得到天数var now = new Date();var date = new Date('2013/04/08 12:43:45');
// 调用日期差方法，求得参数日期与系统时间相差的天数var diff = now.diff(date);
Date.prototype.diff = function (date) {
    var datediff = Math.ceil((this.getTime() - date.getTime()) / (24 * 60 * 60 * 1000));
    return datediff;
}
export function validateDateExpries(date) {
    var dateObject = new Date(date);
    dateObject = dateObject.getFullYear() > 0 ? dateObject : new Date(Date.parse(date.replace(/-/g, "/")));
    var hour = dateObject.getHours();
    var min = dateObject.getMinutes();
    var month = dateObject.getMonth() + 1;
    var day = dateObject.getDate();
    if (hour < 10) hour = "0" + hour;
    if (min < 10) min = "0" + min;
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var myDate = new Date();
    var date_s = new Date(dateObject.getFullYear() + "/" + parseInt(dateObject.getMonth() + 1) + "/" + dateObject.getDate());
    var date_m = new Date(myDate.getFullYear() + "/" + parseInt(myDate.getMonth() + 1) + "/" + myDate.getDate());
    var diff = parseInt(date_m.diff(date_s));
    return diff;
}
