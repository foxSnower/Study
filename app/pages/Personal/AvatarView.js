'use strict';
import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Text
} from 'react-native';

// third module
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
// util

// common component
import NavBar from '../../components/DefaultNavBar';
import Loader from '../../components/LoaderView';

class Avatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    componentDidMount() {

    }

    // 选择照片
    selectPhotoTapped() {
        const options = {
            title: '选择一张照片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '从相册选取',
            allowsEditing: false,
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                var source;

                if (Platform.OS === 'android') {
                    source = {uri: response.uri, isStatic: true};
                } else {
                    source = {uri: response.uri.replace('file://', ''), isStatic: true};
                }

                this.setState({
                    addImage: source
                })
            }
        });
    };

    render() {
        if(!this.state.loaded) {
            return (
                <View style = {styles.container}>
                    <NavBar
                        title = "修改头像"
                        onBack = {()=> {
                            this.props.navigator.pop()
                        }}
                    />
                    <Loader />
                </View>
            )
        }


        return (
            <View style = {styles.container}>
                <NavBar
                    title = "修改头像"
                    onBack = {()=> {
                        this.props.navigator.pop()
                    }}
                />
            </View>
        )
    }
}

export default connect((state)=> {
    const {personal} = state;
    return {
        personal
    }
})(Avatar)

let styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
