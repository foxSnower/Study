/**
 * Created by DB on 16/9/18.
 */
import React, {Component} from 'react';
import {
    Navigator,
    Text
} from 'react-native';

import {connect} from 'react-redux';
import TabBarView from './TabBarView';
import {updateFields} from '../actions/rootAction'

class App extends Component {

    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        dispatch(updateFields({count: 2016}))
    }



    render() {

        return (
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
                       navigationBar={
                           <Navigator.NavigationBar
                               routeMapper={{
                                   LeftButton: (route, navigator, index, navState) =>
                                   { return (<Text>Cancel</Text>); },
                                   RightButton: (route, navigator, index, navState) =>
                                   { return (<Text>Done</Text>); },
                                   Title: (route, navigator, index, navState) =>
                                   {
                                       console.log(route,index,navState);
                                       return (<Text>Awesome Nav Bar</Text>); },
                               }}
                               style={{backgroundColor: '#fff'}}
                           />
                       }
            />
        )
    }
}


export default connect((state) => {
    const {fields} = state;
    return {
        fields
    }
})(App);