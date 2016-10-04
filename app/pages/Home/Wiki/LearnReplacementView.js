'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView
} from 'react-native';

import {connect} from 'react-redux';
// util
import UserDefaults from '../../../utils/GlobalStorage';
import imgUrl from '../../../utils/RequestURL';
// action
import {fetchQuestion} from '../../../actions/wikiAction'
// common Component
import NavBar from '../../../components/DefaultNavBar';
import Item from '../../../components/Item';
// page component
// Page

export default class LearnReplacement extends Component {
    constructor(props) {
        super(props)
        this.state = {
          dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        }
        // this.renderContent = this.renderContent.bind(this)
    }

    componentDidMount() {
      // 获取数据
      const {dispatch, wiki} = this.props
      const that = this
      UserDefaults.objectForKey("userInfo", (data)=> {
          if (data) {
              //alert(data["LOGIN_USER_ID"])
              //alert(JSON.stringify(fetchAnswer("")))
              fetchQuestion("10220", function (action) {
                // dispatch 改变数据后，需要得到改变后的 state
                dispatch(action)
                that.setState({
                    dataSource: that.state.dataSource.cloneWithRows(action.value)
                })
              })
          }
      });
    }

    renderLoading() {
      return (
        <View>
          <NavBar
              title="认识纯正备件"
              onBack={()=>{
                  this.props.navigator.pop()
              }}
          />
          <Text>正在加载数据...</Text>
        </View>
      )
    }
    renderContent() {
        const that = this;
        return (
            <View style = {styles.container}>
                <NavBar
                    title="认识纯正备件"
                    onBack={()=>{
                        this.props.navigator.pop()
                    }}
                />
                <ListView
                  dataSource = {that.state.dataSource}
                  renderRow = {(obj)=> {

                    return <Item
                        onPress = {()=> {
                        }}
                        title = {obj["QUES_TITLE"]}
                        image = {require('../../../image/icon_wiki_a.png')}
                    />
                  }}
                />
            </View>
        )
    }

    render() {
      return this.renderContent()
    }
}

// export default connect((state)=> {
//   const {wiki} = state;
//   return {
//     wiki
//   }
// })(LearnReplacement)

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
