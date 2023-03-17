import IMeeting from '../models/meetings';
import {getToken} from './auth';
import Config from '../config';

const { apiBaseUrl } = Config;

function addMeetings( credentials :  IMeeting ) {
    return fetch( `${apiBaseUrl}/meetings`, {
        method: "POST",
        body: JSON.stringify( credentials ),
        headers: {
            Authorization: getToken(),
            "Content-Type": "application/json"
        }
    } ).then( function ( response ) {
        if ( !response.ok ) {
            // for 404 kind of errors, we should check and explcitly throw an error
            throw new Error( response.statusText );
        }

        return response.json();
    } );
}

export {
    addMeetings
}

