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
// action
import {fetchAnswer, fetchCarInfo, searchQuestion} from '../../../actions/wikiAction'
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
          dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
          searchKeyword: ""
        }
        this.search = this.search.bind(this)
        this.inputKeyword = this.inputKeyword.bind(this)
        // this.renderContent = this.renderContent.bind(this)
    }

    componentDidMount() {
      // 获取数据
      const {dispatch, wiki} = this.props
      UserDefaults.objectForKey("userInfo", (data)=> {
          if (data) {
            // 先根据用户信息拿到 CARSERS_ID 和 CARTYPE_ID
            // 根据
            console.log(data)
            fetchCarInfo(data["LOGIN_USER_ID"], (data)=> {
              // 拿到 codeId
              //data["DATA"]["CARS"][0]["CAR_SERIES_ID"]
              fetchAnswer("", (action)=> {
                if(action.value === 'error') {
                    alert('请求失败')
                }
                console.log(action)
                //插入一条固定的数据
                action.value.unshift({
                  "LOOKUP_VALUE_NAME": "常见",
                  "LOOKUP_VALUE_CODE": 0,
                  "REMARK": null
                })
                dispatch(action)
                this.setState({
                    loaded: true,
                    dataSource: this.state.dataSource.cloneWithRows(action.value)
                })
              })
            })
          }
      });
    }


    // 输入框搜索
    inputKeyword(text) {
      this.setState({
        searchKeyword: text
      })
    }
    // 直接跳转页面
    search() {
      let temp = this.state.searchKeyword
      this.setState({
        searchKeyword: ""
      })
      this.props.navigator.push({
        component: Question,
        params: {
          keyword: temp
        }
      })
    }


    render() {
      const {dispatch, wiki} = this.props;
      if(!this.state.loaded) {
        // 如果没有完成
        return (
          <View style = {{flex: 1}}>
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
      // 渲染内容
      return (
        <View style = {styles.container}>
            <NavBar
                title="用车百科"
                onBack={()=>{
                    this.props.navigator.pop()
                }}
            />
            <SearchInput
              onChangeText = {(text)=> {
                this.inputKeyword(text)
              }}

              onSubmit = {()=> {
                this.search()
              }}
            />
            <ListView
              style = {styles.content}
              dataSource = {this.state.dataSource}
              renderRow = {(obj)=> {

                return <Item
                    onPress = {()=> {
                        this.props.navigator.push({
                            component: Question,
                            params: {
                              quesType: obj["LOOKUP_VALUE_CODE"]
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
