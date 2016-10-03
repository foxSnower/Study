/**
 * Created by 楚寒 on 2016/10/3.
 */
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity
} from 'react-native';

import {Screen} from '../../utils/CommonUtil'
export default class CarInfo extends Component {
    static PropTypes ={
        imgUrl:PropTypes.string,
        carType:PropTypes.string,
        level:PropTypes.string,
        minprice:PropTypes.string,
        maxprice:PropTypes.string,
    }


    render(){
        const {imgUrl,carType,level,minprice,maxprice} = this.props;
        return(
            <View style={styles.container}>
                <Image style={styles.img} resizeMode="contain" source={{uri:imgUrl}}></Image>
                <View style={styles.textView}>
                    <Text style={{color:"#2b2b2b"}}> 试驾车型: {carType}</Text>
                    <Text style={{marginLeft:16,marginTop:8,marginBottom:8,}}> 级别: {level}</Text>
                    <Text style={{marginLeft:16}}>{minprice}万 ~ {maxprice}万</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        backgroundColor:"#fff",
        padding:10,
    },
    img:{
        width:Screen.width*0.4,
        height:80,
        justifyContent:"center",
        alignItems:"center",
    },
    textView:{
        marginLeft:15,
        alignItems:"center",
        justifyContent:"center"
    }
})