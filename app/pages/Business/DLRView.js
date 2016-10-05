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

import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons';
import { ly_Toast,Screen,BGColor,BORDERColor,pixel1} from '../../utils/CommonUtil';
import { IMGURL } from '../../utils/RequestURL';
import NavBar from '../../components/DefaultNavBar';
import SearchInput from '../../components/SearchInput';
import {updateDlr,getCityData,searchDlr} from '../../actions/dlrAction'
import UserDefaults from '../../utils/GlobalStorage';
import SelectPickerView from '../../components/SelectPickerView';
import DLRMapView from './DLRMapView';

let pageIndex =0;
class DLRView extends Component {
    constructor(props) {
        super(props);
         const {dispatch} = this.props;
         dispatch(getCityData());
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
        };
    }

    componentDidMount() {
        this.pulldown();
    }

    //查询专营店列表


    pulldown = () => {

        pageIndex = 1;
        const {dispatch}= this.props;
        const { dlrName } = this.props.dlr;
        dispatch(searchDlr({DLR_NAME:"风日"},1,(dlrList)=>{
            this.reloadDataSourec(dlrList)
        }))

        // UserDefaults.objectForKey("locationInfo",(data)=>{
        //     let params ={};
        //     if(!data || data["LNG"]){  //没有获取到地理位置
        //         params.LNG = '113.13';
        //         params.LAT = '23.23';
        //         // dispatch(getDlrList(params,1, (data) => {
        //         //     dispatch(updateDlr({dlrList: data}));
        //              this.reloadDataSourec(data);
        //         //     pageIndex = 2;
        //         // }));
        //     }else{
        //         // params.CITY_ID = data["CITY"];
        //         // params.PROVINCE_ID = '23.23';
        //     }
        // })

    };

    pullup = () => {
        if (pageIndex > 1) {
            pageIndex++;
            const {dispatch, dlr} = this.props;
            dispatch(updateDlr(pageIndex, (data) => {
                if (data.length > 0) {
                    let arr = dlr.dlrList;
                    arr.push(...data);
                    //dispatch(updateDlr({dlrList: arr}));
                    this.reloadDataSourec(arr);
                } else {
                    ly_Toast("已经到底啦o_O",3000);
                    //alert('没有更多了')
                }
            }));
        }
    };

    reloadDataSourec = (arr) => {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(arr)
        })
    };
    render() {
        const { dispatch } = this.props;
        const { province_id,province_name,arr_province} = this.props.dlr;
        return (
            <View style={styles.container}>
                <NavBar title="4S店查询"
                        onBack={()=> {
                            this.props.navigator.pop()
                        }}
                />
                <View style={{backgroundColor:BGColor}}>
                    <SearchInput placeholder="请输入专营店名称"
                                 style={{backgroundColor:"#fff"}}
                                 onChangeText={(text)=>{
                                     dispatch(updateDlr({dlrName:text}))
                                 }}
                                 onSubmit={()=>{
                                     this.pulldown();

                                 }
                                    // this.searchDlrList
                                 }/>
                    <View style={{flexDirection:"row",paddingLeft:10,paddingRight:10}}>
                        <TouchableOpacity style={[styles.dropdown,{marginRight:10}]} onPress={()=>{
                            this.selectViewLocale.onShow()
                        }}>
                            <Text style={styles.text}>{province_name}</Text>
                            <Icon style={styles.icon}
                                  name="ios-arrow-dropdown" size={28} color='#d9d9d9'/>

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dropdown} onPress={()=>{
                            this.selectViewLocale2.onShow()
                        }}>
                            <Text style={styles.text}>1242</Text>
                            <Icon style={styles.icon}
                                  name="ios-arrow-dropdown" size={28} color='#d9d9d9'/>

                        </TouchableOpacity>
                        <SelectPickerView ref={(p)=>this.selectViewLocale =p}
                                          pickerArr={arr_province}
                                          defaultValue={2}//这个默认值对应的是 id
                                          onChange={(itemValue,itemPosition)=>{
                                             // dispatch(updateDlr({province_name:itemValue}))
                                              console.log(itemValue,itemPosition)
                                          }}
                                          pickerItem = {(v,k)=>{
                                              return (
                                                  <Picker.Item label={v.PROVINCE_NAME} value={v.PROVINCE_ID} key={k}/>
                                              )
                                          }}
                        />
                        <SelectPickerView ref={(p)=>this.selectViewLocale2 =p}
                                          pickerArr={[
                                              {name:'北京',id:1},{name:'上海',id:2},{name:'山东',id:3}
                                          ]}
                                          defaultValue={2}//这个默认值对应的是 id
                                          onPressConfirm ={(itemValue, itemPosition)=>{
                                              dispatch(updateDlr({dlrName:text}))
                                              //alert(itemValue,itemPosition);//你分开打印
                                          }}
                        />
                    </View>
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
        )
    }
    renderCell = (rowData, sectionID, rowID, highlightRow) => {
        alert(JSON.stringify(rowData))
        let icon = `${IMGURL}/images/icon-shop.png`;
        let pos = `${IMGURL}/images/icon_adrs.png`;
        let map = `${IMGURL}/images/shop_GPS.png`;
        let tel = `${IMGURL}/images/shop_tel.png`;
        ly_Toast(icon)
        return (
            <View style={styles.cellView}>
                <View style={{flexDirection:"row",marginTop:8,paddingBottom:8,borderBottomWidth:pixel1,borderColor:BORDERColor}}>
                    <Image style={styles.dlrImg}
                           source={{uri:icon}}
                    resizeMode="contain" />

                    <View style={{flex:1}}>
                        <Text style={{fontSize:18,color:"#000",height:25}}>{rowData.DLR_SHORT_NAME}
                            <Image style={styles.dlrPos}
                                   source={{uri:pos}}
                                   resizeMode="contain" />
                            <Text style={{fontSize:14}}>{rowData.DISTANCE}</Text>
                        </Text>

                        <Text style={{alignItems:"flex-end",height:25}}>{rowData.LINK_ADDR}</Text>
                    </View>
                </View>
                <View style={{flex:1,flexDirection:"row"}}>
                    <TouchableOpacity onPress={()=>{
                                            this.props.navigator.push({
                                                component:DLRMapView,
                                                params:{
                                                    LAT:rowData.LAT,
                                                    LNG:rowData.LNG,
                                                }
                                            })
                                        }}
                                      style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                        <Image style={styles.map}
                               source={{uri:map}}
                               resizeMode="contain" >

                        </Image>
                        <Text style={{fontSize:18,marginLeft:15}}>地图</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                                Linking.openURL(`tel:${rowData.SERVICE_TEL}`);
                                    }}
                                      style={{flex:1,flexDirection:"row",borderLeftWidth: pixel1,borderColor:BORDERColor,justifyContent:"center",alignItems:"center"}}>
                        <Image style={styles.map}
                               source={{uri:tel}}
                               resizeMode="contain" >

                        </Image>
                        <Text style={{fontSize:18,marginLeft:15}}>电话</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default connect ((state) => {
    const { dlr } = state;
    return {
        dlr
    }
})(DLRView)
const styles = StyleSheet.create({
    cellView:{
        height:110,
        marginTop:10,
        backgroundColor:"#fff",
    },
    container:{
        flex: 1,
        backgroundColor:BGColor,
    },
    dropdown:{
        flex:1,
        justifyContent:"flex-end",
        flexDirection:"row",
        paddingRight:10,
        width:(Screen.width - 30)*0.5,
        height:40,
        alignItems:"center",
        borderWidth:1,
        borderColor:"#d9d9d9",
        borderRadius:10,
        backgroundColor:"#fff",
    },
    text:{
        flex:1,
        fontSize:16,
        color:"#2b2b2b",
        justifyContent:"center",
        textAlign:"center"
    },
    dlrImg:{
        width:50,
        height:50,
        marginLeft:10,
        marginRight:10
    },
    dlrPos:{
        width:10,
        height:10,
        marginTop:5
    },
    map:{
        width:20,
        height:20,
    }
})
