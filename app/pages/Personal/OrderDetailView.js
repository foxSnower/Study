'use strict';
import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

import {connect} from 'react-redux';
// util
// action
import {fetchOrderDetail} from '../../actions/personalAction';
// common component
import Button from '../../components/Button';
import NavBar from '../../components/DefaultNavBar';
import Loader from '../../components/LoaderView';
import CarInfo from '../Business/CarInfo'
import LabelRow from '../../components/LabelRow'
import {IMGURL} from '../../utils/RequestURL'
import { BGColor,BORDERColor,pixel1 ,BTNColor,Screen} from '../../utils/CommonUtil'


class OrderView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    componentDidMount() {
        const {dispatch, orderId,orderName} = this.props;

        // 
        fetchOrderDetail(orderId, (action)=> {
            dispatch(action);
            this.setState({
                loaded: true
            });
        });
    }




    //取消维修预约
    handleReapirCancelBook = () => {

    }

    //处理不同的状态情况 ( 维修
    handleRepairStatus = (status) => {
        //0申请中，1已确认，2已回厂 ，3已评价 -2已取消
        if(status == "0"){
            return (
                <Button text="取消"
                        style={styles.btn}
                        onPress={this.handleReapirCancelBook}/>
            )
        }else if(status == "1"){
            return (
                <Button text="已确认"
                        style={[styles.btn,{backgroundColor: "#666"}]}
                        disabled={true} />
            )

        }else if(status == "2"){
            return (
                <Button text="待评价"
                        style={[styles.btn,{backgroundColor: "#666"}]}
                        disabled={true} />
            )
        }else if(status == "3"){
            return (
                <Button text="已评价"
                        style={[styles.btn,{backgroundColor: "#666"}]}
                        disabled={true} />
            )
        }else{
            return (
                <Button text="已取消"
                        style={[styles.btn,{backgroundColor: "#666"}]}
                        disabled={true} />
            )
        }
    }

    //处理不同的状态情况 ( 保养
    handleMaintainStatus = () => {
        //0申请中，1已确认，2已回厂 ，3已评价 -2已取消
        if(status == "0"){
            return (
                <Button text="取消"
                        style={[styles.btn]}
                        onPress={this.handleMaintainCancelBook}/>
            )
        }else if(status == "1"){
            return (
                <Button text="已确认"
                        style={[styles.btn,{backgroundColor: "#666"}]}
                        disabled={true} />
            )

        }else if(status == "2"){
            return (
                <Button text="待评价"
                        style={[styles.btn,{backgroundColor: "#666"}]}
                        onPress={this.handleMaintainComment} />
            )
        }else if(status == "3"){
            return (
                <Button text="已评价"
                        style={[styles.btn,{backgroundColor: "#666"}]}
                        disabled={true} />
            )
        }else{
            return (
                <Button text="已取消"
                        style={[styles.btn,{backgroundColor: "#666"}]}
                        disabled={true} />
            )
        }
    }

    //取消代办预约
    handleCommissonCancelBook = () => {

    }

    //处理不同的状态情况 ( 代办
    handleCommissionStatus = (status) => {
        //0申请中，1代办中，2已完成 ，-2已取消
        if(status == "0"){
            return (
                <Button text="取消"
                        style={[styles.btn]}
                        onPress={this.handleCommissonCancelBook}/>
            )
        }else if(status == "1"){
            return (
                <Button text="代办中"
                        style={[styles.btn,{backgroundColor: "lime"}]}
                        disabled={true} />
            )

        }else if(status == "2"){
            return (
                <Button text="已完成"
                        style={[styles.btn,{backgroundColor: "#666"}]}
                        disabled={true} />
            )
        }else{
            return (
                <Button text="已取消"
                        style={[styles.btn,{backgroundColor: "#666"}]}
                        disabled={true} />
            )
        }
    }

    //处理不同的状态情况 ( 试驾
    handleTestDriveStatus = (status) => {
    //0申请中，1已确认，2已回厂 ，3已评价 -2已取消
        if(status == "0"){
            return (
                <Button text="申请中"
                        style={[styles.btn]}
                        disabled={true} />
            )
        }else if(status == "1"){
            return (
                <Button text="1已确认"
                        style={[styles.btn,{backgroundColor: "lime"}]}
                        disabled={true} />
            )

        }else if(status == "2"){
            return (
                <Button text="已回厂"
                        style={[styles.btn,{backgroundColor: "#666"}]}
                        disabled={true} />
            )
        }else if(status == "3"){
            return (
                <Button text="已评价"
                        style={[styles.btn,{backgroundColor: "#666"}]}
                        disabled={true} />
            )
        }else{
            return (
                <Button text="已取消"
                        style={[styles.btn,{backgroundColor: "#666"}]}
                        disabled={true} />
            )
        }
    }

    //按照预约的详情来分
    renderDetailView = (name) => {
        const { personal }  = this.props;
        switch (name){
            case "业务代办":
                return (
                    <View style={styles.bookPage}>
                        <View style={{marginTop:15}}>
                            <LabelRow title="车主姓名" content={personal.orderDetail.CUST_NAME}  />
                            <LabelRow title="手机号" content={personal.orderDetail.CUST_TEL}  />
                        </View>
                        <View style={{marginTop:15}}>
                            <LabelRow title="代办专营店" content={personal.orderDetail.DLR_SHORT_NAME}  />
                            <LabelRow title="期望完成时间" content={personal.orderDetail.EXPECT_FINISH_TIME}  />
                        </View>
                        <View style={{paddingHorizontal:10}}>
                            <Text style={{paddingVertical:5}}>车辆业务</Text>
                            <Text style={styles.cellView}>{personal.orderDetail.AGENT_NAME}</Text>
                        </View>
                        <View style={{paddingHorizontal:10}}>
                            <Text style={{paddingVertical:5}}>故障描述</Text>
                            <Text style={styles.cellView}>{personal.orderDetail.REMARK}</Text>
                        </View>
                        {
                            this.handleCommissionStatus(personal.orderDetail.STATUS)
                        }
                    </View>
                )
            case "维修预约":
                return (
                    <View style={styles.bookPage}>
                        <View style={{marginTop:15}}>
                            <LabelRow title="车主姓名" content={personal.orderDetail.CUST_NAME}  />
                            <LabelRow title="手机号" content={personal.orderDetail.RESERVE_TEL}  />
                        </View>
                        <View style={{marginTop:15}}>
                            <LabelRow title="维修专营店" content={personal.orderDetail.DLR_SHORT_NAME}  />
                            <LabelRow title="维修时间" content={personal.orderDetail.BOOK_TIME}  />
                        </View>
                        <View style={{paddingHorizontal:10}}>
                            <Text style={{paddingVertical:5}}>图片</Text>
                            <Text style={styles.cellView}><Image source={{uri:personal.DETAIL}}
                                                                 resizeMode="contain"
                                                                 style={{width:50,height:50}} /></Text>
                        </View>
                        <View style={{paddingHorizontal:10}}>
                            <Text style={{paddingVertical:5}}>故障描述</Text>
                            <Text style={styles.cellView}>{personal.orderDetail.CS_DESC}</Text>
                        </View>
                        {
                            this.handleRepairStatus(personal.orderDetail.STATUS)
                        }
                    </View>
                )
            case "保养预约":
                return (
                    <View style={styles.bookPage}>
                        <View style={styles.bookPage}>
                            <View style={{marginTop:15}}>
                                <LabelRow title="车主姓名" content={personal.orderDetail.CUST_NAME}  />
                                <LabelRow title="手机号" content={personal.orderDetail.CUST_TEL}  />
                            </View>
                            <View style={{marginTop:15}}>
                                <LabelRow title="维修专营店" content={personal.orderDetail.DLR_SHORT_NAME}  />
                                <LabelRow title="维修时间" content={personal.orderDetail.BOOK_TIME}  />
                            </View>
                            <View style={{paddingHorizontal:10}}>
                                <Text style={{paddingVertical:5}}>保养里程</Text>
                                <Text style={styles.cellView}>{personal.orderDetail.MILEAGE}</Text>
                            </View>
                            {
                                this.handleMaintainStatus(personal.orderDetail.STATUS)
                            }
                        </View>
                    </View>
                )
            case "试驾预约":
                return (
                    <View style={styles.bookPage}>
                        <CarInfo imgUrl ={personal.orderDetail.img}
                                 carType={personal.orderDetail.CAR_SERIES_NAME}
                                 level={personal.orderDetail.CAR_LEVEL}
                                 minprice={personal.orderDetail.MIN_GUID_PRICE}
                                 maxprice={personal.orderDetail.MAX_GUID_PRICE} />
                        <View style={{marginTop:15}}>
                            <LabelRow title="车主姓名" content={personal.orderDetail.CUST_NAME}  />
                            <LabelRow title="手机号" content={personal.orderDetail.CUST_TEL}  />
                        </View>
                        <View style={{marginTop:15}}>
                            <LabelRow title="试驾专营店" content={personal.orderDetail.DLR_SHORT_NAME}  />
                            <LabelRow title="预约时间" content={personal.orderDetail.BOOK_TIME}  />
                        </View>
                        {
                            this.handleTestDriveStatus(personal.orderDetail.STATUS)
                        }

                    </View>
                )
        }
    }

    render() {
        const {orderName, personal} = this.props;
        if(!this.state.loaded) {
            return (
                <View style = {styles.container}>
                    <NavBar
                        title = {`${orderName}详情`}
                        onBack = {()=> {
                            this.props.navigator.pop()
                        }}
                    />
                    <Loader />
                </View>
            )
        }
        //alert(JSON.stringify(personal))
        return (
            <View style = {styles.container}>
                <NavBar
                    title = {`${orderName}详情`}
                    onBack = {()=> {
                        this.props.navigator.pop()
                    }}
                />
                {
                    this.renderDetailView(orderName)
                }
            </View>

        )
    }
}

export default connect((state)=> {
    const {personal} = state
    return {
        personal
    }
})(OrderView)


let styles = StyleSheet.create({
    btn:{
        marginTop:25,
        marginBottom:6,
        width: Screen.width - 40,
        backgroundColor: BTNColor,
        alignSelf: "center",
        borderRadius: 8
    },
    container: {
        flex: 1,
        backgroundColor:BGColor
    },
    img: {
        width: 80,
        height: 60
    },
    cellView:{
        marginTop:6,
        alignItems:"center",
        justifyContent:"center",
        borderColor:BORDERColor,
        borderWidth:pixel1,
        borderRadius:10,
        backgroundColor:"#fff",
        paddingVertical:15,
        paddingHorizontal:15

    }
})