import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  WebView
} from 'react-native'

//common component
import NavBar from '../../../components/DefaultNavBar'

export default class Manual extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <NavBar
          title = {'随车手册'}
          onBack = {()=> {
            this.props.navigator.pop()
          }}
        />
        <Text>Manual</Text>
      </View>
    )
  }
}
