/**
 * Created by 楚寒 on 2016/10/3.
 */
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux'
import NavBar from '../../components/DefaultNavBar'
import {BGColor,BTNColor,Screen} from '../../utils/CommonUtil'
import LabelRow from '../../components/LabelRow'
import CarInfo from './CarInfo'
import Button from '../../components/Button'
import {IMGURL} from '../../utils/RequestURL'
import DatePicker from '../../components/DatePicker'

class TestDriveBook extends Component {
    componentDidMount(){
        alert(DatePicker)
    }
    //提交试驾预约
    testDriveBook = ()=>{
        const {dispatch,testDrive,LOGIN_USER_ID,LOGIN_MOBILE,CUST_NAME,DLR_CODE,DLR_SHORT_NAME,CAR_SERIES_CODE} = this.props;
    }
    render(){
        const {CAR_IMAGE,CAR_SERIES_CN,MIN_GRUID_PRICE,MAX_GRUID_PRICE,LEVEL,LOGIN_USER_ID,LOGIN_MOBILE,CUST_NAME,DLR_CODE,DLR_SHORT_NAME} = this.props;
        const icon = `${IMGURL}/images/icon_time.png`;
        return(
            <View style={{flex:1,backgroundColor:BGColor}}>
                <NavBar title="试驾预约"
                        onBack={()=>{
                            this.props.navigator.pop()
                        }}
                />
                <CarInfo imgUrl={CAR_IMAGE}
                         carType={CAR_SERIES_CN}
                         level={LEVEL}
                         minprice={MIN_GRUID_PRICE}
                         maxprice={MAX_GRUID_PRICE}></CarInfo>
                <View style={{marginTop:15}}>
                    <LabelRow
                              title="车主姓名"
                              content={CUST_NAME}
                              ></LabelRow>
                    <LabelRow title="手机号"
                              content={LOGIN_MOBILE}
                              ></LabelRow>

                </View>
                <View style={{marginTop:15}}>
                    <LabelRow
                        title="试驾专营店"
                        content={DLR_SHORT_NAME}
                        hasRightIcon={true}
                        iconUrl="require('../image/icon_time.png')"
                        onPress={()=>{
                            alert(1);
                        }}></LabelRow>
                    <LabelRow title="预约时间"
                              content="2016年10月4日 01:15"
                              hasRightIcon={true}
                              iconUrl={icon}
                              onPress={()=>{
                                  alert(1);
                              }}></LabelRow>


                </View>
                <DatePicker></DatePicker>
                <Text style={{marginLeft:20}}>温馨提示:预约时间需要提前一天预约</Text>
                <Button text="提交预约"
                        style={{
                            marginTop:20,
                            width: Screen.width - 40,
                            backgroundColor: BTNColor,
                            alignSelf: "center",
                            borderRadius: 8
                        }}
                        onPress={this.testDriveBook}
                        ></Button>
            </View>
        )
    }
}
export default connect((state)=>{
    const {testDrive} = state;
    return {
        testDrive
    }
})(TestDriveBook)

