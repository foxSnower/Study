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

import {pixelRation} from '../utils/CommonUtil'
export default class LabelRow extends Component {

    static PropTypes = {
        title: PropTypes.string,
        titleStyle: PropTypes.object,
        content: PropTypes.string,
        contentStyle: PropTypes.object,
        vstyle: PropTypes.object,
        hasRightIcon: PropTypes.bool,
        iconStyle: PropTypes.string,
        iconUrl: PropTypes.string,
        onPress:PropTypes.func
    }

    static defaultProps = {
        hasRightIcon:false,
        title:'',
        content:'',
        onPress:()=>{}
    }

    render(){
        const {vstyle,title,titleStyle,content,contentStyle,hasRightIcon,iconStyle,iconUrl,onPress} = this.props;
        return(
            <TouchableOpacity style={[styles.row, vstyle]} activeOpacity={0.7}
                              onPress={ onPress }
            >
                <Text style={[styles.title, titleStyle]}>{title}</Text>
                <Text style={[styles.content, contentStyle]}>{content}</Text>
                {
                    hasRightIcon ?
                        <View style={styles.rightBtn}  >
                            <Image style={[styles.img,iconStyle]}
                                   source={{uri:iconUrl}} />
                        </View>
                        :null

                }
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    rightBtn:{
        justifyContent:"center",
        alignItems:"center",
        flex:1,
    },
    row:{
        borderBottomWidth:1/pixelRation,
        borderBottomColor:"#d9d9d9",
        flexDirection: "row",
        alignItems:"center",
        paddingLeft:10,
        paddingRight:10,
        height:50,
        backgroundColor:"#fff"
    },
    title:{
        color:"#2b2b2b",
        marginLeft:10,
        marginRight:10,
        flex:3
    },
    content:{
        color:"#2b2b2b",
        flex:5,
        justifyContent: "center",
    },
    img:{
        width:20,
        height:20
    }

});