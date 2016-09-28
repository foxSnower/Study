/**
 * Created by DB on 16/7/13.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Dimensions,
    Text,
    Platform,
    PixelRatio,
    StatusBar
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class DefaultNavBar extends Component {

    static propTypes = {
        onBack: PropTypes.func,
        title: PropTypes.string,
        tintColor: PropTypes.string,
        leftButtonStyle: PropTypes.object,
        hideLefButton: PropTypes.bool,
        hideRightButton: PropTypes.bool,
        onRightClick: PropTypes.func,
        rightText: PropTypes.string
    };

    static defaultProps = {
        tintColor: '#fff',
        hideLefButton: false,
        hideRightButton: true,
        onRightClick: ()=>{},
        rightText: ''
    };

    render() {
        let statusBar = null;

        if (Platform.OS === 'ios') {
            statusBar = <View style={{height: 20, backgroundColor: this.props.tintColor}}/>
        }

        return (
            <View style={{backgroundColor: this.props.tintColor}}>

                {statusBar}
                <View style={styles.container}>

                    <View style={styles.navBarTitleContainer}>
                        <Text style={styles.navBarTitleText}>{this.props.title}</Text>
                    </View>

                    {this.props.hideLefButton == false ?
                        <View style={styles.navBarButtonContainer}>
                            <TouchableOpacity style={[styles.navBarButton, {marginLeft: 8}]}
                                              onPress={this.props.onBack}
                                              activeOpacity={0.5}
                            >
                                <Icon style={{backgroundColor: 'transparent', marginTop: 2}}
                                      name="ios-arrow-back-outline" size={28} color='#000'/>
                            </TouchableOpacity>
                        </View> : null
                    }

                    {this.props.hideRightButton == false ?

                        <TouchableOpacity style={styles.rightButton}
                                          onPress={this.props.onRightClick}
                                          activeOpacity={0.5}
                        >
                            <Text>{this.props.rightText}</Text>
                        </TouchableOpacity>
                        : null
                    }


                </View>
            </View>
        );
    }
}

const pixelRation = PixelRatio.get();
const styles = StyleSheet.create({
    container: {
        height: 44,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        borderBottomWidth: 1 / pixelRation,
        borderBottomColor: '#f4f4f4'
    },
    rightButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12
    },
    navBarButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    navBarButton: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 60,
    },
    navBarTitleContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navBarTitleText: {
        fontSize: 17,
        letterSpacing: 0.5,
        color: '#333',
        fontWeight: '500',
    },
});
//#333
//#825897

{/*<StatusBar*/
}
{/*backgroundColor="blue"*/
}
{/*barStyle="light-content"*/
}
{/*/>*/
}