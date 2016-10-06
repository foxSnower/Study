/**
 * Created by 楚寒 on 2016/10/4.
 */
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TextInput,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
const SCREEN_WIDTH = Dimensions.get('window').width;
export default class SearchInput extends Component {
    static PropTypes = {
        style: PropTypes.object,
        inputStyle: PropTypes.object,
        IconStyle: PropTypes.object,
        placeholder: PropTypes.string,
        keyboardType: PropTypes.numeric,
        max: PropTypes.number,
        returnKeyType: PropTypes.numeric,
        defaultValue: PropTypes.string,
        onChangeText: PropTypes.func,
        onSubmit: PropTypes.func,
    }

    static defaultProps = {
        placeholder: "请输入关键字",
        keyboardType: "default",
        returnKeyType: "done",
        max: 20,
        onChangeText: () => {
        },
        onSubmit:()=>{}
    }
    render(){
        const {inputStyle, style, IconStyle, placeholder, defaultValue,value, returnKeyType, keyboardType, max, onChangeText,onSubmit}  = this.props;
        return(
            <View style={[styles.container,style]}>
                <Icon style={[styles.icon,IconStyle]}
                      name="ios-search-outline" size={20} color='#d9d9d9'/>
                <TextInput placeholder={placeholder}
                           style={[styles.textInput, inputStyle]}
                           maxLength={max}
                           clearButtonMode="while-editing"
                           enablesReturnKeyAutomatically={true}
                           defaultValue={defaultValue}
                           value={value}
                           keyboardType={keyboardType}
                           returnKeyType={returnKeyType}
                           underlineColorAndroid="transparent"
                           onChangeText={ (text) => {
                               onChangeText(text)
                           }}
                           onSubmitEditing={
                                   onSubmit
                           }
                >
                </TextInput>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
        alignSelf:"center",
        borderWidth:1,
        borderColor:"#d9d9d9",
        borderRadius:6,
        height:40,
        width:SCREEN_WIDTH*0.95,
        justifyContent:"center",
        marginTop:6,
        marginBottom:6,
    },
    textInput: {
        color:"#000",
        flex: 1,
        borderWidth: 0,
        height: 36,
        fontSize: 15,
        marginLeft: 10
    },
    icon:{
        marginLeft:10,
    }
})