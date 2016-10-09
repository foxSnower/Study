/**
 * Created by 楚寒 on 2016/10/2.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    WebView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

import {connect} from 'react-redux';
import {Screen, pixel1,BTNColor,BGColor} from '../../utils/CommonUtil'
import {updateHome,fetchActionDetail} from '../../actions/homeAction'
import NavBar from '../../components/DefaultNavBar'
import LoaderView from '../../components/LoaderView'

class ActionDetailView extends Component {
    constructor(props){
        super(props);
        this.state = {
            loaded:false,
            html:''
        }
    }

    componentDidMount(){
        const {dispatch,ACTION_CODE} = this.props;
        dispatch(fetchActionDetail(ACTION_CODE,(data)=>{
            let html =`<!DOCTYPE html>\n
                        <html>
                          <head>
                            <title>HTML字符串</title>
                            <meta http-equiv="content-type" content="text/html; charset=utf-8">
                            <meta name="viewport" content="width=320, user-scalable=no">
                          </head>
                          <body>
                            ${data.CONTENT}
                          </body>
                        </html>
                        `;
            this.setState({loaded:true,html:html});

        }));
    }

    render(){
        const {actionDetail} = this.props.home;

        if(!this.state.loaded){
            return (
                <View style={styles.container}>
                    <NavBar title="活动详情"
                            onBack={()=>{
                                this.props.navigator.pop()
                            }}
                    />
                    <LoaderView/>
                </View>
            )
        }
        let html11 =`<!DOCTYPE html>\n
                        <html>
                          <head>
                            <title>HTML字符串</title>
                            <meta http-equiv="content-type" content="text/html; charset=utf-8">
                            <meta name="viewport" content="width=320, user-scalable=no">
                          </head>
                          <body>
                            ${actionDetail.CONTENT}
                          </body>
                        </html>
                        `;
        return(
            <View style={{flex:1,backgroundColor:BGColor}}>
                <NavBar title="活动详情"
                        onBack={()=>{
                            this.props.navigator.pop()
                        }}
                />
                <View style={{flex:1}}>
                    <View style={{padding:10,borderBottomWidth:pixel1,borderBottomColor:"#888"}}>
                        <Text style={styles.title}>{actionDetail.ACT_TITLE}</Text>
                        <Text style={styles.date}>活动时间: {actionDetail.ACT_START_TIME} 到 {actionDetail.ACT_END_TIME}</Text>
                    </View>
                    {
                        this.state.isLoad ?
                        <WebView style={styles.content}
                                 source={{html:this.state.html}}>
                        </WebView>
                        :
                        null
                    }

                </View>
            </View>
        )
    }
}

export default connect((state)=>{
    const {home} = state;
    return{
        home
    }
})(ActionDetailView)

const styles = StyleSheet.create({
    container:{
        flex:1,

    },
    content:{
        //backgroundColor:"red"
    },
    title:{
        fontSize:17,
        fontWeight:"500",
        color:"#333"
    },
    date:{
        fontSize:12,
        marginTop:10,
    }
});