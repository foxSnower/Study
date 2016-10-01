'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

// Component
import NavBar from '../../../components/DefaultNavBar';
// Item 
import Item from '../../../components/Item';

import Index from './IndexView.js';
// Page

export default class question extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <NavBar
                    title="用车百科"
                    onBack={()=>{
                        this.props.navigator.pop()
                    }}
                />
                <Item
                    onPress = {()=> {
                        this.props.navigator.push({
                            component: Index
                        })
                    }}
                    title = {'常见问题'}
                    image = {require('../../../image/icon_wiki_q.png')}
                />
            </View>
        )
    }
}
