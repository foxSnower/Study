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

        const {style, textStyle, text,secTextStyle,secText ,imageStyle,image, onPress} = this.props;

        return (
            <TouchableOpacity style={[styles.button, style]}
                              onPress={ onPress }
                              activeOpacity={0.7}
            >
                <Image resizeMode={"contain"}
                       source={image}
                       style={[styles.image,imageStyle]}
                />
                <Text style={[styles.text, textStyle]}>{text}</Text>
                {
                    secText?<Text style={[styles.secText, secTextStyle]}>{secText}</Text>:null
                }

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
        marginBottom: 15,
        fontSize: 15,
        fontWeight:"100"
    },
    image: {
        flex: 1,
        height: 30,  //这里布局有点奇怪你随便给个高度就好
        marginTop: 15,
    },
    secText:{
        color:"#888"
    }
});
