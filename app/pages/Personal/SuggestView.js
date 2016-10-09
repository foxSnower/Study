'use strict';
import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    Platform,
    ScrollView
} from 'react-native';
// third modules
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
// action
import {addImage, deleteImage, submitSuggest} from '../../actions/personalAction';
// util
import UserDefaults from  '../../utils/GlobalStorage';
import {Screen, pixel1, BTNColor, BORDERColor, ly_Toast} from  '../../utils/CommonUtil';
// common component
import NavBar from '../../components/DefaultNavBar';
import Loader from '../../components/LoaderView';
import Button from '../../components/Button';

class Suggest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceOs: '未知',
            deviceModel: '未知',
            deviceName: '未知',
            currentType: "1",
            faultDesc: '',
            faultDescCount: 0,
            btnText: '提交'
        };

        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        // 获取设备信息
        UserDefaults.objectForKey('deviceInfo', deviceInfo=> {
            if(deviceInfo) {
                this.setState({
                    // 手机系统
                    deviceOs: deviceInfo.OS_VERSION,
                    // 手机型号
                    deviceModel: deviceInfo.MODEL,
                    // 手机名称
                    deviceName: deviceInfo.DEVICE_TYPE
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

    // 处理提交
    submit() {
        if(this.state.btnText === "提交成功") {
            return;
        }
        const {personal} = this.props;
        // 拿到设备信息、提交内容、图片、问题类型
        let content = this.state.faultDesc.trim(); 
        let type = this.state.currentType;
        let imgList = personal.img.uploadAry;
        let deviceOs = this.state.deviceOs;
        let deviceModel = this.state.deviceModel;
        let deviceName = this.state.deviceName;
        // 判断问题描述是否有值
        if(content === "" || !content) {
            ly_Toast("请输入问题描述", 1000, -20);
            return;
        }
        this.setState({
            btnText: '提交中...'
        });
        let submitContent = {
            content,
            type,
            imgList,
            deviceOs,
            deviceModel,
            deviceName
        };
        UserDefaults.objectForKey("userInfo",userInfo => {
            if(userInfo){
                submitSuggest(submitContent, userInfo.LOGIN_USER_ID, (action)=> {
                    //
                    if(action.type) {
                        // 如果有 type，就表示成功
                        dispatch(action);
                        this.setState({
                            btnText: '提交成功'
                        });
                        alert("提交成功，感谢您的支持");
                    }else {
                        ly_Toast(JSON.stringify(action));
                    }
                });
            }
        });
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
                        //resizeMode={"stretch"}
                    />
                    <TouchableOpacity
                        onPress = {()=> {
                            this.deleteImage(index)
                        }}
                        style = {styles.delBtn}
                    >
                        <Image
                            source = {require('../../image/icon_delete_img.png')}
                            style = {{width: 20, height: 20}}
                        />
                    </TouchableOpacity>
                </View>
            )
        })
        let type = ['问题', '建议'];
        let btnGroup = type.map((item, index)=>{
            let color = index+1+"" === this.state.currentType ? {backgroundColor: BTNColor} : null;
            let textColor = index+1+"" === this.state.currentType ? {color: '#fff'} : null;
            return (
                <TouchableOpacity
                    style = {[styles.typeBtn, color]}
                    key = {index}
                    onPress = {()=> {
                        this.setState({
                            currentType: index+1+""
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
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style = {styles.item}>
                        <Text>手机系统</Text>
                        <Text>{this.state.deviceOs}</Text>
                    </View>
                    <View style = {styles.item}>
                        <Text>手机型号</Text>
                        <Text>{this.state.deviceModel}</Text>
                    </View>
                    <View style = {styles.item}>
                        <Text>手机名称</Text>
                        <Text>{this.state.deviceName}</Text>
                    </View>
                    <View style = {styles.item}>
                        <Text>意见类型</Text>
                        <View style = {styles.btnGroup}>
                            {btnGroup}
                        </View>
                    </View>
                    <View>
                        <Text style = {styles.title}>上传图片(可选，最多三张)</Text>
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
                            <Text style={{alignSelf:"flex-end"}}>
                                {this.state.faultDescCount}/200
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                <Button 
                    text = {this.state.btnText}
                    disabled={this.state.btnDisabled}
                    style={{
                        marginTop:5,
                        marginBottom:6,
                        width: Screen.width - 40,
                        backgroundColor: BTNColor,
                        alignSelf: "center",
                        borderRadius: 8
                    }}
                    onPress={this.submit}
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
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    inputArea: {
        backgroundColor: '#fff',
        paddingHorizontal: 20
    },
    title: {
        marginVertical: 10,
        marginHorizontal: 20
    },
    imgWrap: {
        position: 'relative',
        paddingVertical: 10,
        paddingLeft: 10
    },
    imgItem: {
        width: 100,
        height: 100,
        paddingTop: 18,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 18,
        borderWidth:2,
        borderColor:BORDERColor,
        flex:1,
        backgroundColor:"#fff",
        borderRadius:4,
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
        paddingLeft: 10
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
