import { filter } from "./auth-filter";
import meetings from "../data/meetings";

test('search will search meetings on successfull http request',(done) => {
    filter('all','google')
    .then((searchedMeeting) => {
        expect(searchedMeeting instanceof Array).toBe(true);
        expect(searchedMeeting).toEqual(meetings);
        done();
    })
})