import {getCalender} from "./auth-calendar";
import meetings from '../data/meetings';

//import 'whatwg-fetch'; //creates a fetch for Node.js
//import '../setupTests';

test('getMeetings fetches the meetings on to the calendar page when the HTTP request is successful',(done) => {

    getCalender('2022-08-17')
    .then((calenderMeetings) =>{
        expect(calenderMeetings instanceof Array).toBe(true);
        expect(calenderMeetings).toEqual(meetings);
        done();
    });
});