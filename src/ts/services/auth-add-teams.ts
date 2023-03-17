import {getToken } from './auth';
import ITeam from '../models/teams';
import Config from '../config';

const {apiBaseUrl} = Config;

function addTeam( credentials:ITeam ) {
    return fetch( `${apiBaseUrl}/teams`, {
        method: "POST",
        body: JSON.stringify( credentials ),
        headers: {
            Authorization: getToken(),
            "Content-Type": "application/json"
        }
    } ).then( ( response ) =>{
        if ( !response.ok ) {
            // for 404 kind of errors, we should check and explcitly throw an error
            throw new Error( response.statusText );
        }

        return response.json();
    } );
}

function viewTeam() {
    return fetch( `${apiBaseUrl}/teams`, {
        headers: {
            Authorization: getToken()
        }
    } ).then( ( response )=> {
        if ( !response.ok ) {
            // for 404 kind of errors, we should check and explcitly throw an error
            throw new Error( response.statusText );
        }

        return response.json();
    } );
}

function deleteTeam( teamId:string ) {
    return fetch(
        `${apiBaseUrl}/teams/${teamId}?action=remove_member`,
        {
            method: "PATCH",
            headers: {
                Authorization: getToken()
            }
        }
    ).then( ( response ) =>{
        if ( !response.ok ) {
            throw new Error( response.statusText );
        }

        // The response is empty (status code 204). So we do not call response.json() and instead pass on a hard-coded string to indicate success
        return "Success";
    } );
}

function addMember( team_id:string, user_id:string ) {
    return fetch(
        `${apiBaseUrl}/teams/${team_id}?action=add_member&userId=${user_id}`,
        {
            method: "PATCH",
            headers: {
                Authorization: getToken()
            }
        }
    ).then( ( response )=> {
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
    } ).then( ( response )=> {
        if ( !response.ok ) {
            // for 404 kind of errors, we should check and explcitly throw an error
            throw new Error( response.statusText );
        }

        return response.json();
    } );
}

export {
    addTeam,
    viewTeam,
    deleteTeam,
    addMember,
    fetchUsers

}