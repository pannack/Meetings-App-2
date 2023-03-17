import '../../scss/pages/calender.scss';
import { getCalender} from '../services/auth-calendar';
import IMeeting, {Attendee} from '../models/meetings';
import initNav from '../nav';

class Calendar {

    weekDay = document.getElementById( "week-day" ) as HTMLElement;
    // calenderDate = document.getElementById( "select-date" ) as HTMLInputElement;
    // selectedDate = document.getElementById( "today-date" )  as HTMLElement;
    allCalender:IMeeting[] = [];
    displayCalendar( meetings: IMeeting[] ) {
        const meetingsList = document.querySelector( ".meetings-container" ) as HTMLElement;
  
        let meetingsListStr = "";
        meetings.forEach( ( meeting: IMeeting ) => {
            const meetingAttendees = meeting.attendees.map( ( attendee ) => {
                return ( attendee as Attendee ).email;
            } ).join( ',' );
  
            const duration =
          parseInt( `${meeting.endTime.hours}` ) * 60 +
          parseInt( `${meeting.endTime.minutes}` ) -
          ( parseInt( `${meeting.startTime.hours}` ) * 60 +
            parseInt( `${meeting.startTime.minutes}` ) ) +
          ( parseInt( `${meeting.endTime.hours}` ) -
            parseInt( `${meeting.startTime.hours}` ) ) *
            10;
            const topHeight =
          parseInt( `${meeting.startTime.hours}` ) * 60 +
          parseInt( `${meeting.startTime.minutes}` ) +
          parseInt( `${meeting.startTime.hours}` ) * 10;
  
            meetingsListStr += `
        <div>
          <div class="calendar-add" style="
               top:${topHeight}px;
               height:${duration}px;
              ">
            <div class="name-heading-1"><b>${meeting.name}</b></div>    
            <div class=atend>Attendees: ${meetingAttendees}</div>    
          </div>
        </div>
         `;
        
        } );
        meetingsList.innerHTML = meetingsListStr;
      
    }
    setDay=( day : number ) =>{
        let weekday;
        if ( day === 0 ) {
            weekday = "Sunday";
        } else if ( day === 1 ) {
            weekday = "Monday";
        } else if ( day === 2 ) {
            weekday = "Tuesday";
        } else if ( day === 3 ) {
            weekday = "Wednesday";
        } else if ( day === 4 ) {
            weekday = "Thursday";
        } else if ( day === 5 ) {
            weekday = "Friday";
        } else if ( day === 6 ) {
            weekday = "Saturday";
        } else {
            weekday = "";
        }
        this.weekDay.innerHTML = weekday;
    }
    fetchCalender = ( date:string ) => {
        getCalender( date )
            .then( ( calender ) => {
                this.allCalender = calender;
                this.displayCalendar( calender );
            } )
            .catch( function( error ){
                alert( error.message );
            } )
    }
    // fetchMeetings = (fetchDate: string) => {
    //   getCalender(fetchDate).then((meetings: IMeeting[]) => {
    //     this.displayCalendar(meetings);
    //   });
    // };
  
    load = () => {
        const month = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        const today = new Date();
        let date =
        today.getFullYear() +
        "-" +
        ( today.getMonth() + 1 ) +
        "-" +
        today.getDate();
  
        const todaysDate = document.getElementById( "today-date" );
        ( todaysDate as HTMLElement ).textContent = `${today.getDate()} ${
            month[today.getMonth()]
        } ${today.getFullYear()}`;
        const todayDay = new Date( today );
        this.setDay( todayDay.getDay() );

      
  
        this.fetchCalender( date );
  
        const selectDate = document.getElementById( "select-date" );
        ( selectDate as HTMLInputElement ).addEventListener( "input", () => {
            const searchDate = ( selectDate as HTMLInputElement ).value;
            date = ( selectDate as HTMLInputElement ).value;
            const monthIndex = parseInt( date[6] + date[7] ) - 1;
            (
          todaysDate as HTMLElement
            ).textContent = `${date[8]}${date[9]} ${month[monthIndex]} ${date[0]}${date[1]}${date[2]}${date[3]}`;
            const fetchingDay = new Date( searchDate );
            this.setDay( fetchingDay.getDay() );

            this.fetchCalender( searchDate );
        
        } );
        initNav();
    };
}

// class Calendar {
//     allCalender:IMeeting[] = [];
//     calenderDate = document.getElementById( "date" ) as HTMLInputElement;
//     selectedDate = document.getElementById( "selected-date" )  as HTMLElement;
//     weekDay = document.getElementById( "week-day" ) as HTMLElement;
//     displayCalender =( calender : IMeeting[] ) =>{
//         const meetingsList = document.querySelector( ".meetings-container" ) as HTMLElement;
//         let meetingsListStr = "";
//         calender.forEach( function ( calender ) {
//             const attendeesEmail = calender.attendees
//                 .map( function ( attendee ) {
//                     return ( attendee as Attendee ).email;
//                 } )
//                 .join( "," );
//             // 1min- 1px so time*60px, *10 for the distance between 2 time
//             const duration =
//               parseInt( `${calender.endTime.hours}` ) * 60 +
//               parseInt( `${calender.endTime.minutes}` ) -
//               ( parseInt( `${calender.startTime.hours}` ) * 60 +
//                 parseInt( `${calender.startTime.minutes}` ) ) +
//               ( parseInt( `${calender.endTime.hours}` ) -
//                 parseInt( `${calender.startTime.hours}` ) ) *
//                 10;
//             const topHeight =
//               parseInt( `${calender.startTime.hours}` ) * 60 +
//               parseInt( `${calender.startTime.minutes}` ) +
//               parseInt( `${calender.startTime.hours}` ) * 10;
//             meetingsListStr += `
              
       
//                     <div class="calender-add" style="top:${topHeight}px; height:${duration}px;">
//                         <div class="meeting-name">${calender.name}</div>   
//                         <div class=name-heading></div> 
//                         <div>Attendees: ${attendeesEmail}</div>    
//                     </div>
                 
//                  `;
//         } );
//         meetingsList.innerHTML = meetingsListStr;
//     }
        
//     setDay=( day : number ) =>{
//         let weekday;
//         if ( day === 0 ) {
//             weekday = "Sunday";
//         } else if ( day === 1 ) {
//             weekday = "Monday";
//         } else if ( day === 2 ) {
//             weekday = "Tuesday";
//         } else if ( day === 3 ) {
//             weekday = "Wednesday";
//         } else if ( day === 4 ) {
//             weekday = "Thrusday";
//         } else if ( day === 5 ) {
//             weekday = "Friday";
//         } else if ( day === 6 ) {
//             weekday = "Saturday";
//         } else {
//             weekday = "";
//         }
//         this.weekDay.innerHTML = weekday;
//     }
//     setDate = ()=>{
//         this.calenderDate.addEventListener( 'input',() => {
//             const pickDate = this.calenderDate.value;
//             this.selectedDate.innerHTML = `${pickDate}`;
//             const fetchingDay = new Date( pickDate );
//             this.setDay( fetchingDay.getDay() );
//             this.fetchCalender( pickDate );
//         } );
//     }
      
//     fetchCalender = ( date:string ) => {
//         getCalender( date )
//             .then( ( calender ) => {
//                 this.allCalender = calender;
//                 this.displayCalender( calender );
//             } )
//             .catch( function( error ){
//                 alert( error.message );
//             } )
//     }
    
      
//     load =()=> {
//         const today = new Date();
//         const date =
//             today.getFullYear() +
//             "-" +
//             ( today.getMonth() + 1 ).toString().padStart( 2,'0' ) +
//             "-" +
//             today.getDate().toString().padStart( 2,'0' );
            
//         let month;
//         if ( today.getMonth() === 0 ) {
//             month = `January`;
//         } else if ( today.getMonth() === 1 ) {
//             month = `February`;
//         } else if ( today.getMonth() === 2 ) {
//             month = `March`;
//         } else if ( today.getMonth() === 3 ) {
//             month = `April`;
//         } else if ( today.getMonth() === 4 ) {
//             month = `May`;
//         } else if ( today.getMonth() === 5 ) {
//             month = `June`;
//         } else if ( today.getMonth() === 6 ) {
//             month = `July`;
//         } else if ( today.getMonth() === 7 ) {
//             month = `August`;
//         } else if ( today.getMonth() === 8 ) {
//             month = `September`;
//         } else if ( today.getMonth() === 9 ) {
//             month = `October`;
//         } else if ( today.getMonth() === 10 ) {
//             month = `November`;
//         } else if ( today.getMonth() === 11 ) {
//             month = `December`;
//         }
      
//         this.selectedDate.innerHTML =
//             today.getDate() + ` ${month} ` + today.getFullYear();
//         this.setDay( today.getDay() );
//         this.fetchCalender( date );
//         this.setDate();
//         initNav();
//     }
// }



export default Calendar;
