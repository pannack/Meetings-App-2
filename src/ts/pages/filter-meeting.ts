import {
    filter,
    deleteTeam,
    addMember,
    fetchUsers
} from "../services/auth-filter";
import '../../scss/pages/meeting-css/filter-meeting.scss';
import IMeeting, { Attendee } from "../models/meetings";
import initNav from "../nav";
import IUsers from "../models/users";
import { loadPage } from "../load-page";

class filterMeeting {
    searchItemList: IMeeting[] = [];

    addEventListeners = () => {
        const form = document.querySelector( ".filter-form" ) as HTMLFormElement;
        const date = document.querySelector( "#dates" ) as HTMLInputElement;
        const search = document.getElementById(
            "description"
        ) as HTMLTextAreaElement;
        form.addEventListener( "submit", ( event ) => {
            event.preventDefault();
            const dateValue = date.value;
            const searchValue = search.value.trim();
            this.fetchSearchedItem( dateValue, searchValue );
        } );
    };

    displaySearchItems = ( display: IMeeting[] ) => {
        const searchList = document.querySelector( ".search-list" ) as HTMLDivElement;
        let string = "";
        display.forEach( function ( list ) {
            const year = list.date[0] + list.date[1] + list.date[2] + list.date[3];
            const day = list.date[8] + list.date[9];
            //let dayLatest = parseInt(day)+1;
            let month = list.date[5] + list.date[6];
            if ( parseInt( month ) == 1 ) {
                month = `January`;
            } else if ( parseInt( month ) == 2 ) {
                month = `February`;
            } else if ( parseInt( month ) == 3 ) {
                month = `March`;
            } else if ( parseInt( month ) == 4 ) {
                month = `April`;
            } else if ( parseInt( month ) == 5 ) {
                month = `May`;
            } else if ( parseInt( month ) == 6 ) {
                month = `June`;
            } else if ( parseInt( month ) == 7 ) {
                month = `July`;
            } else if ( parseInt( month ) == 8 ) {
                month = `August`;
            } else if ( parseInt( month ) == 9 ) {
                month = `September`;
            } else if ( parseInt( month ) == 10 ) {
                month = `October`;
            } else if ( parseInt( month ) == 11 ) {
                month = `November`;
            } else if ( parseInt( month ) == 12 ) {
                month = `December`;
            }

            const emailSelect = list.attendees
                .map( ( member ) => {
                    return ( member as Attendee ).email;
                } )
                .join( ", " );
            string += `
          <div class="display-meeting" data-id="${list._id}">
              <h2 class="display-team-name">
              ${day} ${month} ${year} ${list.startTime.hours}:${list.startTime.minutes} - ${list.endTime.hours}:${list.endTime.minutes}
              </h2>
              <h3 class="display-team-short-name">${list.name}</h3>
              <button class="excuse ">Excuse yourself</button>
              <div class="name-heading"></div>
              <p class="attendees"><strong>Attendees</strong> : ${emailSelect} </p>
              <div class="member">
              <form action="https://mymeetingsapp.herokuapp.com/api/meetings" method="PATCH" 
                class="team-dropdown select-form">
                  <select class="team-select" aria-label="Selecting a member">
                      <option value="">Select Member</option>
                  </select>
                  <button id="add">Add</button>
                  </form>
              </div>
          </div>
          `;
        } );
        searchList.innerHTML = string;
        this.deleteDisplayedMeeting();
        this.addMemberEventListeners();
        this.getUsers();
    };

    deleteDisplayedMeeting = () => {
        const btn = document.querySelectorAll( ".excuse" );
        btn.forEach( function ( btn ) {
            btn.addEventListener( "click",  (  )=> {
                const team = btn.closest( ".display-meeting" ) as HTMLElement;
                const teamId = team.getAttribute( "data-id" );
                deleteTeam( teamId as string )
                    .then( (  )=> {
                        team.remove();
                    } )
                    .catch( function ( error ) {
                        alert( error.message );
                    } );
            } );
        } );
    };

    displayUsers = ( response: IUsers[] ) => {
        const select = document.querySelectorAll( ".team-select" );
        select.forEach( function ( select ) {
            let str = "";
            response.forEach( ( usersList ) => {
                str += `<option value="${usersList._id}">${usersList.email}</option>`;
            } );
            select.innerHTML += str;
        } );
    };

    addMemberEventListeners = () => {
        const selectForms = document.querySelectorAll( ".select-form" );

        selectForms.forEach( function ( selectForm ) {
            const selectMember = selectForm.querySelector(
                ".team-select"
            ) as HTMLInputElement;
            selectForm.addEventListener( "submit", ( event ) => {
                event.preventDefault();
                const userId = selectMember.value;
                const team = selectForm.closest( ".display-meeting" ) as HTMLElement;
                const teamId = team.getAttribute( "data-id" );
                
                addMember( teamId as string, userId as string )
                    .then( function ( filterMeetingResponse ) {
                        console.log( filterMeetingResponse );
                        window.alert( "member added successfully" );
                        //window.location.href = "./filter-meeting.html";
                        history.pushState( '','','/filter-meeting.html' );
                        loadPage( location.pathname );

                    } )
                    .catch( function ( error ) {
                        alert( error.message );
                    } );
                
            } );
        } );
    };

    getUsers = () => {
        fetchUsers()
            .then( ( response ) => {
                this.displayUsers( response );
            } )
            .catch( function ( error ) {
                alert( error.message );
            } );
    };

    fetchSearchedItem = ( date: string, searchItem: string ) => {
        filter( date, searchItem )
            .then( ( response ) => {
                this.searchItemList = response;
                this.displaySearchItems( response );
            } )
            .catch( ( error ) => {
                alert( error.message );
            } );
    };
    load = () => {
        this.addEventListeners();
        initNav();
    };
}

export default filterMeeting;
