/**
 * Created by 楚寒 on 2016/10/6.
 */
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
    ListView,
    Alert,
    TextInput,
    TouchableOpacity,
    Platform
} from 'react-native';

import {connect} from 'react-redux'
import NavBar from '../../components/DefaultNavBar'
import {IMGURL} from '../../utils/RequestURL'
import {BGColor,BORDERColor,BTNColor, Screen,pixel1,pixelRation,GetDateStr,ly_Toast,setDefaultTime,validateMobile,validateDateExpries} from '../../utils/CommonUtil'
import LabelRow from '../../components/LabelRow'
import LabelInput from '../../components/LabelInput'
import Button from '../../components/Button'
import DatePicker from '../../components/DatePicker'
import DLRView from './DLRView'
import SelectPickerView from './CarBrandPicker'
import UserDefaults from '../../utils/GlobalStorage'
import OrderView from '../../pages/Personal/OrderView'
import ImagePicker from 'react-native-image-picker';


import { handleRepairBook } from '../../actions/bookAction'

class RepairView extends Component {
    constructor(props) {
        super(props)
        const {dispatch, DLR_CODE, DLR_SHORT_NAME, LOGIN_MOBILE, CUST_NAME}=this.props;
        const icon_addImg = `${IMGURL}/images/icon_img_add.png`;
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            dlrInfo: {DLR_CODE: DLR_CODE, DLR_SHORT_NAME: DLR_SHORT_NAME},
            strBookTime: setDefaultTime(2),
            maxTime: setDefaultTime(60, false),
            minTime: setDefaultTime(2, false),
            userName: CUST_NAME,
            mobile: LOGIN_MOBILE,
            height:0,
            btnDisabled:false,
            btnText:"立即预约",
            carInfoArr:[],
            carInfo:{},
            addImage: {uri:icon_addImg},
            postImage:"",
            faultDesc:'',
            faultDescCount:0,
        }

    }

    //提交维修预约
    handleCommissonBook = () => {
        if (this.state.userName == null || this.state.userName == '') {
            ly_Toast("请输入车主姓名");
            return;
        }
        if (this.state.mobile == null || this.state.mobile == '') {
            ly_Toast("请输入手机号");
            return;
        }
        if (!validateMobile(this.state.mobile)) {
            ly_Toast("手机号码格式不正确");
            return;
        }
        if (!this.state.dlrInfo.DLR_SHORT_NAME) {
            ly_Toast("请选择试驾专营店");
            return;
        }
        if (!this.state.strBookTime) {
            ly_Toast("预约时间不正确");
            return;
        }
        if(validateDateExpries(this.state.strBookTime.split(' ')[0])>-1){
            ly_Toast("请至少提前一天预约");
            return;
        }
        if(validateDateExpries(this.state.strBookTime.split(' ')[0])<-60){
            ly_Toast("亲，选择的时间太遥远了!");
            return;
        }

        if(this.state.faultDesc == ''){
            ly_Toast("请输入备注");
            return;
        }
        const { dispatch }  = this.props;
        this.setState({
            btnDisabled:true,
            btnText:"正在提交..."
        })
        UserDefaults.objectForKey("userInfo",data => {
            if(data){
                if(data["CARD_NO"]==""){
                    ly_Toast("您不是会员,不能申请维修");
                    return;
                }else{
                    let post_img = [];
                    if(this.state.postImage != ""){
                        post_img.push(this.state.postImage)
                    }else{
                        post_img = [];
                    }
                    alert(post_img[0].length)
                    dispatch(handleRepairBook({
                        ATTACHS: post_img,
                        BOOK_TIME: this.state.strBookTime,
                        CARD_NO:data["CARD_NO"],
                        CAR_NO: this.state.carInfo.carNo,
                        CA_CODE: "NA",
                        CUST_NAME: this.state.userName,
                        CUST_TEL: this.state.mobile,
                        DLR_CODE: this.state.dlrInfo.DLR_CODE,
                        LOGIN_USER_ID: data["LOGIN_USER_ID"],
                        REMARK: this.state.faultDesc,
                        VIN: this.state.carInfo.vin,
                        rpDlrShortName: this.state.dlrInfo.DLR_SHORT_NAME,
                },res => {
                        this.setState({
                            btnDisabled:false,
                            btnText:"立即预约"
                        })
                        if(res.RESULT_CODE == "0"){
                            if(res.RESULT_CODE == 0){
                                ly_Toast("预约成功",1000,20,()=>{
                                    this.props.navigator.push({
                                        component:OrderView
                                    })
                                });
                            }else{
                                Alert.alert("温馨提示",res.RESULT_DESC,
                                    [
                                        {
                                            text:"确定",
                                            onPress:()=>{
                                                this.props.navigator.push({
                                                    component:OrderView
                                                })
                                            }
                                        }
                                    ]
                                )
                            }
                        }else{
                            ly_Toast(res.RESULT_DESC)
                        }
                    }))
                }
            }else{
                console.log("没有获取到用户信息")
            }
        })
    }

    componentDidMount(){
        UserDefaults.objectForKey("carInfo",dataArr => {  //后台用户车的数量
                if(dataArr){
                    this.setState({
                        carInfoArr:dataArr.CARS,
                        carInfo:{
                            carNo:dataArr.CARS[0].CAR_NO,
                            vin:dataArr.CARS[0].VIN,
                            carSeriesCode:dataArr.CARS[0].CAR_SERIES_CODE,
                            carSeriesName:dataArr.CARS[0].CAR_SERIES_NAME
                        }
                    })
                }else{
                    ly_Toast("您还没有绑定车辆?")
                }
            }
        )
    }

    //监听时间控件值更新 什么问题 上传图片
    handleDateChange(date){
        this.setState({
            strBookTime:date
        })
    }

    //添加图片
    handleAddImg = () => {
        //
        this.selectPhotoTapped()
    }

    selectPhotoTapped = () => {
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
                    addImage: source,
                    postImage:response.data
                })
            }
        });
    };

    render(){
        const {LOGIN_MOBILE, CUST_NAME} = this.props;
        const icon_time = `${IMGURL}/images/icon_time.png`;
        const icon_go = `${IMGURL}/images/icon_link_go2.png`;
        const icon_car = `${IMGURL}/images/icon_wiki_question.png`;
        const icon_addImg = `${IMGURL}/images/icon_img_add.png`;
        //icon_img_add.png"
        return(
            <View style={{flex:1,backgroundColor:BGColor}}>
                <NavBar title="维修预约"
                        onBack={()=>{
                            this.props.navigator.pop()
                        }}
                />
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={{marginTop:15}}>
                        <LabelInput
                                    label="车主姓名"
                                    max={11}
                                    hasRightIcon={true}
                                    defaultValue={CUST_NAME}
                                    onChangeText={(text) => {
                                        this.setState({
                                            userName: text
                                        })
                                    }}

                        />
                        <LabelInput
                                    label="手机号"
                                    max={11}
                                    hasRightIcon={true}
                                    defaultValue={LOGIN_MOBILE}
                                    keyboardType="numeric"
                                    onChangeText={(text) => {
                                        this.setState({
                                            mobile: text
                                        })
                                    }}

                        />
                        <LabelRow
                            title="选择车辆"
                            content={this.state.carInfo.carNo}
                            hasRightIcon={true}
                            placeholder="请选择车辆"
                            isIcon={true}
                            iconUrl={icon_car}
                            iconStyle={{width:26,height:26}}
                            onPress={() => {
                                this.selectViewLocale.onShow()
                            }}/>
                        <SelectPickerView ref={(p)=>this.selectViewLocale = p}
                                          pickerArr={this.state.carInfoArr}
                                          defaultValue={this.state.carInfo.CAR_NO}
                                          onChange={(itemValue, itemPosition)=> {
                                              this.setState({
                                                  carInfo:{
                                                      carNo:this.state.carInfoArr[itemPosition].CAR_NO,
                                                      vin:this.state.carInfoArr[itemPosition].VIN,
                                                      carSeriesCode: this.state.carInfoArr[itemPosition].CAR_SERIES_CODE,
                                                      carSeriesName: this.state.carInfoArr[itemPosition].CAR_SERIES_NAME,
                                                  }
                                              })
                                          }}
                                          onPressConfirm={
                                              this.pulldown
                                          }
                                          type={true}
                        />
                    </View>
                    <View style={{marginTop:15}}>
                        <LabelRow
                            title="维修专营店"
                            content={this.state.dlrInfo.DLR_SHORT_NAME}
                            hasRightIcon={true}
                            placeholder="请选择专营店"
                            iconUrl={icon_go}
                            iconStyle={{width:10}}
                            onPress={()=>{
                                this.props.navigator.push({
                                    component:DLRView,
                                    params:{
                                        refDlr:"2",
                                        getDlrInfo:(dlrInfo)=>{
                                            this.setState({
                                                dlrInfo
                                            })
                                            this.handleCommission()
                                        }
                                    }
                                })
                            }}/>
                        <LabelRow title="期望时间"
                                  content={this.state.strBookTime}
                                  hasRightIcon={true}
                                  iconUrl={icon_time}
                                  onPress={()=>{
                                      this.picker.onPressDate()
                                  }}/>
                        <DatePicker ref={picker => this.picker = picker}
                                    mode="datetime"
                                    defaultDate = {this.state.strBookTime}
                                    maxDate={ this.state.maxTime }
                                    minDate={this.state.minTime}
                                    onDateChange={
                                        this.handleDateChange.bind(this)
                                    } />
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{marginLeft:10,marginBottom:10}}>
                            上传图片
                        </Text>
                        <TouchableOpacity 
                            style={{
                                backgroundColor:"#fff",
                                paddingLeft:10,
                                paddingVertical:10
                            }} 
                            onPress={
                                this.handleAddImg
                            }
                        >
                            <Image 
                                style={styles.img} 
                                source={this.state.addImage} 
                                //resizeMode={"cover"} 
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{margin:10}}>
                            故障描述
                        </Text>
                        <View style={{backgroundColor:"#fff",padding:10}}>
                            <TextInput multiline={true}
                                       maxLength={200}
                                       style={[styles.textArea,{height: Math.max(35, this.state.height)}]}
                                       clearButtonMode="while-editing"
                                       placeholder="请输入代办备注"
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
                </ScrollView>
                <Button text={this.state.btnText}
                        disabled={this.state.btnDisabled}
                        style={{
                            marginTop:5,
                            marginBottom:6,
                            width: Screen.width - 40,
                            backgroundColor: BTNColor,
                            alignSelf: "center",
                            borderRadius: 8
                        }}
                        onPress={this.handleCommissonBook}
                />
            </View>

        )
    }
}
export default connect((state)=>{
    const {book} = state;
    return {
        book
    }
})(RepairView)

const styles = StyleSheet.create({
    img:{
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
        borderRadius:4
    },
    textArea:{
        flex:1,
        borderColor:BORDERColor,
        borderWidth:pixel1,
        backgroundColor:"#fff",
        borderRadius:8,
    },
    listView:{
        paddingHorizontal:10,
        flex:1,
        flexWrap:"wrap",
    },
    cellView:{
        marginTop:6,
        alignItems:"center",
        justifyContent:"center",
        borderColor:BORDERColor,
        borderWidth:pixel1,
        borderRadius:10,
        backgroundColor:"#fff",
        paddingVertical:5,
        paddingHorizontal:5

    }
})