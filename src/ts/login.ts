import { login } from "../ts/services/auth";

import "../../src/scss/pages/login-registration.scss";
import {loadPage} from './load-page';
class Login {
    loginForm: HTMLFormElement | null = null;

    addEventListeners = () => {
        ( this.loginForm as HTMLFormElement ).addEventListener(
            "submit",
            function ( event ) {
                event.preventDefault();
                const passwordEl = document.querySelector( "#pass-lr" ) as HTMLInputElement;

                const validatePassword=()=> {
                    const password = passwordEl.value.trim();
                    const formGroupEl = passwordEl.closest(
                        "#form-group"
                    ) as HTMLFormElement;
                    const messageEl = formGroupEl.querySelector(
                        ".message"
                    ) as HTMLSpanElement;

                    let error = "";
                    if ( password.length === 0 ) {
                        error += "Please enter your password";
                    }
                    messageEl.innerHTML = error;
                }
                passwordEl.addEventListener( "blur", validatePassword );
                passwordEl.addEventListener( "input",validatePassword );

                // extract the email and password and form a credentials object
                const credentials = {
                    email: (
            document.getElementById( "email-lr" ) as HTMLInputElement
                    ).value.trim(),
                    password: (
            document.getElementById( "pass-lr" ) as HTMLInputElement
                    ).value.trim()
                };

                // if everything is valid
                login( credentials )
                    .then( function ( loginResponse ) {
                        console.log( loginResponse );
                        //window.location.href = "./calender.html";

                        history.pushState( '','','./calender.html' );
                        loadPage( location.pathname );
                    } )
                    .catch(  ( error )=> {
                        if( !error.response ){

                            // alert( 'Incorrect Email or Password' );
                            const message = document.querySelector( ".message" ) as HTMLElement;
                            message.innerHTML = "Incorrect Password";
                        }
                        else{
                            alert( error.message );}
                    } );
            }
        );
    };

    load = () => {
        this.loginForm = document.getElementById( "form-group" ) as HTMLFormElement;

        this.addEventListeners();
    };
}

export default Login;
