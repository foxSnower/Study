import React, { Component } from 'react';
import {
    StyleSheet,
    ListView,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

let sourceData = [
    {name: '张三', description: '今天天气不错', group: 'Family'},
    {name: '张三', description: '今天天气不错', group: 'Family'},
    {name: '张三', description: '今天天气不错', group: 'Work'},
    {name: '张三', description: '今天天气不错', group: 'Family'},
    {name: '张三', description: '今天天气不错', group: 'Work'},
    {name: '张三', description: '今天天气不错', group: 'Work'},
    {name: '张三', description: '今天天气不错', group: 'Work'},
    {name: '张三', description: '今天天气不错', group: 'Family'},
    {name: '张三', description: '今天天气不错', group: 'Family'},
    {name: '张三', description: '今天天气不错', group: 'Work'},
]

export default class TestDriveListView extends Component {

    constructor(props) {
        super(props);

        this._renderSectionHeader = this._renderSectionHeader.bind(this);
        //sourceData = this.props.carData;
        alert(JSON.stringify(this.props.carData))//这里报错的吗 bu s 是他们组件内部
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
                getRowData: (data, sectionID, rowID) => {
                    if (data[sectionID][0].hide) {
                        return undefined;
                    } else {
                        return data[sectionID][rowID];
                    }
                },
                getSectionHeaderData: (data, sectionID) => {
                    return data[sectionID];
                }
            }),

            sourceData: undefined
        }
    }

    componentDidMount() {
        this._configSourceData(sourceData);
    }

    _renderFriendRow(friend, sectionID, rowID) {

        if (friend === undefined || (rowID == 0 && !friend.hide)) {
            return null;
        }

        return (
            <View style={styles.sectionHeader}>
                <Text>{friend.name}</Text>
            </View>
        )
    }

    _renderSectionHeader(friend, sectionID) {

        return (
            <TouchableOpacity
                style={styles.sectionHeader}
                onPress={()=>{
                    let newSourceData = this.state.sourceData;

                    for (let friendGroup in this.state.sourceData) {
                        if (friendGroup === sectionID) {
                            newSourceData[sectionID][0].hide = !newSourceData[sectionID][0].hide;
                        }
                    }

                    this.setState({sourceData: newSourceData});
                }}
            >
                <Text style={{color: 'black'}}>{sectionID}</Text>
            </TouchableOpacity>
        )
    }

    _configSourceData(friends) {
        let sourceData = {};
        for (let friend of friends) {
            if (sourceData[friend.group]) {
                sourceData[friend.group].push(friend);
            } else {
                sourceData[friend.group] = [{hide: false}];
            }
        }
       // alert(JSON.stringify(sourceData));
        this.setState({
            sourceData: sourceData
        });
    }

    render() {

        let friendsData = this.state.sourceData;
        let sectionIDs = [];
        let rowIDs = [];
        for (let sectionID in friendsData) {
            // Work、Family
            sectionIDs.push(sectionID);

            let row = [];
            friendsData[sectionID].map((friend, index) => {
                row.push(index);
            })

            rowIDs.push(row);
        }

        return (
            <View style={{flex: 1, paddingTop: 20}}>
                <ListView
                    dataSource={this.state.dataSource.cloneWithRowsAndSections(friendsData, sectionIDs, rowIDs)}
                    renderRow={this._renderFriendRow}
                    renderSectionHeader={this._renderSectionHeader}
                    style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}
                >

                </ListView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    sectionHeader: {
        width: SCREEN_WIDTH,
        height: 44,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderBottomWidth: 0.5,
        borderColor: '#d9d9d9'
    }
})