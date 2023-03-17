import Login from './login';
import Register from './register';
import Calendar from '../ts/pages/calender';
import addingMeeting from '../ts/pages/add-meeting';
import filterMeeting from '../ts/pages/filter-meeting';
import Teams from '../ts/pages/display-teams-page';
import {isAuthenticated} from '../ts/services/auth';
// import AddWorkshop from './pages/add-workshop';
// interface for a function that can be called with new

interface Constructable<T> {
    new( ...args: any ) : T;
}

interface Routes<T> {
    [key: string]: {
        template: string,
        Controller: Constructable<any> | null
        auth: boolean;
    }
}


const routes : Routes<any> = {
    '/':{
        template: 'login-page',
        Controller: Login,
        auth: false
    },

    '/registration.html': {
        template: 'registration-page',
        Controller: Register,
        auth :false
    },
    '/login.html': {
        template: 'login-page',
        Controller: Login,
        auth: false
    },
    '/calender.html': {
        template: 'calendar',
        Controller: Calendar ,
        auth:true
    },
    
    
    '/add-meeting.html': {
        template: 'add-meeting',
        Controller: addingMeeting,
        auth:true
    },
    '/filter-meeting.html':{
        template : 'filter-meeting',
        Controller : filterMeeting,
        auth:true
    },
    '/teams.html':{
        template: 'teams',
        Controller: Teams,
        auth:true
    },

    '*': {
        template: 'page-not-found',
        Controller: null,
        auth:false
    }
};

// /**
//  * 1. Prevent loading of new page when a link is clicked
//  * 2. Change the URL in the address bar (using history.pushState( '', '', newUrl ))
//  * 3. Change the content of the page according to the new URL (read the right template and set it within the #root). Execute the JS required page JS.
//  */
const setupLinks = () => {
    // 1. Prevent loading of new page when a link is clicked
    const links = document.querySelectorAll( 'a' );

    links.forEach(
        link => {
            link.addEventListener( 'click', function( event ) {
                event.preventDefault();

                // 2. Change the URL in the address bar (using history.pushState( '', '', newUrl ))
                const nextPageUrl = link.getAttribute( 'href' );
                history.pushState( '', '', nextPageUrl );

                // 3. Change the content of the page according to the new URL (read the right template and set it within the #root). Execute the JS required page JS.
                loadPage( location.pathname );
            } );
        }
    );
};

const loadPage = ( pathname : string ) => {
    let route;

    if( pathname in routes ) {
        route = routes[pathname];
    }else{
        route = routes['*'];
    }

    if( route?.auth === true ){
        if( isAuthenticated()===false ){
            loadPage( './login.html' );
            return;
        }
    }
    if( route?.template ) {
        // load the page content inside <div id="root"></div>
        const root = document.getElementById( 'root' ) as HTMLElement;
        const tpl = ( document.getElementById( route.template ) as HTMLTemplateElement ).innerHTML;
        root.innerHTML = tpl;
    }

    // initialize the page
    if( route?.Controller ) {
        ( new route.Controller() ).load();
        setupLinks();
    }
};
export
{ loadPage};