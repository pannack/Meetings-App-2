import Config from "../config";

import Credentials from "../models/Credentials-register";

const {apiBaseUrl} = Config
function register( credentials : Credentials ) {
    return fetch( `${apiBaseUrl}/auth/register`, {
        method: "POST",
        body: JSON.stringify( credentials ),
        headers: {
            // Authorization: "sdkbkjwbejwbveiwbviwb"
            "Content-Type": "application/json"
        }
    } ).then( function ( response ) {
        if ( !response.ok ) {
            // for 404 kind of errors, we should check and explcitly throw an error
            throw new Error( response.statusText );
        }

        return "Registered Successfully";
    } );
}

export{
    register
}