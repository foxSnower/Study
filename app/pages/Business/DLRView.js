import React, {Component} from 'react';
import{
    Text,
    TextInput,
    View,
    StyleSheet,
    ListView,
    Linking,
    RefreshControl,
    TouchableOpacity,
    Image,
    PickerIOS,
    Platform
}from 'react-native';

import PickerAndroid from '../../components/PickerAndroid';

let Picker = Platform.OS === 'ios' ? PickerIOS : PickerAndroid;

import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons';
import {ly_Toast, Screen, BGColor, BORDERColor, pixel1} from '../../utils/CommonUtil';
import {IMGURL} from '../../utils/RequestURL';
import NavBar from '../../components/DefaultNavBar';
import SearchInput from '../../components/SearchInput';
import {updateDlr, getCityData, searchDlr} from '../../actions/dlrAction'
import UserDefaults from '../../utils/GlobalStorage';
import SelectPickerView from '../../components/SelectPickerView';
import DLRMapView from './DLRMapView';
import LoaderView from '../../components/LoaderView'

let pageIndex = 0;
class DLRView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded:false,
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
        };
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(getCityData());
        this.pulldown();
    }

    //查询专营店列表


    pulldown = () => {

        pageIndex = 1;
        const {dispatch}= this.props;
        const { province_id, city_id,dlrName } =this.props.dlr;
        //UserDefaults.objectForKey("locationInfo",(data)=>{
            let params ={};
            if(dlrName && dlrName!=null){
                params.DLR_NAME = dlrName;
            }
           // if(data && data != null){  //获取到地理位置
           //     params.LNG = data["LNG"];
          //      params.LAT = data["LAT"];
                params.PROVINCE_ID = province_id;
                params.CITY_ID = city_id;
                ly_Toast(JSON.stringify(params))
                dispatch(searchDlr(params, 1, (dlrList)=> {
                    this.setState({
                        loaded:true
                    })
                    this.reloadDataSourec(dlrList)
                }));
           // }else{
           //     ly_Toast("无法获取到定位信息",2000,0);
           // }
        //})

    };

    pullup = () => {
        if (pageIndex > 1) {
            pageIndex++;
            const {dispatch}= this.props;
            const { province_id, city_id,dlrName } =this.props.dlr;
            let params ={};
            if(dlrName && dlrName!=null){
                params.DLR_NAME = dlrName;
            }
            params.PROVINCE_ID = province_id;
            params.CITY_ID = city_id;
            ly_Toast(JSON.stringify(params))
            dispatch(searchDlr(params, 1, (dlrList)=> {
                this.setState({
                    loaded:true
                })
                this.reloadDataSourec(dlrList)
            }));
        }
    };

    reloadDataSourec = (arr) => {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(arr)
        })
    };

    render() {
        if(!this.state.loaded){
            return (
                <View style={styles.container}>
                    <NavBar title="4S店查询"
                            onBack={()=> {
                                this.props.navigator.pop()
                            }}
                    />
                    <LoaderView/>
                </View>
            )
        }else{
            const {dispatch} = this.props;
            const {province_id, province_name,city_name,city_id, provinceArr, cityArr} = this.props.dlr;

            return (
                <View style={styles.container}>
                    <NavBar title="4S店查询"
                            onBack={()=> {
                                this.props.navigator.pop()
                            }}
                    />
                    <View style={{backgroundColor: BGColor, flex: 1}}>
                        <SearchInput placeholder="请输入专营店名称"
                                     style={{backgroundColor: "#fff"}}
                                     onChangeText={(text)=> {
                                         dispatch(updateDlr({dlrName: text}))
                                     }}
                                     onSubmit={()=> {
                                         this.pulldown();
                                     }}
                        />
                        <View style={{flexDirection: "row", paddingLeft: 10, paddingRight: 10,paddingBottom:10}}>
                            <TouchableOpacity style={[styles.dropdown, {marginRight: 10}]} onPress={()=> {
                                this.selectViewLocale.onShow()
                            }}>
                                <Text style={styles.text}>{province_name}</Text>
                                <Icon style={styles.icon}
                                      name="ios-arrow-dropdown" size={28} color='#d9d9d9'/>

                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdown} onPress={()=> {
                                this.selectViewCity.onShow()
                            }}>
                                <Text style={styles.text}>{city_name}</Text>
                                <Icon style={styles.icon}
                                      name="ios-arrow-dropdown" size={28} color='#d9d9d9'/>

                            </TouchableOpacity>
                            <SelectPickerView ref={(p)=>this.selectViewLocale = p}
                                              pickerArr={provinceArr}
                                              defaultValue={province_id}
                                              onChange={(itemValue, itemPosition)=> {
                                                  dispatch(updateDlr({province_id: provinceArr[itemPosition].PROVINCE_ID}));
                                                  dispatch(updateDlr({province_name: provinceArr[itemPosition].PROVINCE_NAME}));
                                                  dispatch(updateDlr({city_name: provinceArr[itemPosition].CITIES[0].CITY_NAME}));
                                                  dispatch(updateDlr({city_id: provinceArr[itemPosition].CITIES[0].CITY_ID}));
                                                  dispatch(updateDlr({cityArr: provinceArr[itemPosition].CITIES}))

                                              }}
                                              onPressConfirm={
                                                  this.pulldown
                                              }
                                              type={true}
                            />
                            <SelectPickerView ref={(p)=>this.selectViewCity = p}
                                              pickerArr={cityArr}
                                              defaultValue={city_id}
                                              onChange={(itemValue, itemPosition)=> {
                                                  //dispatch(updateDlr({province_id: provinceArr[itemPosition].PROVINCE_ID}));
                                                  dispatch(updateDlr({city_name: cityArr[itemPosition].CITY_NAME}));
                                                  dispatch(updateDlr({city_id: cityArr[itemPosition].CITY_ID}));
                                              }}
                                              type={false}
                                              onPressConfirm={
                                                  this.pulldown
                                              }
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <ListView
                                dataSource={this.state.dataSource}
                                renderRow={this.renderCell}
                                style={styles.listView}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={false}
                                        onRefresh={this.pulldown}
                                        colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
                                        progressBackgroundColor="#ffffff"/>
                                }
                                onEndReachedThreshold={5}
                                onEndReached={this.pullup}
                                enableEmptySections={true}
                            />
                        </View>
                    </View>
                </View>
            )
        }

    }

    renderCell = (rowData, sectionID, rowID, highlightRow) => {
        //  alert(JSON.stringify(rowData))
        let icon = `${IMGURL}/images/icon-shop.png`;
        let pos = `${IMGURL}/images/icon_adrs.png`;
        let map = `${IMGURL}/images/shop_GPS.png`;
        let tel = `${IMGURL}/images/shop_tel.png`;
        // 1,保养 2,维修 3,代办 4,试驾 5,救援
        // DLR_SHORT_NAME LINK_ADDR SALE_TEL SERVICE_TEL URG_SOS_TEL INSURANCE_TEL
        //LNG LAT DLR_CODE
        //alert(JSON.stringify(rowData));
        return (
            <View style={styles.cellView}>
                <TouchableOpacity onPress={()=>{
                    const { refDlr } = this.props;
                    if(refDlr){
                        let dlrInfo = {DLR_CODE:rowData.DLR_CODE,DLR_SHORT_NAME:rowData.DLR_SHORT_NAME};
                        let secures = {DLR_SHORT_NAME:rowData.DLR_SHORT_NAME,URG_SOS_TEL:rowData.URG_SOS_TEL,INSURANCE_TEL:rowData.INSURANCE_TEL};
                        switch(refDlr){
                            case "1":
                                this.props.getDlrInfo(dlrInfo);
                                if(this.props.navigator){
                                    this.props.navigator.pop();
                                }
                                break;
                            case "2":
                                this.props.getDlrInfo(dlrInfo);
                                if(this.props.navigator){
                                    this.props.navigator.pop();
                                }
                                break;
                            case "3":
                                this.props.getDlrInfo(dlrInfo);
                                if(this.props.navigator){
                                    this.props.navigator.pop();
                                }
                                break;
                            case "4":
                                this.props.getDlrInfo(dlrInfo);
                                if(this.props.navigator){
                                    this.props.navigator.pop();
                                }
                                break;
                            case "5":
                                this.props.getDlrInfo(secures);
                                if(this.props.navigator){
                                    this.props.navigator.pop();
                                }
                                break;
                            default:
                                return;
                        }

                    }
                }} style={{
                    flexDirection: "row",
                    marginTop: 8,
                    paddingBottom: 8,
                    borderBottomWidth: pixel1,
                    borderColor: BORDERColor
                }}>
                    <Image style={styles.dlrImg}
                           source={{uri: icon}}
                           resizeMode="contain"/>

                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 18, color: "#000", height: 25}}>{rowData.DLR_SHORT_NAME}
                            <Image style={styles.dlrPos}
                                   source={{uri: pos}}
                                   resizeMode="contain"/>
                            <Text style={{fontSize: 14}}>{rowData.DISTANCE}</Text>
                        </Text>

                        <Text style={{alignItems: "flex-end"}}>{rowData.LINK_ADDR}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <TouchableOpacity onPress={()=> {
                        this.props.navigator.push({
                            component: DLRMapView,
                            params: {
                                LAT: rowData.LAT,
                                LNG: rowData.LNG,
                            }
                        })
                    }}
                                      style={{
                                          flex: 1,
                                          flexDirection: "row",
                                          justifyContent: "center",
                                          alignItems: "center"
                                      }}>
                        <Image style={styles.map}
                               source={{uri: map}}
                               resizeMode="contain">

                        </Image>
                        <Text style={{fontSize: 18, marginLeft: 15}}>地图</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> {
                        Linking.openURL(`tel:${rowData.SERVICE_TEL}`);
                    }}
                                      style={{
                                          flex: 1,
                                          flexDirection: "row",
                                          borderLeftWidth: pixel1,
                                          borderColor: BORDERColor,
                                          justifyContent: "center",
                                          alignItems: "center"
                                      }}>
                        <Image style={styles.map}
                               source={{uri: tel}}
                               resizeMode="contain">

                        </Image>
                        <Text style={{fontSize: 18, marginLeft: 15}}>电话</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default connect((state) => {
    const {dlr} = state;
    return {
        dlr
    }
})(DLRView)

const styles = StyleSheet.create({
    cellView: {
        height: 110,
        marginTop: 10,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        backgroundColor: BGColor,
    },
    dropdown: {
        flex: 1,
        justifyContent: "flex-end",
        flexDirection: "row",
        paddingRight: 10,
        width: (Screen.width - 30) * 0.5,
        height: 40,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#d9d9d9",
        borderRadius: 10,
        backgroundColor: "#fff",
    },
    text: {
        flex: 1,
        fontSize: 16,
        color: "#2b2b2b",
        justifyContent: "center",
        textAlign: "center"
    },
    dlrImg: {
        width: 50,
        height: 50,
        marginLeft: 10,
        marginRight: 10
    },
    dlrPos: {
        width: 10,
        height: 10,
        marginTop: 5
    },
    map: {
        width: 20,
        height: 20,
    },
    listView: {
       // marginTop: 8
    },

});
