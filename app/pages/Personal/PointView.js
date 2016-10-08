'use strict';
import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

import {connect} from 'react-redux';
// util

// common component
import NavBar from '../../components/DefaultNavBar';
import Loader from '../../components/LoaderView';

class Point extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const {personal} = this.props;
        let scores = personal.scores;


        return (
            <View style = {styles.container}>
                <NavBar
                    title = "积分明细"
                    onBack = {()=> {
                        this.props.navigator.pop()
                    }}
                />
                <View style = {styles.total}>
                    <View>
                        <Text style = {{fontSize: 12}}>可用积分</Text>
                        <Text style = {styles.totalScore}>{scores.TOTAL_POINT}</Text>
                    </View>
                    <Image
                        style = {{width: 50, height: 50}}
                        source = {require('../../image/in.png')}
                    />
                </View>
                <View style = {styles.item}>
                    <View style = {styles.type} >
                        <Text style = {styles.typeName}>厂家积分</Text>
                        <Image
                            style = {{width: 14, height: 16}}
                            source = {require('../../image/icon_core.png')}
                        />
                    </View>    
                    <Text style = {styles.itemScore} >
                        <Image
                            style = {styles.textImg}
                            source = {require('../../image/icon_core.png')}
                        />
                        {scores.PV_POINT}
                    </Text>
                </View>
                <View style = {styles.item}>
                    <View
                        style = {styles.type}
                    >
                        <Text style = {styles.typeName}>专营店积分</Text>
                        <Image
                            style = {{width: 14, height: 16}}
                            source = {require('../../image/icon_core.png')}
                        />
                    </View>
                    <Text style = {styles.itemScore}>
                        <Image
                            style = {styles.textImg}
                            source = {require('../../image/icon_core.png')}
                        />
                        {scores.DLR_POINT}
                    </Text>
                </View>
                <View style = {styles.item}>
                    <View
                        style = {styles.type}
                    >
                        <Text style = {styles.typeName}>虚拟积分</Text>
                        <Image
                            style = {{width: 14, height: 16}}
                            source = {require('../../image/icon_core.png')}
                        />
                    </View>
                    <Text style = {styles.itemScore}>
                        <Image
                            style = {styles.textImg}
                            source = {require('../../image/icon_core.png')}
                        />
                        {scores.VIRTUAL_POINT}
                    </Text>
                </View>
            </View>
        )
    }
}

export default connect((state)=> {
    const {personal} = state;
    return {
        personal
    }
})(Point)

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efeff4'
    },
    total: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    totalScore: {
        fontSize: 20,
        color: '#c90028'
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    type: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    typeName: {
        width: 100,
        maxWidth: 100
    },
    itemScore: {
        color: '#c90028'
    },
    textImg: {
        width: 8,
        maxWidth: 8,
        height: 10,
        maxHeight: 10
    }
});
