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
import {fetchAnswer, fetchCarInfo} from '../../../actions/wikiAction'
// common Component
import NavBar from '../../../components/DefaultNavBar';
import Item from '../../../components/Item';
import Loader from '../../../components/LoaderView'
import SearchInput from '../../../components/SearchInput'
// page component
import Question from './QuestionView';
// Page

class Answer extends Component {
    constructor(props) {
        super(props)
        this.state = {
          loaded: false,
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
              // 先根据用户信息拿到 CARSERS_ID 和 CARTYPE_ID
              // 根据
              console.log(data)
              //fetchCarInfo(data.LOGIN_USER_ID)

              fetchAnswer('', function (action) {
                // 插入一条固定的数据
                console.log(action)
                action.value.unshift({
                  "LOOKUP_VALUE_NAME": "常见",
                  "LOOKUP_VALUE_CODE": 0,
                  "REMARK": null
                })
                dispatch(action)
                that.setState({
                    loaded: true,
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
              title="用车百科"
              onBack={()=>{
                  this.props.navigator.pop()
              }}
          />
          <Loader />
        </View>
      )
    }
    renderContent() {
        const {wiki} = this.props;
        const that = this;
        // 判断数据是否存在
        return (
            <View style = {styles.container}>
                <NavBar
                    title="用车百科"
                    onBack={()=>{
                        this.props.navigator.pop()
                    }}
                />
                <SearchInput />
                <ListView
                  style = {styles.content}
                  dataSource = {that.state.dataSource}
                  renderRow = {(obj)=> {

                    return <Item
                        onPress = {()=> {
                            this.props.navigator.push({
                                component: Question,
                                params: {
                                  code: obj["LOOKUP_VALUE_CODE"]
                                }
                            })
                        }}
                        title = {`${obj["LOOKUP_VALUE_NAME"]}问题`}
                        image = {require('../../../image/icon_wiki_q.png')}
                    />
                  }}
                />
            </View>
        )
    }

    render() {
      const {dispatch, wiki} = this.props;
      if(this.state.loaded) {
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

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
