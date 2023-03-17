import { getToken } from './auth';
// import IMeeting from '../models/meetings';
import Config from '../config';

const { apiBaseUrl } = Config;
function getCalender( calenderDate: string ){
    return fetch( `${apiBaseUrl}/calendar?date=${calenderDate}`,
        {
            method : "GET",
            headers:{
                'Authorization':getToken()
            }
        }
    )
        .then( function ( response ) {
            if ( !response.ok ) {
                // for 404 kind of errors, we should check and explcitly throw an error
                throw new Error( response.statusText );
            }
            console.log( response );
            return response.json();
        } );
}

export {
    getCalender
}