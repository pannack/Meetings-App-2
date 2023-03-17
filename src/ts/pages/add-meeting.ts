import '../../scss/pages/meeting-css/add-meeting.scss';
import { addMeetings} from '../services/auth-add-meeting';
import initNav from '../nav';
import { loadPage } from '../load-page';

class addingMeeting{
    meetAdd = document.querySelector( "#form-add-meeting" ) as HTMLFormElement;
    meetNameEl = document.querySelector( "#name" ) as HTMLInputElement;
    dateMeetEl = document.querySelector( ".date" ) as HTMLInputElement;
    startHoursEl = document.querySelector( ".hours" ) as HTMLSelectElement;
    startMinutesEl = document.querySelector( ".minutes" ) as HTMLSelectElement;
    endHoursEl = document.querySelector( ".end-hours" ) as HTMLSelectElement;
    endMinutesEl = document.querySelector( ".end-minutes" ) as HTMLSelectElement;
    descriptionEl = document.querySelector( "#description" ) as HTMLTextAreaElement;
    attendeesEl = document.querySelector( "#email" ) as HTMLInputElement;


    validateDate=()=> {

        const meetingDate = this.dateMeetEl.value;
        const formEl = this.dateMeetEl.closest( ".date-entry" ) as HTMLElement;
        const messageEl = formEl.querySelector( ".message" ) as HTMLElement;
        let error = "";
        const todayDate = new Date();
        const selectedDate = new Date( meetingDate );
        const todayDay = todayDate.getDate();
        const selectedDay = selectedDate.getDate();
        const todayYear = todayDate.getFullYear();
        const selectedYear = selectedDate.getFullYear();
        const todayMonth = todayDate.getMonth();
        const selectedMonth = selectedDate.getMonth();

        if ( todayYear > selectedYear ) {
            error += "Date Should be greater than today's date";
        } else if ( todayYear === selectedYear ) {
            if ( todayMonth > selectedMonth ) {
                error += "Date Should be greater than today's date";
            } else if ( todayMonth === selectedMonth ) {
                if ( todayDay > selectedDay ) {
                    error += "Date Should be greater than today's date";
                }
            }
        }
        messageEl.innerHTML = error;
        return error === "";
    }
    validateTime =()=> {
        const startHour = this.startHoursEl.value;
        const startMinute = this.startMinutesEl.value;
        const endHour = this.endHoursEl.value;
        const endMinute = this.endMinutesEl.value;
        const formEl = this.endHoursEl.closest( ".input" ) as HTMLElement;
        const messageEl = formEl.querySelector( ".message" ) as HTMLElement;
        let error = "";

        const startHr = parseInt( startHour );
        const startMin = parseInt( startMinute );
        const endHr = parseInt( endHour );
        const endMin = parseInt( endMinute );

        if ( startHr > endHr ) {
            error += "End time must be greater than start time";
        } else if ( startHr === endHr ) {
            if ( startMin > endMin ) {
                error += "End time must be greater than start time";
            }
        }
        messageEl.innerHTML = error;
        return error === "";
    }

  

    isValidate =()=> {
        let valid = true;
        valid = this.validateDate() && valid;
        valid = this.validateTime() && valid;
        return valid;
    
    }
 
    addEventListeners =()=> {

        this.dateMeetEl.addEventListener( "input", this.validateDate );
        this.dateMeetEl.addEventListener( "blur", this.validateDate );
        this.startHoursEl.addEventListener( "input", this.validateTime );
        this.startHoursEl.addEventListener( "blur", this.validateTime );
        this.endHoursEl.addEventListener( "input", this.validateTime );
        this.endHoursEl.addEventListener( "blur", this.validateTime );
        this.startMinutesEl.addEventListener( "input", this.validateTime );
        this.startMinutesEl.addEventListener( "blur", this.validateTime );
        this.endMinutesEl.addEventListener( "input", this.validateTime );
        this.endMinutesEl.addEventListener( "blur", this.validateTime );

        this.meetAdd.addEventListener( "submit", ( event )=> {
            event.preventDefault();

            const date = this.dateMeetEl.value;
            const startHours = this.startHoursEl.value;
            const startMinutes = this.startMinutesEl.value;
            const endHours = this.endHoursEl.value;
            const endMinutes = this.endMinutesEl.value;
            const nameMeet = this.meetNameEl.value;
            const decription = this.descriptionEl.value;
            const attendees = this.attendeesEl.value.split( ',' );
            const attendeesList = attendees.map( ( attendee )=>{
                return attendee.trim();
            } );

            const credentials = {
                date: date,
                startTime: {
                    hours: parseInt( startHours ),
                    minutes: parseInt( startMinutes )
                },
                endTime: {
                    hours: parseInt( endHours ),
                    minutes: parseInt( endMinutes )
                },
                name: nameMeet,
                description: decription,
                attendees: attendeesList
            };

            if ( this.isValidate() ) {
                addMeetings( credentials )
                    .then( ( addMeetingResponse )=> {
                        console.log( addMeetingResponse );
                        window.alert( "Meeting added successfully" );
                        //window.location.href = "./filter-meeting.html"
                        history.pushState( '','','./add-meeting.html' );
                        loadPage( location.pathname );
                    } )
                    .catch( ( error )=> {
                        alert( error.message );
                    } );
            }
        } );
    }

    load=()=> {
        this.addEventListeners();
        initNav();

    }
}

export default addingMeeting ;