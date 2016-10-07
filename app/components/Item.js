'use strict';
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text
} from 'react-native';

export default class Item extends Component {
    constructor(props) {
        super(props);
    }

    static PropTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.object,
        onPress: PropTypes.fun,
        imgStyle: PropTypes.object,
        rightText: PropTypes.string,
        tip: PropTypes.string
    };

    render() {
        const {
            title, 
            description, 
            image, 
            onPress, 
            imgStyle, 
            rightText, 
            tip
        } = this.props;
        return (
            <View>
                <TouchableOpacity
                    style = {styles.container}
                    onPress = { onPress }
                >
                    <Image
                        style = {[styles.thumbnail, imgStyle]}
                        source = {image}
                    />
                    {
                        tip ?
                        <Text style = {styles.tip}>{tip}</Text> :
                        null
                    }
                    <View style = {styles.touch}>
                            <Text 
                                style = {styles.title}
                            >{title}</Text>
                        {description ?
                            <Text
                                style = {styles.description}
                            >{description}</Text> : null
                        }
                    </View>
                    {
                        rightText ? 
                        <Text>{rightText}</Text> : 
                        <Image
                            style = {styles.link}
                            source = {require('../image/icon_link_go2.png')}
                        />
                    }
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      borderStyle: 'solid'
    },
    thumbnail: {
        flex: 1,
        maxWidth: 50,
        width: 50,
        maxHeight: 50,
        height: 50,
        position: 'relative'
    },
    tip: {
        position: 'absolute',
        left: 47,
        top: 14,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 2,
        paddingRight: 8,
        paddingBottom: 2,
        paddingLeft: 8,
        backgroundColor: '#C90028',
        borderRadius: 50,
        color: '#fff',
        fontSize: 12
    },
    touch: {
        flex: 4,
        marginLeft: 10
    },
    title: {
      fontSize: 16,
    },
    description: {
        marginTop: 8
    },
    link: {
        maxWidth: 18,
        maxHeight: 18
    }
})