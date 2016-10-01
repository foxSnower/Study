/**
 * Created by DB on 16/9/18.
 */

import { combineReducers } from 'redux'
import fields from './fieldsReducer'
import home from './homeReducer'
import login from './loginReducer'
import regist from './registReducer'

export default rootReducer = combineReducers({
    fields,
    home,
    login
})