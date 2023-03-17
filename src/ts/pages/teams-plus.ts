const showAddTeam=()=> {
    const plusSign = document.querySelector( ".team-plus" ) as HTMLElement;
    const addMeetingForm = document.querySelector( ".meetings" ) as HTMLFormElement;
    plusSign.addEventListener( "click", ( )=> {
        addMeetingForm.classList.remove( "hide-form" );
        plusSign.classList.add( "hide-form" );
    } );
}

export default showAddTeam; 
