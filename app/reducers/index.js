import { combineReducers } from 'redux';
import { CHANGE_LOOK, GET_DATA, PUSH_DATA } from '../actions/index.js';

function links(state = {}, action = {}) {
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

function dataPushedResults(state = {}, action = {}) {
  var data = action.data;

  switch (action.type) {
    case PUSH_DATA:
      return {...data};
    default:
    return  state;

  }
}



export default combineReducers({
    links,
    dataPushedResults
});
