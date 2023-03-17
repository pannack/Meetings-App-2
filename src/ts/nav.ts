import { logout , getEmail} from "./services/auth";

const initNav =()=>{
    const menuToggler = document.querySelector( ".menu-icon" ) as HTMLLinkElement;
    const navBar = document.querySelector( ".nav-first" ) as HTMLDivElement;
    const logoutButton = document.querySelector( ".logout" ) as HTMLElement;
    const emailAuth = document.querySelector( ".auth-email" ) as HTMLElement;
    menuToggler.onclick =  ( event )=> {
        event.preventDefault();
        navBar.classList.toggle( "d-sm-none" );
    };

    logoutButton.addEventListener( "click", function () {
        logout();

        window.location.href = "./login.html";
    } );

    emailAuth.innerHTML = `${getEmail()}`;
}

export default initNav;
