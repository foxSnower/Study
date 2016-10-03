/**
 * Created by 楚寒 on 2016/10/3.
 */
import React, {Component} from 'react';
//noinspection JSUnresolvedVariable,JSUnresolvedVariable
import {
    StyleSheet,
    View,
    Platform,
    ActivityIndicator
} from 'react-native';

import {connect} from 'react-redux'
import {BTNColor,ly_Toast} from '../../utils/CommonUtil'
import NavBar from '../../components/DefaultNavBar';
import ScrollableTabView, {ScrollableTabBar,} from 'react-native-scrollable-tab-view';
import TestDriveListView from './TestDriveListView';
import {updateTestDrive,getCarTypes} from '../../actions/testDriveAction'


//export default 关键字 在别的文件中使用
class TestDriveHomeView extends Component {
    constructor(props){
        super(props)
        this.state={
            loaded:false,
            qichen:[],
            richan:[]
        }
    }
    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(getCarTypes((data)=>{
            if(data.length>0){
                let {qichen,richan} = this.splitByCarBrandCode(data);//将后台传出来的数据分割成对应的品牌
                //dispatch(updateTestDrive({qichen:qichen,richan:richan}));
                this.setState({
                    loaded:true,
                    qichen:qichen,
                    richan:richan
                })
            }else{
                ly_Toast("暂无数据")
            }
        }))
    }
    splitByCarBrandCode = (carTypesData)=>{
        let qichen =[], richan = [];
        for(let i=0,len=carTypesData.length;i<len;i++){
            var arrCar = {};
            if(carTypesData[i].CAR_SERIESS.length>0){
                for(let j=0,len=carTypesData[i].CAR_SERIESS.length;j<len;j++){
                    arrCar["group"] = carTypesData[i].BODY_STRUCTURAL;
                    if(carTypesData[i].CAR_SERIESS[j].CAR_BRAND_CODE=="1"){   //日产车系数组
                        arrCar["CAR_IMAGE"] = carTypesData[i].CAR_SERIESS[j].CAR_IMAGE.substring(1);
                        arrCar["CAR_SERIES_CN"] = carTypesData[i].CAR_SERIESS[j].CAR_SERIES_CN;
                        arrCar["ATTENTION_RATE"] = carTypesData[i].CAR_SERIESS[j].ATTENTION_RATE;
                        arrCar["MIN_GRUID_PRICE"] = carTypesData[i].CAR_SERIESS[j].MIN_GRUID_PRICE
                        arrCar["MAX_GRUID_PRICE"] = carTypesData[i].CAR_SERIESS[j].MAX_GRUID_PRICE
                        richan.push(arrCar);
                    }else if(carTypesData[i].CAR_SERIESS[j].CAR_BRAND_CODE=="2"){  //启辰车系数组
                        arrCar["CAR_IMAGE"] = carTypesData[i].CAR_SERIESS[j].CAR_IMAGE.substring(1);
                        arrCar["CAR_SERIES_CN"] = carTypesData[i].CAR_SERIESS[j].CAR_SERIES_CN;
                        arrCar["ATTENTION_RATE"] = carTypesData[i].CAR_SERIESS[j].ATTENTION_RATE;
                        arrCar["MIN_GRUID_PRICE"] = carTypesData[i].CAR_SERIESS[j].MIN_GRUID_PRICE
                        arrCar["MAX_GRUID_PRICE"] = carTypesData[i].CAR_SERIESS[j].MAX_GRUID_PRICE
                        qichen.push(arrCar);

                    }
                    arrCar={};
                }

            }
        }
        return {qichen,richan}
    }
    render() {
        if(!this.state.loaded){
            return (
                <View style={styles.container}>
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color={BTNColor} />
                    </View>
                </View>
            )
        }
        const {testDrive} = this.props;
        return (
            <View style={{flex:1}}>
                <NavBar title="试驾车型"
                        onBack={()=> {
                            this.props.navigator.pop()
                        }}
                />
                <ScrollableTabView tabBarActiveTextColor={BTNColor}
                                   tabBarInactiveTextColor={'#b4b4b4'}
                                   tabBarUnderlineColor={BTNColor}
                                   tabBarUnderlineStyle = {{backgroundColor:BTNColor}}
                                   renderTabBar={() => <ScrollableTabBar />}
                >
                    <TestDriveListView tabLabel="日产" {...this.props} carData={testDrive.richan} />
                    <TestDriveListView tabLabel="启辰" {...this.props} carData={testDrive.qichen} />
                </ScrollableTabView>
            </View>
        );
    }
}
export default connect((state)=>{
    const {testDrive} = state;
    return {
        testDrive
    }
})(TestDriveHomeView)
const styles = StyleSheet.create({
    loading:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    container:{
        flex:1,
        backgroundColor:"rgba(0,0,0,0.6)",
        flexDirection:'row'
    },
})