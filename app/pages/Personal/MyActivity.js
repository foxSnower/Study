/**
 * Created by 楚寒 on 2016/10/9.
 */
import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Text
} from 'react-native';

import NavBar from '../../components/DefaultNavBar'

export default class MyActivity extends Component {
    render(){
        return(
            <View style={{flex:1,backgroundColor:"#fff"}}>
                <NavBar title="我的活动"
                        onBack={()=>{
                            this.props.navigator.pop()
                        }}
                />
                <View style={{marginTop:15,flex:1,alignItems:"center"}}>
                    <Text >暂无活动</Text>
                    </View>
            </View>
        )
    }
}