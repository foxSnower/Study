'use strict';
import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    Platform
} from 'react-native';
// third modules
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
// action
import {addImage, deleteImage} from '../../actions/personalAction';
// util
import UserDefaults from  '../../utils/GlobalStorage';
import {Screen, pixel1, BTNColor, BORDERColor} from  '../../utils/CommonUtil';
// common component
import NavBar from '../../components/DefaultNavBar';
import Loader from '../../components/LoaderView';

class Suggest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deivceModel: '未知',
            deivceName: '未知',
            currentType: 0
        };

        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
    }

    componentDidMount() {
        // 获取设备信息
        UserDefaults.objectForKey('deviceInfo', deviceInfo=> {
            if(deviceInfo) {
                this.setState({
                    deivceModel: deviceInfo.MODEL,
                    deivceName: deviceInfo.DEVICE_TYPE
                });
            }
        });
    }

    // 选择照片
    selectPhotoTapped() {
        const {dispatch, personal} = this.props;
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
        // showImagePicker 显示模态框方法，接收一个参数配置显示的文本
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
                //
                var source;

                if (Platform.OS === 'android') {
                    source = {uri: response.uri, isStatic: true};
                } else {
                    source = {uri: response.uri.replace('file://', ''), isStatic: true};
                }
                // 这里是得到了当前选择的图片，需要将其和之前reducer中的放到一起
                let showAry = personal.img.showAry;
                let uploadAry = personal.img.uploadAry;
                showAry.push(source);
                uploadAry.push(response.data);
                let imgObj = {
                    showAry,
                    uploadAry
                };
                dispatch(addImage(imgObj));
            }
        });
    }
    // 删除图片
    deleteImage(index) {
        const {dispatch} = this.props;

        dispatch(deleteImage(index));
    }

    render() {
        const {personal} = this.props;
        // 为了给imgAry 一个 key，循环这个数据加上 key
        let showAry = personal.img.showAry.map((value, index)=> {
            return (
                <View 
                    key = {index}
                    style = {styles.imgWrap}
                >
                    <Image 
                        source = {value} 
                        style = {styles.imgItem}
                    />
                    <TouchableOpacity
                        onPress = {()=> {
                            this.deleteImage(index)
                        }}
                        style = {styles.delBtn}
                    >
                        <Image
                            source = {require('../../image/delete_img.png')}
                            style = {{width: 20, height: 20}}
                        />
                    </TouchableOpacity>
                </View>
            )
        })
        let type = ['问题', '建议'];
        let btnGroup = type.map((item, index)=>{
            let color = index === this.state.currentType ? {backgroundColor: BTNColor} : null;
            let textColor = index === this.state.currentType ? {color: '#fff'} : null;
            return (
                <TouchableOpacity
                    style = {[styles.typeBtn, color]}
                    key = {index}
                    onPress = {()=> {
                        this.setState({
                            currentType: index
                        })
                    }}
                >
                    <Text style = {textColor}>{item}</Text>
                </TouchableOpacity>
            )
        })

        return (
            <View style = {styles.container}>
                <NavBar
                    title = "意见反馈"
                    onBack = {()=> {
                        this.props.navigator.pop()
                    }}
                />
                <View style = {styles.item}>
                    <Text>手机系统</Text>
                    <Text>{this.state.deivceModel}</Text>
                </View>
                <View style = {styles.item}>
                    <Text>手机名称</Text>
                    <Text>{this.state.deivceName}</Text>
                </View>
                <View style = {styles.item}>
                    <Text>意见类型</Text>
                    <View style = {styles.btnGroup}>
                        {btnGroup}
                    </View>
                </View>
                <View>
                    <Text style = {styles.title}>上传图片(选项)</Text>
                    <View style = {styles.imgItems}>
                        {showAry}
                        {
                            showAry.length < 3 ?
                            <View style = {styles.uploadBtnWrap}>
                                <TouchableOpacity
                                    style = {[styles.uploadBtn, styles.imgItem]}
                                    onPress = {this.selectPhotoTapped}
                                >
                                    <Image
                                        source = {require('../../image/icon_img_add.png')}
                                    />
                                </TouchableOpacity>
                            </View> :
                            null
                        }
                    </View>
                </View>
                <View>
                    <Text style = {styles.title}>详情(必填项)</Text>
                    <View style = {styles.inputArea}>
                        <TextInput multiline={true}
                           maxLength={200}
                           style={[styles.textArea,{height: Math.max(35, this.state.height)}]}
                           clearButtonMode="while-editing"
                           placeholder="请输入问题描述"
                           enablesReturnKeyAutomatically={true}
                           keyboardType="default"
                           returnKeyType="done"
                           underlineColorAndroid="transparent"
                           onChange={(event)=>{
                               this.setState({
                                   height: event.nativeEvent.contentSize.height,
                               })
                           }}
                           onChangeText={ (text) => {

                               this.setState({
                                   faultDesc:text,
                                   faultDescCount:text?text.length:0,

                               })
                           }}
                        >

                        </TextInput>
                        <Text style={{alignSelf:"flex-end"}}>{this.state.faultDescCount}/200</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style = {styles.submitBtn}
                    onPress = {()=> {
                        alert('hello')
                    }}
                >
                    <Text style = {styles.submitText}>立即提交</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect((state)=> {
    const {personal} = state;
    return {
        personal
    }
})(Suggest)

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efeff4'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderBottomWidth: pixel1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    btnGroup: {
        flexDirection: 'row'
    },
    typeBtn: {
        borderWidth: pixel1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 5,
        marginLeft: 10,
        paddingVertical: 5,
        paddingHorizontal: 20
    },
    imgItems: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 5
    },
    inputArea: {
        backgroundColor: '#fff'
    },
    title: {
        marginVertical: 10,
        marginHorizontal: 20
    },
    imgWrap: {
        position: 'relative',
        paddingVertical: 10,
        paddingLeft: 20
    },
    imgItem: {
        width: 60,
        height: 60,
    },
    delBtn: {
        width: 20,
        height: 20,
        position: 'absolute',
        top: 0,
        right: -10
    },
    uploadBtnWrap: {
        paddingVertical: 10,
        paddingLeft: 20
    },
    uploadBtn: {
        borderWidth: 2,
        borderColor: BORDERColor,
        borderStyle: 'solid'
    },
    submitBtn: {
        backgroundColor: BTNColor,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        paddingVertical: 10,
        width: Screen.width
    },
    submitText: {
        fontSize: 20,
        color: '#fff'
    }
});
