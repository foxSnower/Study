import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Platform,
    TouchableOpacity
} from 'react-native';

import {pixelRation} from '../utils/CommonUtil';
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

                        </TouchableOpacity>
                        :null

                }
            </View>

        )
    }
}

const styles = StyleSheet.create({
    rightBtn:{
        justifyContent:"center",
        alignItems:"center",
        flex:1,
    },
    label: {
        width: 50
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
        borderWidth: 0,
        fontSize: 15
    },
    container: {
        height: 50,
        flex: 1,
        flexDirection: "row",
        borderBottomWidth: 1 / pixelRation,
        borderBottomColor: "#ebebeb",
        justifyContent: "center",
        alignItems: "center",
    }
})
