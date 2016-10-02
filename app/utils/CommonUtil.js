/**
 * Created by DB on 16/7/20.
 */
import {
    Dimensions,
    PixelRatio,
    Platform
} from  'react-native';
import Toast from 'react-native-root-toast';

export const Debug = true;    //设置开发模式
export const GM_CALL = "400-830-8899";   //登录异常客服电话
export const Screen = Dimensions.get('window');   //获取屏幕

export const MainColor = '#825897';
export const BGColor = '#efeff4';      //app背景颜色
export const BTNColor = '#ef4f4f';     //按钮红色通用

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
