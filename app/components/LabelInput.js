import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Platform,
    Image,
    TouchableOpacity
} from 'react-native';

import {pixelRation} from '../utils/CommonUtil';
import {IMGURL} from '../utils/RequestURL'

export default class LabelInput extends Component {
    static PropTypes = {
        style: PropTypes.object,
        label: PropTypes.string,
        inputStyle: PropTypes.object,
        textStyle: PropTypes.object,
        placeholder: PropTypes.string,
        keyboardType: PropTypes.numeric,
        max: PropTypes.number,
        type: PropTypes.bool,
        returnKeyType: PropTypes.numeric,
        defaultValue: PropTypes.string,
        onChangeText: PropTypes.func,
        hasRightIcon:PropTypes.boolean
    }

    static defaultProps = {
        label: "",
        placeholder: "",
        keyboardType: "default",
        returnKeyType: "done",
        type: false,
        max: 20,
        onChangeText: () => {
        },
        hasRightIcon:false
    }

    render() {
        const icon_go = `${IMGURL}/images/icon_link_go2.png`;
        //iosMode returnKeyType 确认键的内容 enablesReturnKeyAutomatically 为空时禁用按钮 clearButtonMode 右侧显示删除
        const {label, inputStyle, style, textStyle,hasRightIcon, placeholder, defaultValue,value, returnKeyType, keyboardType, type, max, onChangeText}  = this.props;

        return (

            <View style={[styles.container, style]}>
                <Text style={[styles.label, textStyle]}>{label}</Text>
                <TextInput placeholder={placeholder}
                           style={[styles.textInput, inputStyle]}
                           maxLength={max}
                           clearButtonMode="while-editing"
                           enablesReturnKeyAutomatically={true}
                           secureTextEntry={type}
                           defaultValue={defaultValue}
                           value={value}
                           keyboardType={keyboardType}
                           returnKeyType={returnKeyType}
                           underlineColorAndroid="transparent"
                           onChangeText={ (text) => {
                               onChangeText(text)
                           }}
                >
                </TextInput>
                {
                    hasRightIcon ?
                        <TouchableOpacity style={styles.rightBtn}  >
                            <Image source={{uri:icon_go}}/>
                        </TouchableOpacity>
                        :null

                }
            </View>

        )
    }
}

const styles = StyleSheet.create({

    rightBtn:{
        width:20,
        height:20,
        flex:1,
    },
    label: {
        justifyContent:"center",
        color:"#2b2b2b",
        marginLeft:10,
        marginRight:10,
        flex:3
    },
    textInput: {
        flex: 5,
        marginLeft: 10,
        borderWidth: 0,
        fontSize: 15
    },
    container: {
        borderBottomWidth:1/pixelRation,
        borderBottomColor:"#d9d9d9",
        flexDirection: "row",
        alignItems:"center",
        paddingLeft:10,
        paddingRight:10,
        height:50,
        backgroundColor:"#fff"
    }
})
