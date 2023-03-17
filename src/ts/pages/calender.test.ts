import Calendar from './calender';

import meetings from '../data/meetings';
import attendee from '../data/attendees';
test('displayMeeting shows the data on the calendar when the date is given', () => {
  const dm = new Calendar();
  document.body.innerHTML = `
  <div class="meetings-container"></div>
  `;
  const allCalendar = document.querySelector(".meetings-container");

  dm.displayCalendar(meetings);

  for(let i=0; i<meetings.length; i++){
      expect(allCalendar?.innerHTML).toMatch(meetings[i].name);
  }
  for(let i=0; i<attendee.length; i++){
      expect(allCalendar?.innerHTML).toMatch(attendee[i].email);
  }
  expect(allCalendar?.innerHTML).not.toEqual('');
})