import React, {Component} from 'react';
import{
    Text,
    TextInput,
    View,
    StyleSheet,
    Picker,
    Image
}from 'react-native';
import NavBar from '../../components/DefaultNavBar';

export default class DLRView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <NavBar title="4S店查询"
                        onBack={()=> {
                            this.props.navigator.pop()
                        }}
                />
                <View style={{flex: 1}}>
                    <TextInput placeholder="请输入专营店名称"></TextInput>
                    <View style={{flex: 1}}>
                        <Picker
                            selectedValue={"广州"}
                            onValueChange={(lang) => this.setState({language: lang})}>
                            <Picker.Item label="Java" value="java"/>
                            <Picker.Item label="JavaScript" value="js"/>
                        </Picker>
                        <Picker
                            selectedValue={"广州"}
                            onValueChange={(lang) => this.setState({language: lang})}>
                            <Picker.Item label="Java" value="java"/>
                            <Picker.Item label="JavaScript" value="js"/>
                            <Picker.Item label="JavaScript" value="js"/>
                            <Picker.Item label="JavaScript" value="js"/>
                            <Picker.Item label="JavaScript" value="js"/>
                        </Picker>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
