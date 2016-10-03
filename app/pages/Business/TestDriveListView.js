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

import {connect} from 'react-redux'
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

let sourceData = {
    Family: [
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
    ],
    Work: [
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
}

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

    componentDidMount() {

    }

    _renderFriendRow(friend, sectionID, rowID) {

        console.log(friend);


        return (
            <View style={styles.sectionHeader}>
                <Text>{friend.CAR_SERIES_CN}</Text>
            </View>
        )
    }

    _renderSectionHeader(friend, sectionID) {

        return (
            <TouchableOpacity style={styles.sectionHeader}>
                <Text style={{color: 'black'}}>{friend.BODY_STRUCTURAL}</Text>
            </TouchableOpacity>
        )
    }


    render() {

        return (
            <View style={{flex: 1, paddingTop: 20}}>
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


// export default connect((state)=> {
//     const {testDrive} = state;
//     return {
//         testDrive
//     }
// })(TestDriveListView)

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