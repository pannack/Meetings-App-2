import { response } from "msw";
import { register } from "./auth-reg";

test( '',( done )=>{
    register( {
        "name": "Prarthana K",
        "email": "prak4@sapient.com",
        "password": "Prak4@16"
    } ).then( ( response )=>{
        
        done();
    } )
} )