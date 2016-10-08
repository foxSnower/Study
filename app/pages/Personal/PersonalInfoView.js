/**
 * Created by 楚寒 on 2016/10/8.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux';
import ScrollableTabView, {ScrollableTabBar,} from 'react-native-scrollable-tab-view';
import {BGColor, BTNColor, Screen, pixelRation,GM_CALL, validateMobile,ly_Toast} from '../../utils/CommonUtil';
import NavBar from '../../components/DefaultNavBar';
import LabelRow from '../../components/LabelRow';
import LoaderView from '../../components/LoaderView'
import {IMGURL} from '../../utils/RequestURL'
import { updateLogin,getUserInfo,getVIPInfo,getCarInfo } from '../../actions/loginAction'
import UserDefaults from '../../utils/GlobalStorage'
import SelectPickerView from '../Business/CarBrandPicker'

class PersonalRow extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const {title,content } = this.props;
        return(
            <View style={styles.row}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.content}>{content}</Text>
            </View>
        )
    }
}

class PersonalInfoView extends Component {
    constructor(props){
        super(props)
        this.state={
            carInfoArr:[],
            carInfo:{},
            loaded:false
        }
    }

    componentDidMount(){
        const { carInfo } = this.props.login;
        this.setState({
            carInfoArr:carInfo.CARS,
            carInfo:{
                carNo:carInfo.CARS[0].CAR_NO,
                vin:carInfo.CARS[0].VIN,
                carSeriesName: carInfo.CARS[0].CAR_SERIES_NAME,
                carColor:carInfo.CARS[0].CAR_COLOR,
                dlrShortName:carInfo.CARS[0].DLR_SHORT_NAME,
                buyDate:carInfo.CARS[0].BUY_DATE,
                lastRepairDate:carInfo.CARS[0].LAST_REPAIR_DATE,
            }
        })
        UserDefaults.objectForKey("userInfo",userInfo => {
            if(userInfo){
                const { dispatch } = this.props;
                getUserInfo(userInfo["LOGIN_USER_ID"], res=>{ dispatch(res);});
                getVIPInfo(userInfo["LOGIN_USER_ID"],res=>{ dispatch(res);});
                // getCarInfo(userInfo["LOGIN_USER_ID"],res=>{
                //     dispatch(res);
                // });

            }else{
                ly_Toast("您还有登录吗")
                return
            }
        })
    }

     //个人信息
    infoLeft = () => {
        const { login } = this.props
        return(
            <View tabLabel="个人信息">
                <View>
                    <PersonalRow title="姓名" content={login.userInfo.CUST_NAME} />
                    <PersonalRow title="性别" content={login.userInfo.GENDER} />
                    <PersonalRow title="手机号码" content={login.userInfo.CUST_TEL} />
                    <PersonalRow title="省份" content={login.userInfo.PROVINCE} />
                    <PersonalRow title="城市" content={login.userInfo.CITY} />
                    <PersonalRow title="区县" content={login.userInfo.COUNTRY} />
                    <PersonalRow title="详细地址" content={login.userInfo.CUST_ADDR} />
                </View>

            </View>
        )
    }
    //车辆信息
    infoCenter = () => {
        const icon_go = `${IMGURL}/images/icon_link_go2.png`;
        const { carInfo } = this.props.login;
        return(
                <View tabLabel="车辆信息">
                    <View>
                        <TouchableOpacity style={[styles.row,{backgroundColor:"rgba(200,250,100,1)"}]}
                                            onPress={()=>{
                                                this.selectViewLocale.onShow()
                                            }}>
                            <Text style={styles.title}>车牌</Text>
                            <Text style={styles.content}>{this.state.carInfo.carNo}
                            </Text>
                            <Image source={{uri:icon_go}} style={{paddingTop:15,width:10,height:20}} />
                        </TouchableOpacity>
                        <SelectPickerView ref={(p)=>this.selectViewLocale = p}
                                          pickerArr={this.state.carInfoArr}
                                          defaultValue={this.state.carInfo.CAR_NO}
                                          onChange={(itemValue, itemPosition)=> {
                                              this.setState({
                                                  carInfo:{
                                                      carNo:this.state.carInfoArr[itemPosition].CAR_NO,
                                                      vin:this.state.carInfoArr[itemPosition].VIN,
                                                      carSeriesName: this.state.carInfoArr[itemPosition].CAR_SERIES_NAME,
                                                      carColor:this.state.carInfoArr[itemPosition].CAR_COLOR,
                                                      dlrShortName:this.state.carInfoArr[itemPosition].DLR_SHORT_NAME,
                                                      buyDate:this.state.carInfoArr[itemPosition].BUY_DATE,
                                                      lastRepairDate:this.state.carInfoArr[itemPosition].LAST_REPAIR_DATE,
                                                  }
                                              })
                                          }}
                                          type={true}
                        />
                        <PersonalRow title="车系" content={this.state.carInfo.carSeriesName} />
                        <PersonalRow title="车身颜色" content={this.state.carInfo.carColor} />
                        <PersonalRow title="VIN码" content={this.state.carInfo.vin} />
                        <PersonalRow title="购车专营店" content={this.state.carInfo.dlrShortName} />
                        <PersonalRow title="购车日期" content={this.state.carInfo.buyDate} />
                        <PersonalRow title="最后维修日期" content={this.state.carInfo.lastRepairDate} />
                    </View>
                </View>
            )
    }
    //会员信息
    infoRight = () => {
        const icon_code = `${IMGURL}/images/icon_code.png`;
        const  { login } = this.props;
        return(
            <View tabLabel="会员信息">
                <View>
                    <PersonalRow title="会员卡号" content={login.VIPInfo.CARD_NO} />
                    <PersonalRow title="卡级别" content={login.VIPInfo.CARD_DEGREE} />
                    <PersonalRow title="入会时间" content={login.VIPInfo.JOIN_DATE} />
                    <PersonalRow title="有效时间" content={login.VIPInfo.EXPIRS_DATE} />
                    <PersonalRow title="入会专营店" content={login.VIPInfo.JOIN_DLR_SHORT_NAME} />
                </View>
            </View>
        )
    }


    render() {
        if(this.state.loaded){
            return(
                <View style={styles.page}>
                    <NavBar title="个人信息"
                            onBack={()=> {
                                this.props.navigator.pop();
                            }}
                    />
                    <LoaderView/>
                </View>
            )
        }
        const {dispatch} = this.props;
        return (
            <View style={styles.page}>
                <NavBar title="个人信息"
                        onBack={()=> {
                            this.props.navigator.pop();
                        }}
                />
                <ScrollableTabView tabBarActiveTextColor={BTNColor}
                                   tabBarInactiveTextColor={'#b4b4b4'}
                                   tabBarUnderlineColor={BTNColor}
                                   tabBarUnderlineStyle={{backgroundColor: BTNColor}}
                                   renderTabBar={() => <ScrollableTabBar />}
                >
                    {
                        this.infoLeft()
                    }
                    {
                        this.infoCenter()
                    }
                    {
                        this.infoRight()
                    }
                </ScrollableTabView>
            </View>
        )
    }
}

export default connect ((state) => {
    const { login } = state;
    return {
        login
    }
})(PersonalInfoView)

const styles = StyleSheet.create({
    page:{
        backgroundColor:BGColor,
        flex:1
    },
    row:{
        borderBottomWidth:1/pixelRation,
        borderBottomColor:"#d9d9d9",
        flexDirection: "row",
        alignItems:"center",
        padding:10,
        backgroundColor:"#fff",
        justifyContent: "space-between",
    },
    title:{
        color:"#2b2b2b",
        marginLeft:10,
        marginRight:10,
    },
    content:{
        color:"#2b2b2b",
        justifyContent: "center",
        alignItems:"center"
    }
})