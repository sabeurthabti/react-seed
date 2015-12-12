import {xhrP} from '../utils/xhr.js';
import Firebase from 'firebase';
var myFirebaseRef = new Firebase("https://sabeur-links.firebaseio.com/");

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
  }
}


export function pushData(data) {
  return function thunk(dispatch) {

    myFirebaseRef.child('links').push({
      url: data.url,
      title: data.name
    }, function(error) {
      if (error) { console.log(`Error: ${error}`)} else { dispatch(dataPushedResults(data)) }
    });
  }
}



export function fetchData() {

  return async function thunk(dispatch) {



    myFirebaseRef.child('links').on("value", function(snapshot) {
      // console.log(snapshot.val());
          dispatch(getData(snapshot.val()));

    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });



  // try {
  //   var results = await xhrP('get', '/data', true);
  //   dispatch(getData(JSON.parse(results)))
  // } catch (err) {
  //   console.log(err)
  // }

};


}
