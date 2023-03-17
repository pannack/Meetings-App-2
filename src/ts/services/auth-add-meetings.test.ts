import {addMeetings} from './auth-add-meeting';
test('',(done)=>{
    addMeetings({
        name: "Google marketing campaign",
        description: "Increasing brand awareness and spreading information about new products",
        date: "2022-09-16",
        startTime: {
            hours: 10,
            minutes: 0
        },
        endTime: {
            hours: 10,
            minutes: 30
        },
        attendees: [
                 "nysh@sapient.com",
                 "rehan.pathan@publicisgroupe.com"
        ]
    })
    .then((response)=>{
        expect(response).toEqual({
            name: "Google marketing campaign",
        description: "Increasing brand awareness and spreading information about new products",
        date: "2022-09-16",
        startTime: {
            hours: 10,
            minutes: 0
        },
        endTime: {
            hours: 10,
            minutes: 30
        },
        attendees: [
                 "nysh@sapient.com",
                 "rehan.pathan@publicisgroupe.com"
        ]
    });
    
        done();
    })
})