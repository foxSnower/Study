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
import imageObj from '../../../utils/imageUtil';
// action
import {fetchQuestion} from '../../../actions/wikiAction'
// common Component
import NavBar from '../../../components/DefaultNavBar';
import Item from '../../../components/Item';
// page component
import Index from './IndexView.js';
// Page

class Answer extends Component {
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
              fetchQuestion("", function (action) {
                // dispatch 改变数据后，需要得到改变后的 state
                // 其实 list 就是 action.value ，直接使用这个？
                //alert(JSON.stringify(action))
                //let ary = action.value
                //alert(JSON.stringify(action))
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
              title="常见问题"
              onBack={()=>{
                  this.props.navigator.pop()
              }}
          />
          <Text>正在加载数据...</Text>
        </View>
      )
    }
    renderContent() {
        const {wiki} = this.props;
        const that = this;
        return (
            <View>
                <NavBar
                    title="常见问题"
                    onBack={()=>{
                        this.props.navigator.pop()
                    }}
                />
                <ListView
                  dataSource = {that.state.dataSource}
                  renderRow = {(obj)=> {

                    return <Item
                        onPress = {()=> {
                            this.props.navigator.push({
                                component: Index
                            })
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
      const {dispatch, wiki} = this.props;
      //alert(JSON.stringify(wiki))

      if(wiki && wiki.list && wiki.list.length !== 0) {
        // 如果完成
        return this.renderContent()
      }else {
        return this.renderLoading()
      }
    }
}

export default connect((state)=> {
  const {wiki} = state;
  return {
    wiki
  }
})(Answer)
