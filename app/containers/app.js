/**
 * Created by DB on 16/9/18.
 */
import React, {Component} from 'react';
import {
    Navigator,
    Text,
    View,
    StatusBar
} from 'react-native';

import {connect} from 'react-redux';
import TabBarView from './TabBarView';
import {updateFields} from '../actions/fieldsAction'

class App extends Component {

    constructor(props) {
        super(props);

        const {dispatch} = this.props;
        dispatch(updateFields({count: 2016}));
        // dispatch(updateFields({myActionData:[]}))
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