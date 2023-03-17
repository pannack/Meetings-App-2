import meeting from "../data/meetings";

import filterMeeting from "./filter-meeting";

test ( '',()=>{
    const sp = new filterMeeting();
    sp.deleteDisplayedMeeting = jest.fn();
    sp.addEventListeners = jest.fn();
    sp.getUsers = jest.fn();

    document.body.innerHTML = `<div class="search-list"></div>`
    sp.displaySearchItems( meeting );
    const searchList = document.querySelector( '.search-list' )?.innerHTML;
    expect( searchList ).not.toBe( '' );
} );