import teams from "../data/teams";
import Teams from "./display-teams-page";
// import showAddTeam from '../pages/teams-plus';
jest.mock( '../pages/teams-plus' );
test( '',()=>{
    const tp = new Teams();
    tp.deleteDisplayedTeam= jest.fn();
    tp.getUsers= jest.fn;
    tp.addFormEventListeners= jest.fn();
    tp.addSelectEventListeners = jest.fn();

    document.body.innerHTML =
    `<div class ="meetings-list"> </div>
    <div class ="display-teams display-teams-test"> </div>
    <div class ="display-teams display-teams-test"> </div>
    <div class ="display-teams display-teams-test"> </div>
    `;
    tp.displayTeam( teams );
    const teamsList = document.querySelector( '.meetings-list' );
    const teamsShow = document.querySelectorAll( 'display-teams-test' );
    expect( teamsList?.innerHTML ).not.toBe( '' );
    expect( teamsShow?.length ).toEqual( 0 );
} );

