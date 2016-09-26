/**
 * Created by DB on 16/9/26.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import Swiper from 'react-native-swiper'
import {requestPOST} from '../../utils/FetchUtil'
import {HANDLER} from '../../utils/RequestURL'
import {Screen, pixel1} from '../../utils/CommonUtil'
import {updateFields} from '../../actions/rootAction'
import CustomButton from './CustomButton'

export default class MyView extends Component {


    componentDidMount() {

        requestPOST(
            HANDLER,
            {
                "API_CODE": "FetchMessage",
                "PARAM": {"LOGIN_USER_ID": "NA"},
                "PAGE_SIZE": 10,
                "PAGE_INDEX": 1,
                "SORT": "ACT_ORDER ASC,act_start_time DESC"
            },
            (data) => {
                console.log(data.DATA.ACTIONS);
                const {dispatch} = this.props;
                dispatch(updateFields({myActionData: data.DATA.ACTIONS}))

            },
            (error) => {

            }
        )
    }

    render() {

        const {fields} = this.props;

        return (
            <View style={styles.container}>
                <View style={{flex:1}}>
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

                        {this.addSwiperImageView(fields.myActionData)}

                    </Swiper>

                    {this.addOilPriceView()}
                </View>

                {this.addBottomView()}

            </View>
        );

    }

    // Swiper的子视图布局
    addSwiperImageView = (images) => {
        let imageViews = [];

        images && images.map((v, k)=> {
            console.log(v.ACT_IMAGE);
            imageViews.push(
                <TouchableOpacity activeOpacity={0.8}
                                  style={styles.slide1}
                                  key={k}
                                  onPress={
                                      () => {

                                      }
                                  }>
                    <Image style={{width: Screen.width}}
                           resizeMode={"contain"}
                           source={{uri: v.ACT_IMAGE}}
                    />
                </TouchableOpacity>
            )
        });

        return imageViews;
    };

    //中间 石油报价
    addOilPriceView = () => {
        return (
            <View style={{flexDirection: 'row', flex:1, backgroundColor:'#fff'}}>
                <View style={{flex: 1}}>

                </View>

                <View style={{flex: 1}}>

                </View>
            </View>
        )
    };

    //底部按钮
    addBottomView = () => {
        return (
            <View style={{flex: 1,backgroundColor:'#f4f4f4',marginTop: pixel1}}>
                <View style={{flex:3,flexDirection:'row',backgroundColor:'#f4f4f4'}}>
                    <CustomButton style={{flex:1,backgroundColor:'#fff'}}
                                  text="劲爆活动"
                                  image={require('../../image/icon_index_activity.png')}
                    />
                    <CustomButton style={{flex:1,backgroundColor:'#fff',marginLeft:pixel1}}
                                  text="用车百科"
                                  image={require('../../image/icon_index_wiki.png')}
                    />
                </View>
                <View style={{flex:2,flexDirection:'row',marginTop:pixel1,backgroundColor:'#fff'}}>
                    <CustomButton style={{flex:1}}
                                  text="保养预约"
                                  image={require('../../image/icon_index_maintain.png')}
                    />
                    <CustomButton style={{flex:1}}
                                  text="预约驾驶"
                                  image={require('../../image/icon_index_test.png')}
                    />
                    <CustomButton style={{flex:1}}
                                  text="紧急救援"
                                  image={require('../../image/icon_index_saved.png')}
                    />
                    <CustomButton style={{flex:1}}
                                  text="我的消息"
                                  image={require('../../image/icon_index_message.png')}
                    />
                </View>
            </View>
        )
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f4f4f4'
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
});