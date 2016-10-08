/**
 * Created by DB on 16/10/8.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import {Screen} from '../utils/CommonUtil'

export default class AdvertisementView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            second: 3
        };
    }

    componentDidMount() {

        this.timer = setInterval(()=>{
            if (this.state.second == 0) {
                this.props.hideAds()
            } else {
                this.setState({
                    second: this.state.second - 1
                })
            }

        }, 1000)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {

        return (
            <View style={styles.container}>
                <Image style={{width: Screen.width, height: Screen.height}}
                       source={{uri: 'http://upload-images.jianshu.io/upload_images/953718-542ce9d4633374a3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'}}>
                    <TouchableOpacity style={{width: 80, height: 40, backgroundColor: 'red', marginTop: 40}}
                                      onPress={this.props.hideAds}>
                        <Text>{`点击跳过${this.state.second}`}</Text>
                    </TouchableOpacity>
                </Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b2b2b2',
    }
});