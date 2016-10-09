'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    TextInput
} from 'react-native';

import {connect} from 'react-redux';
// util
import UserDefaults from '../../../utils/GlobalStorage';
// action
import {fetchQuestion, searchQuestion} from '../../../actions/wikiAction'
// common Component
import NavBar from '../../../components/DefaultNavBar';
import Item from '../../../components/Item';
import SearchInput from '../../../components/SearchInput'
import Loader from '../../../components/LoaderView'
// page component
import Detail from './QuestionDetailView'
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
    // 从数据库查询数据
    search(keyword) {
        // 开始搜索时将 loaded 设置为 false
        this.setState({
            loaded: false
        })
      //alert(keyword)
      const {dispatch} = this.props
      searchQuestion(keyword, (action)=> {
        dispatch(action)
        this.setState({
            loaded: true,
            dataSource: this.state.dataSource.cloneWithRows(action.value)
        })
      })
    }

    componentDidMount() {
      // 获取数据
      const {dispatch, wiki, quesType, keyword, login} = this.props
      if(keyword) {
        // 如果是从搜索框跳转过来的，使用搜索关键词进行查询
        this.search(keyword)
      }else {
        fetchQuestion(login.carInfo.CARS[0].CAR_SERIES_ID, quesType, (action)=> {
          // dispatch 改变数据后，需要得到改变后的 state
          console.log('fetchQuestion action is :', action)
          dispatch(action)
          this.setState({
              loaded: true,
              dataSource: this.state.dataSource.cloneWithRows(action.value)
          })
        })
      }
    }

    render() {
      const {dispatch, wiki} = this.props;
      //alert(JSON.stringify(wiki))
      if(!this.state.loaded) {
        return (
          <View style = {styles.container}>
            <NavBar
                title="常见问题"
                onBack={()=>{
                    this.props.navigator.pop()
                }}
            />
            <Loader />
          </View>
        )
      }
      //

      //渲染内容
      return (
          <View style = {styles.container}>
              <NavBar
                  title="常见问题"
                  onBack={()=>{
                      this.props.navigator.pop()
                  }}
              />
              <SearchInput
                onChangeText = {(text)=> {
                  this.setState({
                    searchKeyword: text
                  })
                }}

                onSubmit = {()=> {
                  this.search(this.state.searchKeyword)
                }}
              />
              {
                  wiki.questionList.length !== 0 ?
                  <ListView
                    dataSource = {this.state.dataSource}
                    renderRow = {(obj)=> {

                      return <Item
                          style = {styles.item}
                          onPress = {()=> {
                              this.props.navigator.push({
                                  component: Detail,
                                  params: {
                                    answerId: obj["QUES_AND_CARTYPE_ID"]
                                  }
                              })
                          }}
                          title = {obj["QUES_TITLE"]}
                          image = {require('../../../image/icon_wiki_a.png')}
                      />
                    }}
                  />
                  : <Text>{"数据为空"}</Text>
              }
          </View>
      )
    }
}

export default connect((state)=> {
  const {wiki, login} = state;
  return {
    wiki,
    login
  }
})(Answer)

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  item: {
    marginTop: 10
  }
})
