/**
 * Created by DB on 16/9/18.
 */
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/rootReducer';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    const logger = createLogger();
    middlewares.push(logger);
}

let createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
export let store = createStoreWithMiddleware(rootReducer);