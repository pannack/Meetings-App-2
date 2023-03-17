interface Attendee {
    userId:string,
    email:string
}

interface IMeeting {
    startTime: {
        hours: number,
        minutes: number
    },
    endTime: {
        hours: number,
        minutes: number
    },
    _id?: string,
    name: string,
    description: string,
    date: string,
    attendees:Attendee[] | string[]
}

export default IMeeting;
export {
    Attendee
}