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
    Geolocation
} from 'react-native';

import {connect} from 'react-redux';
import Swiper from 'react-native-swiper'
import {Screen, pixel1} from '../../utils/CommonUtil'
import {updateHome, fetchAction, fetchWeatherInfo} from '../../actions/homeAction'
import CustomButton from './CustomButton'

class HomeView extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchAction());
        dispatch(fetchWeatherInfo());
    }

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
                                  onPress={
                                      () => {

                                      }
                                  }>
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
                    />
                    <CustomButton style={{flex: 1, backgroundColor: '#fff', marginLeft: pixel1}}
                                  text="用车百科"
                                  image={require('../../image/icon_index_wiki.png')}
                    />
                </View>
                <View style={{flex: 2, flexDirection: 'row', marginTop: pixel1, backgroundColor: '#fff'}}>
                    <CustomButton style={{flex: 1}}
                                  text="保养预约"
                                  image={require('../../image/icon_index_maintain.png')}
                    />
                    <CustomButton style={{flex: 1}}
                                  text="预约驾驶"
                                  image={require('../../image/icon_index_test.png')}
                    />
                    <CustomButton style={{flex: 1}}
                                  text="紧急救援"
                                  image={require('../../image/icon_index_saved.png')}
                    />
                    <CustomButton style={{flex: 1}}
                                  text="我的消息"
                                  image={require('../../image/icon_index_message.png')}
                    />
                </View>
            </View>
        )
    };

}

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
        marginTop: 15,
        marginBottom: 15,
    }
});