/**
 * Created by DB on 16/9/18.
 */
import React from 'react';
import {Provider} from 'react-redux';
import App from './containers/app';

import {store} from './store/storeConfigure'

export default class Root extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}