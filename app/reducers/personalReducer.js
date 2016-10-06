import * as types from '../actions/actionTypes'

const initialiState = {
    costList: []
}

export default function personal(state = initialiState, action = {}) {
    switch(action.type) {
        case types.COST_QUERY:
            return Object({}, state, {
                costList: action.value
            })
        default:
            return state
    }
} 