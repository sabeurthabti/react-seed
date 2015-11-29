import { combineReducers } from 'redux';
import { CHANGE_LOOK, GET_DATA } from '../actions/index.js';

function look(state = {}, action = {}) {
    switch (action.type) {
        case CHANGE_LOOK:
            return {
                look: action.look
            };
        default:
            return state;
    }
}

function data(state = {}, action = {}) {
    var links = action.links;
    switch (action.type) {
        case GET_DATA:
            return {
                ...links
            };
        default:
            return state;
    }
}



export default combineReducers({
    look,
    data
});
