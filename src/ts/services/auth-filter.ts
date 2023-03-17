import { getToken } from './auth';
import Config from '../config';

const {apiBaseUrl} = Config;
function filter( date : string, itemSearch : string ) {
    return fetch(
        `${apiBaseUrl}/meetings?period=${date}&search=${itemSearch}`,
        {
            headers: {
                Authorization: getToken(),
                "Content-type": "application/json"
            }
        }
    ).then( function ( response ) {
        if ( !response.ok ) {
        // for 404 kind of errors, we should check and explcitly throw an error
            throw new Error( response.statusText );
        }
  
        return response.json();
    } );
}
  
  
function deleteTeam( meetingID : string ) {
    return fetch(
        `${apiBaseUrl}/meetings/${meetingID}?action=remove_attendee`,
        {
            method: "PATCH",
            headers: {
                Authorization: getToken()
            }
        }
    ).then( function ( response ) {
        if ( !response.ok ) {
            throw new Error( response.statusText );
        }
  
        // The response is empty (status code 204). So we do not call response.json() and instead pass on a hard-coded string to indicate success
        return response.json();
    } );
}
  
function addMember( meeting_id : string, user_id: string ) {
    return fetch(
        `${apiBaseUrl}/meetings/${meeting_id}?action=add_attendee&userId=${user_id}`,
        {
            method: "PATCH",
            headers: {
                Authorization: getToken()
            }
        }
    ).then( function ( response ) {
        if ( !response.ok ) {
            throw new Error( response.statusText );
        }
  
        // The response is empty (status code 204). So we do not call response.json() and instead pass on a hard-coded string to indicate success
        return "Success";
    } );
}
  
function fetchUsers() {
    return fetch( `${apiBaseUrl}/users`, {
        headers: {
            Authorization: getToken()
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
    filter,
    deleteTeam,
    addMember,
    fetchUsers
}
  