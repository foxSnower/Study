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

import NavBar from '../../components/DefaultNavBar'
import {IMGURL} from '../../utils/RequestURL'
import {BGColor,BTNColor ,Screen,pixelRation,GetDateStr} from '../../utils/CommonUtil'
import LabelRow from '../../components/LabelRow'
import UserDefaults from '../../utils/GlobalStorage'



export default class DlrMapView extends Component {
    constructor(props) {
        super(props)
        const { lng,lat } = this.props;
        this.state={
            mayType: MapTypes.NORMAL,
            zoom: 15,
            linkAddr:"",
            center: {
                longitude: lng,
                latitude: lat
            },
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            markers: [{
                longitude: lng,
                latitude: lat,
                title: ""
            }],
        }
    }

    componentDidMount(){

    }

    render(){
        const { navTitle } = this.props;

        return(
            <View style={{backgroundColor:"#fff",flex:1}}>
                <NavBar title={navTitle}
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
                    style={{height:Screen.height,backgroundColor:"#fff"}}
                    onMapClick={(e) => {
                    }}
                >
                </MapView>

            </View>
        )
    }
}