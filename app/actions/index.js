import {xhrP} from '../utils/xhr.js';


export const CHANGE_LOOK = 'CHANGE_LOOK';
export const GET_DATA = 'GET_DATA';

export function changeLook(look) {
    return {
        type: CHANGE_LOOK,
        look
    };
}

export function getData(links) {
    return {
        type: GET_DATA,
        links
    };
}


export function fetchData() {

    return async function thunk(dispatch) {

        try {
            var results = await xhrP('get', '/data', true);
            dispatch(getData(JSON.parse(results)))
        } catch (err) {
            console.log(err)
        }

    };


}
