/**
 * Created by DB on 16/5/19.
 */

import React, { Component, PropTypes } from 'react';
//noinspection JSUnresolvedVariable,JSUnresolvedVariable
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import {updateFields} from '../actions/rootAction'

//export default 关键字 在别的文件中使用
export default class Button extends Component {

    static PropTypes = {
        disabled: PropTypes.bool,
        style: PropTypes.object,
        textStyle: PropTypes.object,
        text: PropTypes.string,
        onPress: PropTypes.fun
    };

    static defaultProps = {
        disabled: false,
        text: "按钮",
        onPress: () => {},
    };

    onClick = () => {

        const { fields, dispatch } = this.props;
        dispatch(updateFields({count: 11}))
    };

    addOne = () => {
        const { fields, dispatch } = this.props;
        dispatch(updateFields({count: fields.count+10}))
    };

    render() {
        //解构
        const {disabled, textStyle, style, onPress, text} = this.props;

        return (
            <TouchableOpacity disabled={disabled}
                              style={[styles.button, style, disabled && {backgroundColor: '#b2b2b2'}]}
                              onPress={ onPress }
            >
                <Text style={[styles.text, textStyle]}>{text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
});

//transparent
//opacity: 0.5,