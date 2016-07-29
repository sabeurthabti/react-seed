import {xhrP} from '../utils/xhr.js';
import Firebase from 'firebase';
var myFirebaseRef = new Firebase("https://sabeur-links.firebaseio.com/links");

export const PUSH_DATA = 'PUSH_DATA';
export const GET_DATA = 'GET_DATA';

export function getData(links) {
  return {
    type: GET_DATA,
    links
  };
}

export function dataPushedResults(data) {
  return {
    type: PUSH_DATA,
    data
  };
}

export function pushData(data) {
  return function thunk(dispatch) {
    myFirebaseRef.push({
      url: data.url,
      title: data.name,
      created_at: data.created_at
    }, (error) => {
      if (error) { console.log(`Error: ${error}`);} else { dispatch(dataPushedResults(data)); }
    });
  };
}

export function removeLink(key) {
  return function thunk(dispatch) {
    myFirebaseRef.child(key).remove((error) => {
      if(error)
        console.log(`Error: ${error}`);
    });
  };
}

export function fetchData(limit = 0) {

  return async function thunk(dispatch) {
    myFirebaseRef.on("value", (snapshot) => {
          dispatch(getData(snapshot.val()));

    },  (errorObject) => {
      console.log("The read failed: " + errorObject.code);
    });
};

}
