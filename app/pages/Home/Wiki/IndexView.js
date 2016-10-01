'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
//
import NavBar from '../../../components/DefaultNavBar';
// Item 
import Item from '../../../components/Item';
// 
import Answer from './AnswerView'

export default class Cyclopedia extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar 
                    title="用车百科"
                    style = {styles.navbar}
                    onBack={()=>{
                        this.props.navigator.pop()
                    }}
                />
                <View
                    style={styles.content}
                >
                    <Item 
                        title = {'用车答疑'}
                        description = {'快速解决用车过程中遇到的疑问'}
                        image = {require('../../../image/icon_car.png')}
                        onPress = {()=> {
                            this.props.navigator.push({
                                component: Answer 
                            })
                        }}
                    />
                    <Item 
                        title = {'随车手册'}
                        description = {'详细查看随车指南'}
                        image = {require('../../../image/icon_wiki_text.png')}
                        onPress = {()=> {
                            this.props.navigator.push({
                                component: Answer 
                            })
                        }}
                    />
                    <Item 
                        title = {'认识纯正备件'}
                        description = {'学会了这些，再也不用担心被忽悠了'}
                        image = {require('../../../image/icon_wiki_bank.png')}
                        onPress = {()=> {
                            this.props.navigator.push({
                                component: Answer 
                            })
                        }}
                    />
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: '#ccc'
    },
    navbar: {

    },
    content: {
        flex: 1,
        backgroundColor: '#fff'
    }
})


