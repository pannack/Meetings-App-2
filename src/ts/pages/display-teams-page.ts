import {
    addTeam,
    viewTeam,
    deleteTeam,
    addMember,
    fetchUsers

} from '../services/auth-add-teams';
import initNav from '../nav';
import showAddTeam from './teams-plus';
import ITeam ,{Member} from '../models/teams';
import IUsers from '../models/users';
import '../../scss/pages/teams.scss';
import { loadPage } from '../load-page';
class Teams {
    teamList :ITeam[]= [];
    form : HTMLFormElement | null = null;
    nameEl : HTMLInputElement | null = null;
    shortNameEl : HTMLInputElement | null = null;
    descriptionEl : HTMLTextAreaElement | null = null;
    teamSelectEl : HTMLInputElement | null = null;

    displayTeam= ( response:ITeam[] ) =>{
        const teamDisplay = document.querySelector( ".meetings-list" ) as HTMLElement;
        const team = teamDisplay.querySelectorAll( ".display-teams" );
        team.forEach( function ( list ) {
            list.remove();
        } );
        let string = "";
        response.forEach( function ( list ) {
            const emailSelect = list.members
                .map( function ( member ) {
                    return ( member as Member ).email;
                } )
                .join( ", " );
            string += `
            <div class="display-teams team-list meetings" data-id="${list._id}">
                <h2 class="display-team-name">${list.name}</h2>
                <h3 class="display-team-short-name">${list.shortName}</h3>
                <div class="description">
                    ${list.description}
                </div>
                <button class="excuse">Excuse yourself</button>
                <div class="name-heading"></div>
                <p class="member"><strong>Members</strong> : ${emailSelect} </p>
                <div class="team-dropdown">
                <form action="https://mymeetingsapp.herokuapp.com/api/teams" method="PATCH" 
                class="team-dropdown select-form">
                    <select class="member-select" aria-label="Adding a member">
                        <option value="">Select Member</option>
                    </select>
                    <button class="add">Add</button>
                    </form>
                </div>
            </div>
            `;
        } );
        teamDisplay.innerHTML += string;

        showAddTeam();
        this.deleteDisplayedTeam();
        this.getUsers();
        this.addFormEventListeners();
        this.addSelectEventListeners();
    }

    deleteDisplayedTeam=()=> {
        const btn = document.querySelectorAll( ".excuse" );
        btn.forEach( ( btn )=> {
            btn.addEventListener( "click",  ( )=> {
                const team = btn.closest( ".display-teams" ) as HTMLElement;
                const teamId = team.getAttribute( "data-id" );
                deleteTeam( teamId as string )
                    .then( ( )=> {
                        team.remove();
                    } )
                    .catch( ( error )=> {
                        alert( error.message );
                    } );
            } );
        } );
    }

    displayUsers=( response:IUsers[] )=> {
        const select = document.querySelectorAll( ".member-select" );
        select.forEach( function ( select ) {
            let str = "";
            response.forEach( function ( usersList ) {
                str += `<option value="${usersList._id}">${usersList.email}</option>`;
            } );
            select.innerHTML += str;
        } );
    }

    addSelectEventListeners=()=> {
        const selectForms = document.querySelectorAll( ".select-form" );

        selectForms.forEach( function ( selectForm ) {
            const selectMember = selectForm.querySelector( ".member-select" ) as HTMLInputElement;
            selectForm.addEventListener( "submit", function ( event ) {
                event.preventDefault();
                const userId = selectMember.value;
                const team = selectForm.closest( ".display-teams" ) as HTMLElement;
                const teamId = team.getAttribute( "data-id" );
                
                addMember( teamId as string, userId as string )
                    .then( ( teamsResponse )=> {
                        console.log( teamsResponse );
                        //window.location.href = "./teams.html";
                        history.pushState( '','','/teams.html' );
                        loadPage( location.pathname );
                    } )
                    .catch( ( error ) =>{
                        alert( error.message );
                    } );
                
            } );
        } );
    }
    // function selectMember(){
    //   const memberSelection = document.querySelector(.member-selection)
    // }
    getUsers=()=> {
        fetchUsers()
            .then( ( response ) =>{
                this.displayUsers( response );
            } )
            .catch( ( error )=> {
                alert( error.message );
            } );
    }

   
    validateTeamName = () => {
        const name = ( this.nameEl as HTMLInputElement ).value.trim();
        const form = ( this.nameEl as HTMLElement ).closest( ".team-name-add" ) as HTMLElement;
        const message = form.querySelector( '.message' ) as HTMLElement;
        let error = '';
        if( name === null || name ==='' ){
            error += 'Team Name cannot be empty';
        }
        message.textContent = error;
        return error === '';
    } 

    validateTeamShortName = () =>{
        const shortName = ( this.shortNameEl as HTMLInputElement ).value.trim();
        const shortNameForm = ( this.shortNameEl as HTMLInputElement ).closest( '.team-short-name-add' ) as HTMLElement;
        const message = shortNameForm.querySelector( '.message' ) as HTMLElement;
        let error = '';
        const spaceInBetween = /^\S+$/;
        if( !spaceInBetween.test( shortName ) ){
            error  += 'No space in between team short name';
        }
        message.innerHTML = error;
        return error === '';
    }
    isValidate = () => {
        let valid = true;
        valid = this.validateTeamShortName() && valid;
        valid = this.validateTeamName() && valid;
        return valid;
    }
    
    addFormEventListeners=()=> {
        this.form = document.querySelector( ".form" ) as HTMLFormElement;
        this. nameEl = document.querySelector( "#team-name" ) as HTMLInputElement;
        this.shortNameEl = document.querySelector( "#team-short-name" ) as HTMLInputElement;
        this.descriptionEl = document.querySelector( ".team-description" ) as HTMLTextAreaElement;
        this.teamSelectEl = document.querySelector( ".team-select" ) as HTMLInputElement;
        ( this.shortNameEl as HTMLInputElement ).addEventListener( "input",this.validateTeamShortName );
        ( this.shortNameEl as HTMLInputElement ).addEventListener( "blur",this.validateTeamShortName );
        ( this.nameEl as HTMLInputElement ).addEventListener( "input",this.validateTeamName );
        ( this.nameEl as HTMLInputElement ).addEventListener( "blur",this.validateTeamName );

        
        ( this.form as HTMLFormElement ).addEventListener( "submit",  ( event )=> {
            event.preventDefault();
            const name = ( this.nameEl as HTMLInputElement ).value.trim();
            const shortName = ( this.shortNameEl as HTMLInputElement ).value.trim();
            const description = ( this.descriptionEl as HTMLTextAreaElement ).value.trim();
            const teamSelect = ( this.teamSelectEl as HTMLInputElement ).value;
    
            const credentials :ITeam= {
                name: name,
                shortName: shortName,
                description: description,
                members: [teamSelect]
            };
    
            if ( this.isValidate() ) {
                addTeam( credentials )
                    .then( function ( addTeamsResponse ) {
                        console.log( addTeamsResponse );
                        window.alert( "Team added successfully" );
                        // window.location.href = "./teams.html";
                        history.pushState( '','','/teams.html' )
                        loadPage( location.pathname );
                    } )
                    .catch( function ( error ) {
                        alert( error.message );
                    } );
            }
        } );
    }

    fetchTeam=()=> {
        viewTeam()
            .then( ( response ) =>{
                this.teamList = response;
                this.displayTeam( response );
            } )
            .catch( ( error ) =>{
                alert( error.message );
            } );
    }

    load =()=> {
        this.fetchTeam();
        this.addFormEventListeners();
        initNav();
    
    }
}

export default Teams;
