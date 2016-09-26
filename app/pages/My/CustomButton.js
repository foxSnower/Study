/**
 * Created by DB on 16/9/26.
 */
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

export default class CustomButton extends Component {

    static PropTypes = {
        style: PropTypes.object,
        textStyle: PropTypes.object,
        text: PropTypes.string,
        image: PropTypes.object,
        onPress: PropTypes.fun
    };

    static defaultProps = {
        onPress: () => {},
    };

    render() {

        const {style, textStyle, text, image, onPress} = this.props;

        return (
            <TouchableOpacity style={[styles.button, style]}
                              onPress={ onPress }
                              activeOpacity={0.7}
            >
                <Image resizeMode={"contain"}
                       source={image}
                       style={styles.image}
                />
                <Text style={[styles.text, textStyle]}>{text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        overflow: 'hidden',
        alignItems: 'center'
    },
    text: {
        color: '#333',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 15,
        fontSize: 15
    },
    image: {
        height: 30,  //这里布局有点奇怪你随便给个高度就好
        flex: 1,
        marginTop: 15,
        marginBottom: 15
    }
});