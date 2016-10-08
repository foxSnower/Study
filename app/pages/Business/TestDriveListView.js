import React, {Component} from 'react';
import {
    StyleSheet,
    ListView,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import {BTNColor} from '../../utils/CommonUtil'
import {IMGURL} from '../../utils/RequestURL'
import TestDriveCommentList from './TestDriveCommentList'
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

// let sourceData = {
//     Family: [
//         {name: '张三', description: '今天天气不错', group: 'Family'},
//         {name: '张三', description: '今天天气不错', group: 'Family'},
//         {name: '张三', description: '今天天气不错', group: 'Work'},
//         {name: '张三', description: '今天天气不错', group: 'Family'},
//         {name: '张三', description: '今天天气不错', group: 'Work'},
//         {name: '张三', description: '今天天气不错', group: 'Work'},
//         {name: '张三', description: '今天天气不错', group: 'Work'},
//         {name: '张三', description: '今天天气不错', group: 'Family'},
//         {name: '张三', description: '今天天气不错', group: 'Family'},
//         {name: '张三', description: '今天天气不错', group: 'Work'},
//     ],
//     Work: [
//         {name: '张三', description: '今天天气不错', group: 'Family'},
//         {name: '张三', description: '今天天气不错', group: 'Family'},
//         {name: '张三', description: '今天天气不错', group: 'Work'},
//         {name: '张三', description: '今天天气不错', group: 'Family'},
//         {name: '张三', description: '今天天气不错', group: 'Work'},
//     ],
//     Haaas: [
//         {name: '张三', description: '今天天气不错', group: 'Family'},
//         {name: '张三', description: '今天天气不错', group: 'Family'},
//         {name: '张三', description: '今天天气不错', group: 'Work'},
//         {name: '张三', description: '今天天气不错', group: 'Family'},
//         {name: '张三', description: '今天天气不错', group: 'Work'},
//     ]
// };

export default class TestDriveListView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
            }),

        }
    }

    _renderFriendRow = (friend, sectionID, rowID) => {

        return (
            <View style={styles.sectionHeader}>

                <Image style={{flex:1,width:60,height:60}}
                       source={{uri:`${IMGURL}${friend.CAR_IMAGE}`}}
                       resizeMode="contain"/>
                <View style={{flex:2}}>
                    <Text style={{color:"#2b2b2b",fontSize:14}}>{friend.CAR_SERIES_CN}</Text>
                    <Text style={{fontSize:12,marginTop:6,marginBottom:6}}>已关注 {friend.ATTENTION_RATE}</Text>
                    <Text style={{fontSize:12}}>{friend.MIN_GRUID_PRICE}万 ~ {friend.MAX_GRUID_PRICE}万</Text>
                </View>
                <TouchableOpacity style={styles.btn}
                                  onPress={()=>{
                                      this.props.navigator.push({
                                          component:TestDriveCommentList,
                                          params:{
                                              CAR_IMAGE:`${IMGURL}${friend.CAR_IMAGE}`,
                                              CAR_SERIES_CN:friend.CAR_SERIES_CN,
                                              MIN_GRUID_PRICE:friend.MIN_GRUID_PRICE,
                                              MAX_GRUID_PRICE:friend.MAX_GRUID_PRICE,
                                              COMMENT_COUNT:friend.COMMENT_COUNT,
                                              CAR_SERIES_CODE:friend.CAR_SERIES_CODE,
                                              LEVEL:sectionID
                                          }
                                      })
                                  }}>
                    <Text style={{color:BTNColor,fontSize:12}}>查看点评({friend.COMMENT_COUNT})</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _renderSectionHeader(friend, sectionID) {

        return (
            <TouchableOpacity style={styles.sectionHeader}>
                <Text style={{color: 'red'}}>{sectionID}</Text>
            </TouchableOpacity>
        )
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <ListView
                    dataSource={this.state.dataSource.cloneWithRowsAndSections(this.props.sourceData)}
                    renderRow={this._renderFriendRow}
                    renderSectionHeader={this._renderSectionHeader}
                >
                </ListView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    sectionHeader: {
        width: SCREEN_WIDTH,
        paddingTop:10,
        paddingBottom:10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderBottomWidth: 0.5,
        borderColor: '#d9d9d9',
        backgroundColor: '#fff'
    },
    btn:{
        flex:1,
        paddingTop:5,
        paddingBottom:5,
        alignItems:"center",
        borderWidth:1,
        borderRadius:8,
        borderColor:BTNColor,
        justifyContent:"center",
    }
});