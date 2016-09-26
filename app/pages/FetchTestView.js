/**
 * Created by DB on 16/9/23.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import {requestGET} from '../utils/FetchUtil'

export default class FetchTestView extends Component {

    fetchGET = () => {
        requestGET('https://suggest.taobao.com/sug?code=utf-8&q=%E6%89%8B%E6%9C%BA',
            {},
            (data)=> {
                alert(JSON.stringify(data))
            },
            (error)=> {
                alert(error)
            }
        )
    };

//{"API_CODE":"FetchMessage","PARAM":{"LOGIN_USER_ID":"NA"},"PAGE_SIZE":10,"PAGE_INDEX":1,"SORT":"ACT_ORDER ASC,act_start_time DESC"}:

    // JSON.stringify({
    //     firstParam: 'yourValue',
    //     secondParam: 'yourOtherValue',
    // })
    //
    fetchPOST = () => {

        fetch('http://14.23.175.49:880/Handler.ashx', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                "API_CODE":"FetchMessage",
                "PARAM":{"LOGIN_USER_ID":"NA"},
                "PAGE_SIZE":10,
                "PAGE_INDEX":1,
                "SORT":"ACT_ORDER ASC,act_start_time DESC"
            })
        })
            .then((response) => response.text())
            .then((data) => {
                    alert(data)
                }
            )
            .catch((error) => {
                    alert(error)
                }
            )
    };

    render() {

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button}
                                  onPress={this.fetchGET}
                >
                    <Text style={styles.text}>GET 请求</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                                  onPress={this.fetchPOST}
                >
                    <Text style={styles.text}>POST 请求</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
    },
    text: {
        color: '#fff',
        fontSize: 20
    },
    button: {
        width: 180,
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#e2e2e2',
        alignItems: 'center',
        margin: 10,
    }
});