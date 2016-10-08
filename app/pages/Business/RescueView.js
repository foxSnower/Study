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
} from 'react-native';
//百度地图api
import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';

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
            mayType: MapTypes.NORMAL,
            zoom: 15,
            center: {
                longitude: 113.981718,
                latitude: 22.542449
            },
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            markers: [{
                longitude: 113.981718,
                latitude: 22.542449,
                title: "Window of the world"
            },{
                longitude: 113.995516,
                latitude: 22.537642,
                title: ""
            }],
            dlrInfo: {DLR_CODE, DLR_SHORT_NAME,URG_SOS_TEL,INSURANCE_TEL,LINK_ADDR},
        }
    }

    componentDidMount(){
        getCurrentLocatiom((res)=>{
            this.setState({
                center:{
                    lng:res.lng,
                    lat:res.lat,
                }
            })
            //alert(JSON.stringify(res.dlrInfo))
        })
    }

    render(){
        const icon_go = `${IMGURL}/images/icon_link_go2.png`;
        const icon_tel = `${IMGURL}/images/icon_tel.png`;

        return(
            <View style={{backgroundColor:"#fff"}}>
                <NavBar title="紧急救援"
                        onBack={()=>{
                            this.props.navigator.pop()
                        }}
                />
                <MapView
                    trafficEnabled={this.state.trafficEnabled}
                    baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                    zoom={this.state.zoom}
                    mapType={this.state.mapType}
                    center={this.state.center}
                    marker={this.state.marker}
                    markers={this.state.markers}
                    style={{height:Screen.height*0.4}}
                    onMapClick={(e) => {
                    }}
                >
                </MapView>
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