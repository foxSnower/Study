/**
 * Created by DB on 16/9/18.
 */
import React, {Component} from 'react';
import {
    Navigator,
    Text,
    View,
    StatusBar,
    NativeAppEventEmitter
} from 'react-native';

import {connect} from 'react-redux';
import TabBarView from './TabBarView';
import {updateFields} from '../actions/fieldsAction'
import {PlatformiOS} from '../utils/CommonUtil'
import JPushModule from 'jpush-react-native';

class App extends Component {

    constructor(props) {
        super(props);

        const {dispatch} = this.props;
        dispatch(updateFields({count: 2016}));
    }

    componentDidMount() {

        if (PlatformiOS) {
            let subscription = NativeAppEventEmitter.addListener(
                'ReceiveNotification',
                (notification) => console.log(notification)
            );

            let subscription1 = NativeAppEventEmitter.addListener(
                'networkDidReceiveMessage',
                (message) => console.log(message)
            );
        } else {
            JPushModule.addReceiveCustomMsgListener((message) => {
                this.setState({pushMsg: message});
            });
            JPushModule.addReceiveNotificationListener((message) => {
                console.log("receive notification: " + message);
            })
        }

    }

    componentWillUnmount() {
        if (PlatformiOS) {
            this.subscription.remove();
            this.subscription1.remove();
        } else {
            JPushModule.removeReceiveCustomMsgListener();
            JPushModule.removeReceiveNotificationListener();
        }
    }

    render() {

        return (
            <View style={{flex:1}}>
                <StatusBar
                    barStyle="light-content"
                />
                <Navigator {...this.props}
                           initialRoute={{name: 'TabBarView', component: TabBarView}}
                           configureScene={()=> {
                               return Navigator.SceneConfigs.PushFromRight;
                           }}
                           renderScene={(route, navigator) => {
                               let Component = route.component;
                               let passProps = route.passProps;
                               return (<Component navigator={navigator}
                                                  route={route} {...passProps} {...route.params} {...this.props}/>)
                           }}
                />
            </View>
        )
    }
}


export default connect((state) => {
    const {fields} = state;
    return {
        fields
    }
})(App);