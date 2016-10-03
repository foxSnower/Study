'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

import {connect} from 'react-redux';
// action
import {fetchImg} from '../../../actions/wikiAction'
// utils
import {Screen, pixel1} from '../../../utils/CommonUtil';
import UserDefaults from '../../../utils/GlobalStorage';
import imageObj from '../../../utils/imageUtil';
// common component
import NavBar from '../../../components/DefaultNavBar';
import Item from '../../../components/Item';
// page component
import Answer from './AnswerView';

class Cyclopedia extends Component {
    constructor(props) {
        super(props);
        let {dispatch} = props;
        // 获取数据
        UserDefaults.objectForKey("userInfo", (data)=> {
            if (data) {
                //alert(data["LOGIN_USER_ID"])
                // 如果用户id存在，就改变用车百科页面图片
                dispatch(fetchImg('启辰D50'))
            }
        });
    }

    render() {
        let {dispatch, wiki} = this.props;
        //alert(wiki.img)

        return (
            <View style={styles.container}>
                <NavBar
                    title="用车百科"
                    style={styles.navbar}
                    onBack={()=> {
                        this.props.navigator.pop()
                    }}
                />
                <Image
                    style={styles.banner}
                    source={wiki.img}
                >
                    <Text
                        style={styles.bannerDescription}
                    >{wiki.title}</Text>
                </Image>
                <View
                    style={styles.content}
                >
                    <Item
                        title={'用车答疑'}
                        description={'快速解决用车过程中遇到的疑问'}
                        image={require('../../../image/icon_car.png')}
                        onPress={()=> {
                            this.props.navigator.push({
                                component: Answer
                            })
                        }}
                    />
                    <Item
                        title={'随车手册'}
                        description={'详细查看随车指南'}
                        image={require('../../../image/icon_wiki_text.png')}
                        onPress={()=> {
                            this.props.navigator.push({
                                component: Answer
                            })
                        }}
                    />
                    <Item
                        title={'认识纯正备件'}
                        description={'学会了这些，再也不用担心被忽悠了'}
                        image={require('../../../image/icon_wiki_bank.png')}
                        onPress={()=> {
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
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#ccc'
    },
    navbar: {},
    banner: {
        width: Screen.width,
        height: 180,
        justifyContent: 'flex-end'
    },
    bannerDescription: {
        backgroundColor: 'rgba(0, 0, 0, .4)',
        color: '#fff',
        fontSize: 16,
        paddingTop: 5,
        paddingRight: 5,
        paddingBottom: 5,
        paddingLeft: 10
    },
    content: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

export default connect((state) => {
    //console.log(state);
    const {wiki} = state;
    return {
        wiki
    }
})(Cyclopedia);
