/**
 * Created by 楚寒 on 2016/10/5.
 */
import React, {Component} from 'react';
//noinspection JSUnresolvedVariable,JSUnresolvedVariable
import {
    StyleSheet,
    View,
    Platform
} from 'react-native';

import NavBar from '../../components/DefaultNavBar';
//export default 关键字 在别的文件中使用
export default class DLRMapView extends Component {
    render(){
        return(
            <View style={styles.page}>
                <NavBar title="专营店地图"
                        onBack={()=> {
                            this.props.navigator.pop();
                        }}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({

    page: {
        backgroundColor: "#fff",
        flex: 1
    }
})