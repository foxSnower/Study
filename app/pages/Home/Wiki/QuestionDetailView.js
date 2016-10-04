import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  WebView
} from 'react-native'

import {connect} from 'react-redux';
// util
import UserDefaults from '../../../utils/GlobalStorage';
import {Screen} from '../../../utils/CommonUtil';
// action
import {fetchQuestionDetail} from '../../../actions/wikiAction'
// common Component
import NavBar from '../../../components/DefaultNavBar';
import Item from '../../../components/Item';
// page component
import Index from './IndexView.js';

export default class QuestionDetail extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style= {styles.container}>
        <NavBar
          title = {"答疑详情"}
          onBack={()=>{
              this.props.navigator.pop()
          }}
        />
        <View style = {styles.item} >
            <Image
              source = {require('../../../image/icon_wiki_q.png')}
              style = {styles.img}
            />
            <Text style = {styles.quesDescription}>排气管冒烟是什么原因？</Text>
        </View>
        <View style = {styles.item}>
            <Image
              source = {require('../../../image/icon_wiki_a.png')}
              style = {styles.img}
            />
            <Text style = {styles.ansDescription}>首先分享的是大热天如何实现车内快速降温</Text>
        </View>
        <WebView
          ref={'webview'}
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={{uri: 'http://www.baidu.com'}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}
          scalesPageToFit={true}
        />
    </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  img: {
    maxWidth: 50,
    maxHeight: 50,
    marginRight: 10
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  quesDescription: {
    fontSize: 16
  },
  ansDescription: {
    fontSize: 18,
    width: Screen.width-80
  },
  webView: {

  }
})
