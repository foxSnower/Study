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
        super(props)
    }

    static PropTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.object,
        onPress: PropTypes.fun,
        imgStyle: PropTypes.object
    };

    render() {
        const {title, description, image, onPress, imgStyle} = this.props;
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
                    <Image
                        style = {styles.link}
                        source = {require('../image/icon_link_go2.png')}
                    />
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
        maxHeight: 50
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