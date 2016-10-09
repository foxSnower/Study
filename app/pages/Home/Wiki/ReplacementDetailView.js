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
import {Screen, BGColor} from '../../../utils/CommonUtil';
// action
import {fetchReplacementDetail} from '../../../actions/wikiAction'
// common Component
import NavBar from '../../../components/DefaultNavBar';
import Item from '../../../components/Item';
import Loader from '../../../components/LoaderView';

class ReplacementDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    const {dispatch, replacementId} = this.props
    // 根据 answerId 进行请求
    fetchReplacementDetail(replacementId, (action)=> {
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
            title = "认识纯正备件"
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
          title = {"认识纯正备件"}
          onBack={()=>{
              this.props.navigator.pop()
          }}
        />
        <View style = {styles.content}>
          <Text style = {styles.title}>{wiki.replacementDetail["TITLE"]}</Text>
          <Text style = {styles.description}>{wiki.replacementDetail["SUMMARY"]}</Text>
          <Text>{wiki.replacementDetail["URL_CONTENT"]}</Text>
        </View>
        {/*
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
        */}
    </View>
    )
  }
}
export default connect((state)=> {
  const {wiki} = state;
  return {
    wiki
  }
})(ReplacementDetail)

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BGColor
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 10
  },
  title: {
    fontSize: 20
  },
  webView: {

  }
})
