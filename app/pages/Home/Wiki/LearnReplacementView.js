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
import {fetchReplacement} from '../../../actions/wikiAction'
// common Component
import NavBar from '../../../components/DefaultNavBar';
import Item from '../../../components/Item';
import Loader from '../../../components/LoaderView'
// page component
import ReplacementDetail from './ReplacementDetailView'

class LearnReplacement extends Component {
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

      fetchReplacement("", (action)=> {
        console.log(action)
        dispatch(action)
        this.setState({
          loaded: true,
          dataSource: this.state.dataSource.cloneWithRows(action.value)
        })
      })

    }

    render() {
      const {dispatch, wiki} = this.props

      if(!this.state.loaded) {
        return (
          <View style = {{flex: 1}}>
            <NavBar
                title="认识纯正备件"
                onBack={()=>{
                    this.props.navigator.pop()
                }}
            />
            <Loader />
          </View>
        )
      }
      //渲染内容
      return (
          <View style = {styles.container}>
              <NavBar
                  title="认识纯正备件"
                  onBack={()=>{
                      this.props.navigator.pop()
                  }}
              />
                  <ListView
                    dataSource = {this.state.dataSource}
                    renderRow = {(obj)=> {

                      return <Item
                          style = {styles.item}
                          onPress = {()=> {
                              this.props.navigator.push({
                                  component: ReplacementDetail,
                                  params: {
                                    replacementId: obj["PURE_CONFIG_PROP_ID"]
                                  }
                              })
                          }}
                          title = {obj["TITLE"]}
                          description = {obj["SUMMARY"]}
                          image = {{uri: obj["HTTP_URL"]}}
                          imgStyle = {{marginLeft: 10, marginRight: 10, maxWidth: 120, maxHeight: 80, width: 120, height: 80}}
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
})(LearnReplacement)

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
