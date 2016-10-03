/**
 * Created by DB on 16/9/26.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Linking,
    Geolocation
} from 'react-native';

import {connect} from 'react-redux';
import Swiper from 'react-native-swiper'
import {Screen, pixel1,Debug} from '../../utils/CommonUtil'
import {fetchAction, fetchWeatherInfo} from '../../actions/homeAction'
import CustomButton from './CustomButton'
import ActivitieListView from './ActionListView'// 用车百科
import Wiki from './Wiki/IndexView'
import DeviceInfo from 'react-native-device-info'
import UserDefaults from '../../utils/GlobalStorage'
import ActionDetailView from './ActionDetailView'
import TestDriveHomeView from '../Business/TestDriveHomeView'

//import TestDriveBook  from '../Business/TestDriveBook'

class HomeView extends Component {

    componentDidMount() {
        let deviceInfo = {};
        //本地存储的使用  通过key存下对应的值 我现在删除 这个userID
        UserDefaults.setObject('userID',{1:1111,2:22222,3:33333,4:44444});

        const {dispatch} = this.props;
        dispatch(fetchAction());
        dispatch(fetchWeatherInfo());

        if(!Debug){
            deviceInfo.DEVICE_TOKEN = DeviceInfo.getUniqueID();
            deviceInfo.OS_VERSION = DeviceInfo.getDeviceId()
            deviceInfo.MODEL = DeviceInfo.getModel();
            deviceInfo.DEVICE_TYPE = DeviceInfo.getBrand();
            deviceInfo.APP_VERSION = DeviceInfo.getVersion();
            deviceInfo.IP = "127.0.0.1";
            deviceInfo.APP_NAME = "车主APP";
            deviceInfo.MAC = "NA";
            UserDefaults.setObject('deviceInfo',deviceInfo);
        }else{
            deviceInfo.DEVICE_TOKEN = "abcdefghijklmn";
            deviceInfo.MODEL = "Android";
            deviceInfo.OS_VERSION = "Android 4.4";
            deviceInfo.DEVICE_TYPE = "小米";
            deviceInfo.APP_VERSION = "1.0.0";
            deviceInfo.IP = "127.0.0.1";
            deviceInfo.APP_NAME = "车主APP";
            deviceInfo.MAC = "NA";

            UserDefaults.setObject('deviceInfo',deviceInfo);
        }
//         console.log("Device Unique ID", DeviceInfo.getUniqueID());  // e.g. FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9
// // * note this is IDFV on iOS so it will change if all apps from the current apps vendor have been previously uninstalled
//
//         console.log("Device Manufacturer", DeviceInfo.getManufacturer());  // e.g. Apple
//
//         console.log("Device Brand", DeviceInfo.getBrand());  // e.g. Apple / htc / Xiaomi
//
//         console.log("Device Model", DeviceInfo.getModel());  // e.g. iPhone 6
//
//         console.log("Device ID", DeviceInfo.getDeviceId());  // e.g. iPhone7,2 / or the board on Android e.g. goldfish
//
//         console.log("System Name", DeviceInfo.getSystemName());  // e.g. iPhone OS
//
//         console.log("System Version", DeviceInfo.getSystemVersion());  // e.g. 9.0
//
//         console.log("Bundle ID", DeviceInfo.getBundleId());  // e.g. com.learnium.mobile
//
//         console.log("Build Number", DeviceInfo.getBuildNumber());  // e.g. 89
//
//         console.log("App Version", DeviceInfo.getVersion());  // e.g. 1.1.0
//
//         console.log("App Version (Readable)", DeviceInfo.getReadableVersion());  // e.g. 1.1.0.89
//
//         console.log("Device Name", DeviceInfo.getDeviceName());  // e.g. Becca's iPhone 6
//
//         console.log("User Agent", DeviceInfo.getUserAgent()); // e.g. Dalvik/2.1.0 (Linux; U; Android 5.1; Google Nexus 4 - 5.1.0 - API 22 - 768x1280 Build/LMY47D)
//
//         console.log("Device Locale", DeviceInfo.getDeviceLocale()); // e.g en-US
//
//         console.log("Device Country", DeviceInfo.getDeviceCountry()); // e.g US
//
//         //console.log("Timezone", DeviceInfo.getTimezone()); // e.g America/Mexico_City
//
//         console.log("App Instance ID", DeviceInfo.getInstanceID()); // ANDROID ONLY - see https://developers.google.com/instance-id/

    }

    //广告点击事件
    swiperViewClick = () =>{
        //本地存储的使用   根据key拿到数据  通过回调方法获取
        UserDefaults.setObject('userID',{});
        UserDefaults.objectForKey('userID',(data) => {
            alert(data['1']);
        })
       //
    };

    render() {

        const {home} = this.props;

        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    {this.addSwiperView(home.myActionData)}
                    {this.addOilPriceView(home.weatherInfo, home.oilInfo)}
                </View>

                {this.addBottomView()}

            </View>
        );

    }

    // Swiper的子视图布局
    addSwiperView = (images) => {

        let imageViews = [];
        images && images.map((v, k)=> {
            imageViews.push(
                <TouchableOpacity activeOpacity={0.8}
                                  style={styles.slide1}
                                  key={k}
                                  onPress={()=>{
                                      if(v.DIRECT_URL.length>5){
                                          Linking.openURL(v.DIRECT_URL);
                                      }else{
                                          // 跳转到 活动详情 带着这个参数 ACTION_CODE
                                          this.props.navigator.push({
                                              component:ActionDetailView,
                                              params:{
                                                  ACTION_CODE:v.ACTION_CODE
                                              }
                                          })
                                      }
                                  }}
                >
                    <Image style={{width: Screen.width, flex:1}}
                           resizeMode={"cover"}
                           source={{uri: v.ACT_IMAGE}}
                    />
                </TouchableOpacity>
            )
        });

        return (
            <Swiper showsButtons={false}
                    height={200}
                    loop={true}
                    autoplayTimeout={5}
                    autoplay={true}
                    dot={<View style={styles.customDot}/>}
                    activeDot={<View style={styles.customActiveDot}/>}
                    paginationStyle={{
                        bottom: 10
                    }}>
                {imageViews}
            </Swiper>
        )
    };

    //中间 石油报价
    addOilPriceView = (weatherInfo, oilInfo) => {
        let title = oilInfo ? '今日油价' : '';
        let p93 = oilInfo ? `92/93: ${oilInfo.p93}元／L` : '';
        let p97 = oilInfo ? `92/93: ${oilInfo.p97}元／L` : '';
        return (
            <View style={{flexDirection: 'row', flex: 1, backgroundColor: '#fff'}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Image style={styles.image}
                           resizeMode={"contain"}
                           source={{uri: weatherInfo && weatherInfo.weather_pic}}
                    />
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color:'#666'}}>{weatherInfo && weatherInfo.aqiDetail.area}</Text>
                        <Text style={{marginTop: 15, color:'#32B9EE'}}>{weatherInfo && weatherInfo.temperature + '°C'}</Text>
                    </View>
                </View>

                <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'#666'}}>{title}</Text>
                    <Text style={{marginTop: 8, color:'#32B9EE'}}>{p93}</Text>
                    <Text style={{marginTop: 8, color:'#32B9EE'}}>{p97}</Text>
                </View>
            </View>
        )
    };

    //底部按钮
    addBottomView = () => {
        return (
            <View style={{flex: 1, backgroundColor: '#f4f4f4', marginTop: pixel1}}>
                <View style={{flex: 3, flexDirection: 'row', backgroundColor: '#f4f4f4'}}>
                    <CustomButton style={{flex: 1, backgroundColor: '#fff'}}
                                  text="劲爆活动"
                                  image={require('../../image/icon_index_activity.png')}
                                  imageStyle={styles.imageStyle}
                                  textStyle={{marginTop:10,marginBottom:15}}
                                  onPress={() => {
                                      this.props.navigator.push({
                                          component: ActivitieListView,
                                      })
                                  }}
                    />
                    <CustomButton style={{flex: 1, backgroundColor: '#fff', marginLeft: pixel1}}
                                  text="用车百科"
                                  textStyle={{marginTop:10,marginBottom:15}}
                                  image={require('../../image/icon_index_wiki.png')}
                                  imageStyle={styles.imageStyle}
                                  onPress = {() => {
                                    this.props.navigator.push({
                                        component: Wiki
                                    })
                                  }}
                    />
                </View>
                <View style={{flex: 2, flexDirection: 'row', marginTop: pixel1, backgroundColor: '#fff'}}>
                    <CustomButton style={{flex: 1}}
                                  text="保养预约"
                                  textStyle={styles.textStyle}
                                  image={require('../../image/icon_index_maintain.png')}
                                  onPress = {() => {

                                  }}
                    />
                    <CustomButton style={{flex: 1}}
                                  text="预约驾驶"
                                  textStyle={styles.textStyle}
                                  image={require('../../image/icon_index_test.png')}
                                  onPress = {() => {
                                      this.props.navigator.push({
                                          component: TestDriveHomeView
                                      })
                                  }}
                    />
                    <CustomButton style={{flex: 1}}
                                  text="紧急救援"
                                  textStyle={styles.textStyle}
                                  image={require('../../image/icon_index_saved.png')}
                    />
                    <CustomButton style={{flex: 1}}
                                  text="我的消息"
                                  textStyle={styles.textStyle}
                                  image={require('../../image/icon_index_message.png')}
                    />
                </View>
            </View>
        )
    };

}
//this.props.navigator.push({
// component: TestDriveBook
//})
export default connect((state) => {
    const {home} = state;
    return {
        home
    }
})(HomeView);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4'
    },
    slide1: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    customDot: {
        backgroundColor: '#ccc',
        height: 1.5,
        width: 15,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2
    },

    customActiveDot: {
        backgroundColor: '#fc4806',
        height: 1.5,
        width: 15,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2
    },
    image: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
    },
    imageStyle:{
        maxWidth:80
    },
    textStyle:{
        marginTop:10,
        marginBottom:10,
        fontSize:12
    }
});
