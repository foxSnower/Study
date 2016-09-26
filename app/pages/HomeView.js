/**
 * Created by DB on 16/7/12.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import {updateFields} from '../actions/rootAction'
import Button from '../components/Button'

export default class HomeView extends Component {

    testClick = () => {

    };

    testClick1 = () => {
        this.refs.btn1.addOne();
    };

    render() {
        const { fields, dispatch } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.reduxText}>{fields.count}</Text>
                <Text style={styles.reduxText} onPress={()=>{dispatch(updateFields({count: fields.count + 1}))}}>点我</Text>
                <Text style={styles.text} onPress={()=> {
                    this.props.navigator.push({component: HomeView})
                }}>点击我跳转到新的页面</Text>
                <Button ref="btn" onPress={this.testClick} {...this.props}/>
                <Button ref="btn1" onPress={this.testClick1} {...this.props}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b2b2b2',
    },
    text: {
        color: '#fff',
        fontSize: 20
    },
    reduxText: {
        marginBottom: 20
    }
});