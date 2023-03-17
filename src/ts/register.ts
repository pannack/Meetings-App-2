import { register } from "../ts/services/auth-reg";

import "../../src/scss/pages/login-registration.scss";
import { loadPage } from "./load-page";

class Register {
    registerform: HTMLFormElement | null = null;
    usernameEl: HTMLInputElement | null = null;
    emailEl: HTMLInputElement | null = null;
    passwordEl: HTMLInputElement | null = null;
    confirmPasswordEl: HTMLInputElement | null = null;

    validateUsename = () => {
        const username = ( this.usernameEl as HTMLInputElement ).value.trim();
        const formUser = ( this.usernameEl as HTMLElement ).closest( ".user-name"
        ) as HTMLElement;
        const message = formUser.querySelector( ".message" ) as HTMLElement;
        let error = "";
        if ( username.length === 0 ) {
            error += "Username cannot be empty";
        } else if ( username.length < 4 ) {
            error += "Username must be at least 4 characters long";
        }
        message.textContent = error;
        return error === "";
    };

    validateEmail = () => {
        // for event listeners, this -> element where event happens (usernameEl)

        const email = ( this.emailEl as HTMLInputElement ).value.trim();
        const formEmailEl = ( this.emailEl as HTMLElement ).closest(
            ".form-email"
        ) as HTMLElement;
        const messageEl = formEmailEl.querySelector(
            ".message"
        ) as HTMLElement;

        let error = "";
        if ( !email ) {
            // empty string is considered as false
            error += "Email cannot be empty";
        }

        messageEl.textContent = error;

        return error === ""; // true for no error / false if input has errors
    };

    validatePassword = () => {
        const password = ( this.passwordEl as HTMLInputElement ).value.trim();
        const formPassword = ( this.passwordEl as HTMLElement ).closest(
            ".form-password"
        ) as HTMLElement;
        const message = formPassword.querySelector( ".message" ) as HTMLElement;
        const uppercasePat = /[A-Z]/;
        const lowercasePat = /[a-z]/;
        const digitPat = /[0-9]/;
        const specialPat = /[`~!@#$%^&*()_|+\-=?;:'",.<>{}\\]/;
        let error = "";
        if ( password.length === 0 ) {
            error += "<div>Password Cannot be Empty</div>";
        } 
        // else if ( password.length < 8 ) {
        //     error += "<div>Password Should have atleast 8 characters</div>";
        // } 
        else if ( !uppercasePat.test( password ) ) {
            error += "<div>Password must have an uppercase character</div>";
        }
            
        else if ( !lowercasePat.test( password ) ) {
            error += "<div>Password must have a lowercase character</div>";
        }
        else if ( !digitPat.test( password ) ) {
            error += `<div>Password should have a digit</div>`;
        } 
        else if ( !specialPat.test ( password ) ) {
            error += `<div>Password should have a special character`;
        }

        
        message.innerHTML = error;
        return error === "";
    };

    validateConfirmPassword = () => {
        const confirmPassword = (
      this.confirmPasswordEl as HTMLInputElement
        ).value.trim();
        const password = ( this.passwordEl as HTMLInputElement ).value.trim();
        const formConfirmPassword = ( this.confirmPasswordEl as HTMLElement ).closest(
            ".form-confirm-password"
        ) as HTMLElement;
        const message = formConfirmPassword.querySelector(
            ".message"
        ) as HTMLElement;
        let error = "";
        if ( confirmPassword !== password ) {
            error += "<div>Passwords are not matching</div>";
        }
        message.innerHTML = error;
        return error === "";
    };

    isValidate = () => {
        let valid = true;
        valid = this.validateUsename() && valid;
        valid = this.validateEmail() && valid;
        valid = this.validatePassword() && valid;
        valid = this.validateConfirmPassword() && valid;
        return valid;
    };

    addEventListeners = () => {

        this.registerform = document.querySelector( "#form-group" ) as HTMLFormElement;
        this.usernameEl = document.querySelector( ".name-r" ) as HTMLInputElement;
        this.emailEl = document.querySelector( ".email-lr" ) as HTMLInputElement;
        this.passwordEl = document.querySelector( ".pass-lr" ) as HTMLInputElement;
        this.confirmPasswordEl = document.querySelector(
            ".confrmpass"
        ) as HTMLInputElement;
        ( this.usernameEl as HTMLInputElement ).addEventListener(
            "input",
            this.validateUsename
        );
        ( this.usernameEl as HTMLInputElement ).addEventListener(
            "blur",
            this.validateUsename
        );
        ( this.emailEl as HTMLInputElement ).addEventListener(
            "input",
            this.validateEmail
        );
        ( this.emailEl as HTMLInputElement ).addEventListener(
            "blur",
            this.validateEmail
        );
        ( this.passwordEl as HTMLInputElement ).addEventListener(
            "input",
            this.validatePassword
        );
        ( this.passwordEl as HTMLInputElement ).addEventListener(
            "blur",
            this.validatePassword
        );
        ( this.confirmPasswordEl as HTMLInputElement ).addEventListener(
            "input",
            this.validateConfirmPassword
        );
        ( this.confirmPasswordEl as HTMLInputElement ).addEventListener(
            "blur",
            this.validateConfirmPassword
        );

        ( this.registerform as HTMLFormElement ).addEventListener(
            "submit",
            ( event ) => {
                event.preventDefault();
                const email = ( this.emailEl as HTMLInputElement ).value.trim();
                const username = ( this.usernameEl as HTMLInputElement ).value.trim();
                const password = ( this.passwordEl as HTMLInputElement ).value.trim();
                const credentials = {
                    name: username,
                    email: email,
                    password: password
                };

                if ( this.isValidate() ) {
                    register( credentials )
                        .then( function ( loginResponse ) {
                            console.log( loginResponse );
                            alert( "Registered Successfully" );
                            history.pushState( "", "", "/login.html" );

                            // load the page (template + controller.load execution)
                            loadPage( location.pathname );
                        } )
                        .catch(  ( ) =>{
                            alert( "Account already exsists " );
                        } );
                }
            }
        );
    };

    load = () => {
        
        this.addEventListeners();
    };
}

export default Register;
// class Register {
//     registerform: HTMLFormElement | null = null;
//     usernameEl: HTMLInputElement | null = null;
//     emailEl: HTMLInputElement | null = null;
//     passwordEl: HTMLInputElement | null = null;
//     confirmPasswordEl: HTMLInputElement | null = null;
    

//     validateUsename = () => {
//         const username = ( this.usernameEl as HTMLInputElement ).value.trim();
//         const formUser = ( this.usernameEl as HTMLElement ).closest(
//             ".user-name"
//         ) as HTMLElement;
//         const message = formUser.querySelector( ".message" ) as HTMLElement;
//         let error = "";
//         if ( username.length < 4 ) {
//             error += "Username must be at least 4 characters long";
//         }
//         message.textContent = error;
//         return error === "";
//     };
//     // validateEmail = () => {
//     // // for event listeners, this -> element where event happens (usernameEl)

//     //     const email = ( this.emailEl as HTMLInputElement ).value.trim();
//     //     const formEmailEl = ( this.emailEl as HTMLElement ).closest(
//     //         ".form-email"
//     //     ) as HTMLElement;
//     //     const messageEl = formEmailEl.querySelector(
//     //         ".message"
//     //     ) as HTMLElement;

//     //     let error = "";
//     //     if ( !email ) {
//     //         // empty string is considered as false
//     //         error += "Email cannot be empty";
//     //     }

//     //     messageEl.textContent = error;

//     //     return error === ""; // true for no error / false if input has errors
//     // };

//     validatePassword = () => {
//         const password = ( this.passwordEl as HTMLInputElement ).value.trim();
//         const formPassword = ( this.passwordEl as HTMLElement ).closest(
//             ".form-password"
//         ) as HTMLElement;
//         const message = formPassword.querySelector( ".message" ) as HTMLElement;
//         let error = "";
//         if ( !password.length ) {
//             error += "<div>Password must not be empty</div>";
//         } else {
//             const uppercasePat = /[A-Z]/;
//             if ( !uppercasePat.test( password ) ) {
//                 error += "<div>Password must have an uppercase character</div>";
//             } else {
//                 // lowercase
//                 const lowercasePat = /[a-z]/;
//                 if ( !lowercasePat.test( password ) ) {
//                     error += "<div>Password must have a lowercase character</div>";
//                 } else {
//                     const digitPat = /[0-9]/;
//                     if ( !digitPat.test( password ) ) {
//                         error += `<div>Password should have a digit</div>`;
//                     } else {
//                         const specialPat = /[`~!@#$%^&*()_|+\-=?;:'",.<>{}\\]/;
//                         if ( !specialPat.test ( password ) ) {
//                             error += `<div>Password should have a special character`;
//                         }
//                     }
//                 }
//             }
//         }
//         message.innerHTML = error;
//         return error === "";
//     };

//     validateConfirmPassword = () => {
//         const confirmPassword = (
//       this.confirmPasswordEl as HTMLInputElement
//         ).value.trim();
//         const password = ( this.passwordEl as HTMLInputElement ).value.trim();
//         const formConfirmPassword = ( this.confirmPasswordEl as HTMLElement ).closest(
//             ".form-confirm-password"
//         ) as HTMLElement;
//         const message = formConfirmPassword.querySelector(
//             ".message"
//         ) as HTMLElement;
//         let error = "";
//         if ( confirmPassword !== password ) {
//             error += "<div>Passwords are not matching</div>";
//         }
//         message.innerHTML = error;
//         return error === "";
//     };

//     isValidate = () => {
//         let valid = true;
//         valid = this.validateUsename() && valid;
//         // valid = this.validateEmail() && valid;
//         valid = this.validatePassword() && valid;
//         valid = this.validateConfirmPassword() && valid;
//         return valid;
//     };

//     addEventListeners = () => {
//         this.registerform = document.querySelector( "#form-group" ) as HTMLFormElement;
//         this.usernameEl = document.querySelector( ".name-r" ) as HTMLInputElement;
//         this.emailEl = document.querySelector( "email-lr" ) as HTMLInputElement;
//         this.passwordEl = document.querySelector( ".pass-lr" ) as HTMLInputElement;
//         this.confirmPasswordEl = document.querySelector( ".confrmpass" ) as HTMLInputElement;
//         ( this.usernameEl as HTMLInputElement ).addEventListener(
//             "input",
//             this.validateUsename
//         );
//         ( this.usernameEl as HTMLInputElement ).addEventListener(
//             "blur",
//             this.validateUsename
//         );
//         // ( this.emailEl as HTMLInputElement ).addEventListener(
//         //     "input",
//         //     this.validateEmail
//         // );
//         // ( this.emailEl as HTMLInputElement ).addEventListener(
//         //     "blur",
//         //     this.validateEmail
//         // );
//         ( this.passwordEl as HTMLInputElement ).addEventListener(
//             "input",
//             this.validatePassword
//         );
//         ( this.passwordEl as HTMLInputElement ).addEventListener(
//             "blur",
//             this.validatePassword
//         );
//         ( this.confirmPasswordEl as HTMLInputElement ).addEventListener(
//             "input",
//             this.validateConfirmPassword
//         );
//         ( this.confirmPasswordEl as HTMLInputElement ).addEventListener(
//             "blur",
//             this.validateConfirmPassword
//         );
//         ( this.registerform as HTMLFormElement ).addEventListener(
//             "submit",
//             ( event )=> {
//                 event.preventDefault();

//                 const email = ( this.emailEl as HTMLInputElement ).value.trim();
//                 const username = ( this.usernameEl as HTMLInputElement ).value.trim();
//                 const password = ( this.passwordEl as HTMLInputElement ).value.trim();

//                 const credentials = {
//                     name: username,
//                     email: email,
//                     password: password
//                 };

//                 if ( this.isValidate() ) {
//                     register( credentials )
//                         .then( function ( loginResponse ) {
//                             console.log( loginResponse );
//                             window.alert( "You have been successfully registered" );
//                             //window.location.href = "./login-page.html";
//                             history.pushState( "", "", "/login.html" );
//                             loadPage( location.pathname );
//                         } )
//                         .catch( () => {
//                             alert( "Account already exsists" );
//                         } );
//                 }
//             }
//         );
//     };

//     load = () => {
        

//         this.addEventListeners();
//     };
// }


