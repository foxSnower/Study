import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    WebView
} from 'react-native';

import {Screen,BGColor} from '../../utils/CommonUtil'
import NavBar from '../../components/DefaultNavBar'

export default class Agreement extends Component{
    render(){
        return(
            <View style={{flex:1}}>
                <NavBar title="使用协议"
                        onBack={()=>{
                            this.props.navigator.pop()
                        }} />
                <WebView
                  style={{
                    backgroundColor: BGColor,
                  }}
                  source={require('./Agreement.html')}
                  //scalesPageToFit={true}
                />
            </View>
        )
    }
}
