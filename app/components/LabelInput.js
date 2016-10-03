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
    }

    render() {
        //iosMode returnKeyType 确认键的内容 enablesReturnKeyAutomatically 为空时禁用按钮 clearButtonMode 右侧显示删除
        const {label, inputStyle, style, textStyle, placeholder, defaultValue, returnKeyType, keyboardType, type, max, onChangeText}  = this.props;

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
                           keyboardType={keyboardType}
                           returnKeyType={returnKeyType}
                           underlineColorAndroid="transparent"
                           onChangeText={ (text) => {
                               onChangeText(text)
                           }}
                >
                </TextInput>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    label: {
        width: 50
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
        borderWidth: 0,
        height: 50,
        fontSize: 15
    },
    container: {
        flex: 1,
        flexDirection: "row",
        borderBottomWidth: 1 / pixelRation,
        borderBottomColor: "#ebebeb",
        justifyContent: "center",
        alignItems: "center",
    }
})
