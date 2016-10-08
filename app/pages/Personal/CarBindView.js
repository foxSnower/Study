/* Created by 楚寒 on 2016/10/7.
 */
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux'
import NavBar from '../../components/DefaultNavBar'
import {IMGURL} from '../../utils/RequestURL'
import {BGColor,BTNColor,Screen,pixelRation,GetDateStr,ly_Toast,setDefaultTime,validateMobile,validateDateExpries} from '../../utils/CommonUtil'
import LabelRow from '../../components/LabelRow'
import LabelInput from '../../components/LabelInput'
import Button from '../../components/Button'
import UserDefaults from '../../utils/GlobalStorage'



class CarBindView extends Component {
    constructor(props) {
        super(props)

    }



    render(){
        const {LOGIN_MOBILE, CUST_NAME} = this.props;
        const icon_time = `${IMGURL}/images/icon_time.png`;
        const icon_go = `${IMGURL}/images/icon_link_go2.png`;
        const icon_car = `${IMGURL}/images/icon_wiki_question.png`;
        return(
            <View style={{flex:1,backgroundColor:BGColor}}>
                <NavBar title="车主绑定"
                        onBack={()=>{
                            this.props.navigator.pop()
                        }}
                />
                <View style={{marginTop:15}}>
                    <LabelInput style={{height:40}}
                                label="车主姓名"
                                placeholder="请输入车主姓名"
                                max={11}
                                hasRightIcon={true}
                                defaultValue={CUST_NAME}
                                onChangeText={(text) => {
                                    this.setState({
                                        userName: text
                                    })
                                }}

                    />
                    <LabelInput style={{height:40,backgroundColor:"#fff",borderBottomWidth:1/pixelRation,borderBottomColor:"#d9d9d9"}}
                                textStyle={{justifyContent:"center",width:60,color:"#2b2b2b",marginLeft:20,marginRight:20}}
                                inputStyle={{color:"#2b2b2b",justifyContent:"center"}}
                                label="手机号"
                                max={11}
                                hasRightIcon={true}
                                defaultValue={LOGIN_MOBILE}
                                keyboardType="numeric"
                                onChangeText={(text) => {
                                    this.setState({
                                        mobile: text
                                    })
                                }}

                    />

                </View>
            </View>
        )
    }
}
export default connect((state)=>{
    const {book} = state;
    return {
        book
    }
})(CarBindView)