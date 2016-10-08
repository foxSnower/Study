/**
 * Created by 楚寒 on 2016/10/6.
 */
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    Linking,
    View,
    TouchableOpacity,
    WebView,
    Geolocation
} from 'react-native';

import {connect} from 'react-redux'
import NavBar from '../../components/DefaultNavBar'
import {IMGURL} from '../../utils/RequestURL'
import {BGColor,BTNColor,BAIDU_MAP_KEY ,Screen,pixelRation,GetDateStr,ly_Toast,setDefaultTime,validateMobile,validateDateExpries} from '../../utils/CommonUtil'
import LabelRow from '../../components/LabelRow'
import DLRView from './DLRView'
import { getCurrentLocatiom } from '../../actions/bookAction'
import UserDefaults from '../../utils/GlobalStorage'



class RescueView extends Component {
    constructor(props) {
        super(props)
        const {dispatch, DLR_CODE, DLR_SHORT_NAME, URG_SOS_TEL, INSURANCE_TEL,LINK_ADDR}=this.props;
        this.state={
            lng:'113.156634',
            lat:'23.385141',
            dlrInfo: {DLR_CODE, DLR_SHORT_NAME,URG_SOS_TEL,INSURANCE_TEL,LINK_ADDR},
        }
    }

    componentDidMount(){
        getCurrentLocatiom((res)=>{
            this.setState({
                lng:res.lng,
                lat:res.lat,
            })
            alert(JSON.stringify(res.dlrInfo))
        })
    }

    render(){
        const icon_go = `${IMGURL}/images/icon_link_go2.png`;
        const icon_tel = `${IMGURL}/images/icon_tel.png`;
        let html =`<!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="utf-8">
                        <title></title>
                    </head>
                    <body id="map" style="width:200px;height:200px;background:none;z-index:8888">
					<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=IfMMDZYerUgh6yfc7MtKqOpCv0e4hMLd"></script>
                    <script>
                        initialize("113.156634", "23.385141")
                         /*初始化地图*/
                        var mp = null; //百度地图对象
                        function initialize(lng, lat) {
                            mp = new BMap.Map('map');
                            var point = new BMap.Point(lng, lat);
                            mp.centerAndZoom(point, 18);
                            var marker = new BMap.Marker(point); // 创建标注
                            mp.addOverlay(marker); // 将标注添加到地图中
                            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                        }
                    </script>
                    </body>
                    </html>
                    `
        alert(html)
        return(
            <View style={{backgroundColor:"#fff"}}>
                <NavBar title="紧急救援"
                        onBack={()=>{
                            this.props.navigator.pop()
                        }}
                />
                <WebView ref={'webview'}
                         automaticallyAdjustContentInsets={false}
                         javaScriptEnabled={true}
                         domStorageEnabled={true}
                         decelerationRate="normal"
                         startInLoadingState={true}
                         scalesPageToFit={true}
                         style={{height:Screen.height*0.4}} source={{html:html}} />
                <View style={{marginTop:15}}>
                    <LabelRow title="当前位置"
                              hasRightIcon={true}
                              content={this.state.dlrInfo.LINK_ADDR}
                    />
                    <LabelRow title="专营店"
                              content={this.state.strBookTime}
                              hasRightIcon={true}
                              iconStyle={{width:10,height:20}}
                              iconUrl={icon_go}
                              onPress={()=>{
                                  this.props.navigator.push({
                                      component:DLRView,
                                      params:{
                                          refDlr:"5",
                                          getDlrInfo:(dlrInfo)=>{
                                              this.setState({
                                                  dlrInfo
                                              })
                                          }
                                      }
                                  })
                              }}
                    />
                </View>
                <View style={{marginTop:15}}>
                    <LabelRow title="救援电话"
                              content={this.state.dlrInfo.URG_SOS_TEL}
                              hasRightIcon={true}
                              iconUrl={icon_tel}
                              onPress={()=>{
                                  Linking.openURL(`tel:${this.state.dlrInfo.URG_SOS_TEL}`);
                              }}
                    />
                    <LabelRow title="保险电话"
                              content={this.state.dlrInfo.INSURANCE_TEL}
                              hasRightIcon={true}
                              iconUrl={icon_tel}
                              onPress={()=>{
                                  Linking.openURL(`tel:${this.state.dlrInfo.INSURANCE_TEL}`);
                              }}
                    />
                </View>
               </View>
        )
    }
}
export default connect((state)=>{
    const {book} = state;
    return {
        book
    }
})(RescueView)