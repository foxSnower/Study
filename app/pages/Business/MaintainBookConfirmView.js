/**
 * Created by 楚寒 on 2016/10/6.
 */
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    ListView,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux'
import NavBar from '../../components/DefaultNavBar'
import {IMGURL} from '../../utils/RequestURL'
import {BGColor,BORDERColor,BTNColor, pixel1,ly_Toast,Screen} from '../../utils/CommonUtil'
import LabelRow from '../../components/LabelRow'
import LabelInput from '../../components/LabelInput'
import Button from '../../components/Button'
import DLRView from './DLRView'
import UserDefaults from '../../utils/GlobalStorage'
import LoaderView from '../../components/LoaderView'
import { updateBook, checkCarInfo,handleMaintainBook} from '../../actions/bookAction';


class MaintainBookConfirmView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded:false,
            dataSourceCheck: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            dataSourceChange: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            WORKITEM_MONEY:'',
            COUNT : '',
            PART_FEE : '',
        }
    }
    reloadDataSourec = (arrChange,arrCheck) => {
        this.setState({
            dataSourceChange: this.state.dataSourceChange.cloneWithRows(arrChange),
            dataSourceCheck: this.state.dataSourceCheck.cloneWithRows(arrCheck)
        })
    };

    maintainBook = () => {
        const { dispatch,CUST_NAME,CUST_MOBILE,DLR_SHORT_NAME,DLR_CODE,MILE,CAR_NO,VIN,CAR_SERIES_CODE } = this.props;
        UserDefaults.objectForKey("userInfo",data  => {
            //ly_Toast("1241324"+data,20000)
            if(data){
                dispatch(handleMaintainBook(data["LOGIN_USER_ID"]),CUST_NAME,CUST_MOBILE,VIN,CAR_NO,data['CARD_NO'],DLR_CODE,MILE,res => {
                    alert(JSON.stringify(res))
                })
            }else{
                console.log("没有获取到用户信息?")
            }

        })

    };
    componentDidMount() {
        const { dispatch, CAR_SERIES_CODE,DLR_CODE,MILE } = this.props;
        if (MILE) {
            let mile_int = parseInt(MILE);
            var mile_parameter = '';
            var feeType = '';
            if (mile_int <= 5000) {
                mile_parameter = '每5000公里以内';
                feeType = 'A';
            } else if ((mile_int > 5000 && mile_int <= 10000) || (mile_int > 20000 && mile_int <= 30000)
                || (mile_int > 40000 && mile_int <= 50000) || (mile_int > 60000 && mile_int <= 70000)
                || (mile_int > 80000 && mile_int <= 90000)
            ) {
                mile_parameter = '1/3/5/7/9万公里';
                feeType = 'B';
            } else if ((mile_int > 10000 && mile_int <= 20000) || (mile_int > 50000 && mile_int <= 60000)) {
                mile_parameter = '2/6万公里';
                feeType = 'C';
            } else if ((mile_int > 30000 && mile_int <= 40000) || (mile_int > 70000 && mile_int <= 80000)) {
                mile_parameter = '4/8万公里';
                feeType = 'D';
            } else if ((mile_int > 30000 && mile_int <= 40000) || (mile_int > 70000 && mile_int <= 80000)) {
                mile_parameter = '10万公里';
                feeType = 'E';
            } else {
                return;
            }
        }
        dispatch(checkCarInfo(CAR_SERIES_CODE,DLR_CODE,mile_parameter,(result)=>{
            var checkItem = result.DATA.CHECKITEM;  /*更换检查项*/
            var payment = '';
            if (result.DATA.PAYMENT) {
                payment = result.DATA.PAYMENT[0];    /*查询费用*/
            }
            switch (feeType) {
                case 'A':
                    this.setState({
                        WORKITEM_MONEY : payment.WORKITEM_MONEY_A,
                        COUNT : payment.COUNT_A,
                        PART_FEE : payment.PART_FEE_A,
                    })
                    break;
                case 'B':
                    this.setState({
                        WORKITEM_MONEY : payment.WORKITEM_MONEY_B,
                        COUNT : payment.COUNT_B,
                        PART_FEE : payment.PART_FEE_B,
                    })
                    break;
                case 'C':
                    this.setState({
                        WORKITEM_MONEY : payment.WORKITEM_MONEY_C,
                        COUNT : payment.COUNT_C,
                        PART_FEE : payment.PART_FEE_C,
                    })
                    break;
                case 'D':
                    this.setState({
                        WORKITEM_MONEY : payment.WORKITEM_MONEY_D,
                        COUNT : payment.COUNT_D,
                        PART_FEE : payment.PART_FEE_D,
                    })
                    break;
                case 'E':
                    this.setState({
                        WORKITEM_MONEY : payment.WORKITEM_MONEY_E,
                        COUNT : payment.COUNT_E,
                        PART_FEE : payment.PART_FEE_E,
                    })
                    break;
            }

            var arrChange = [];
            var arrCheck = [];

            if(checkItem || checkItem.length<=0){
                for(let i=0;i<checkItem.length;i++){
                    if (checkItem[i].LOOKUP_VALUE_NAME == '定期检查项目') {
                        arrCheck.push(checkItem[i].SERVICE_ITEM_NAME)
                    }
                    if (checkItem[i].LOOKUP_VALUE_NAME == '定期更换项目') {
                        arrChange.push(checkItem[i].SERVICE_ITEM_NAME)
                    }
                }
            }else{
                arrChange.push("暂无数据")
                arrCheck.push("暂无数据")
            }
            //ly_Toast("checkItem"+JSON.stringify(result.DATA),20000)

            this.reloadDataSourec(arrChange,arrCheck)
            this.setState({
                loaded:true
            })
        }))

    }
    render(){
        if(!this.state.loaded){
            return (
                <View style={styles.container}>
                    <NavBar title="参考价格"
                            onBack={()=> {
                                this.props.navigator.pop()
                            }}
                    />
                    <LoaderView/>
                </View>
            )
        }else {
            const {CAR_SERIES_NAME} = this.props;
            return (
                <View style={{flex: 1, backgroundColor: BGColor}}>
                    <NavBar title="参考价格"
                            onBack={()=> {
                                this.props.navigator.pop()
                            }}
                    />
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        <View>
                            <LabelRow title="车型"
                                      content={`${CAR_SERIES_NAME}`}
                            />
                            <LabelRow title="总价"
                                      content={`￥ ${this.state.COUNT ? this.state.COUNT : 0}`}
                            />
                            <LabelRow title="零件费"
                                      content={`￥ ${this.state.PART_FEE ? this.state.PART_FEE : 0}`}
                            />
                            <LabelRow title="工时费"
                                      content={`￥ ${this.state.WORKITEM_MONEY ? this.state.WORKITEM_MONEY : 0}`}
                            />
                        </View>
                        <View>
                            <View>
                                <Text style={{paddingHorizontal: 20, paddingVertical: 5}}>更换明细</Text>
                                <ListView
                                    dataSource={this.state.dataSourceChange}
                                    renderRow={this.renderCell}
                                    style={styles.listView}
                                    enableEmptySections={true}
                                />
                            </View>
                            <View>
                                <Text style={{paddingHorizontal: 20, paddingVertical: 5}}>检查明细</Text>
                                <ListView
                                    dataSource={this.state.dataSourceCheck}
                                    renderRow={this.renderCell}
                                    style={styles.listView}
                                    enableEmptySections={true}
                                />
                            </View>
                        </View>
                        <Button text="立即预约"
                                style={{
                                    marginTop: 20,
                                    width: Screen.width - 40,
                                    backgroundColor: BTNColor,
                                    alignSelf: "center",
                                    borderRadius: 8
                                }}
                                onPress={this.maintainBook}
                        />
                    </ScrollView>

                </View>
            )
        }
    }

    renderCell = (rowData, sectionID, rowID, highlightRow) => {
        return (
            <View style={styles.cellView}>
                <Text>{rowData}</Text>
            </View>
        );
    }
}
export default connect((state)=>{
    const {book} = state;
    return {
        book
    }
})(MaintainBookConfirmView)

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    cellView:{
        backgroundColor:"#fff",
        borderBottomWidth:pixel1,
        borderColor:BORDERColor,
        paddingHorizontal:20,
        paddingVertical:10
    }
})