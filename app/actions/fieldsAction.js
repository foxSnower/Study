/**
 * Created by DB on 16/6/24.
 */
import * as types from './actionTypes';

export function updateFields(value) {
    return {
        type: types.UPDATE_FIELDS,
        value: value
    }
}
