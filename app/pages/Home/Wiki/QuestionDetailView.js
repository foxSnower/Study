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
import Loader from '../../../components/LoaderView';
// page component
import Index from './IndexView.js';

class QuestionDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    const {dispatch, answerId} = this.props
    // 根据 answerId 进行请求
    fetchQuestionDetail(answerId, (action)=> {
      // 拿到回答内容后，拼装 html 保存至 reducer
      console.log(action)
      dispatch(action)
      this.setState({
        loaded: true
      })
    })
  }

  render() {
    const {wiki} = this.props
    if(!this.state.loaded) {
      return (
        <View style = {{flex: 1}}>
          <NavBar
            title = "答疑详情"
            onBack={()=>{
                this.props.navigator.pop()
            }}
          />
          <Loader />
        </View>
      )
    }
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
        <WebView
          ref={'webview'}
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={{html: wiki.html}}
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
export default connect((state)=> {
  const {wiki} = state;
  return {
    wiki
  }
})(QuestionDetail)

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
