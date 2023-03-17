import { fetchUsers,viewTeam,deleteTeam,addTeam } from "./auth-add-teams";
import users from "../data/users";
import teams from '../data/teams';

test('fetchUsers fetch all the users on teams page on successfull http request',(done)=>{
    fetchUsers()
    .then((allUsers)=>{
        expect(allUsers instanceof Array).toBe(true);
        expect(allUsers).toEqual(users);
        done();
    })
});

test('viewTeam fetch all the teams on teams page on successfull http request',(done)=>{
    viewTeam()
    .then((allTeams)=>{
        expect(allTeams instanceof Array).toBe(true);
        expect(allTeams).toEqual(teams);
        done();
    })
});
test('deleteTeam will delete team from teams page on successfull http request',(done)=>{
    deleteTeam('6320330fb95f1e00158ffa7c')
    .then((allTeams)=>{
        expect(allTeams).not.toEqual(teams);
        done();
    })
});
test('',(done)=>{
    addTeam({
        name: "Customer campaign",
        shortName: "cust-training",
        description: "Team for training",
        members: [
          {
            userId: "62f0cbe8ad71500015c8be45",
            email: "prak4@sapient.com",
          },
          {
            userId: "62f4e0c8193e1900151d4f2b",
            email: "nbhat@abcd.com",
          },
          {
            userId: "62f0d277ad71500015c8be52",
            email: "Praveenkumar4@example.com",
          },
          {
            userId: "62f0caedad71500015c8be3a",
            email: "nysh@sapient.com",
          },
        ],
      })
    .then((response) => {
        expect(response).toEqual({
            name: "Customer campaign",
            shortName: "cust-training",
            description: "Team for training",
            members: [
              {
                userId: "62f0cbe8ad71500015c8be45",
                email: "prak4@sapient.com",
              },
              {
                userId: "62f4e0c8193e1900151d4f2b",
                email: "nbhat@abcd.com",
              },
              {
                userId: "62f0d277ad71500015c8be52",
                email: "Praveenkumar4@example.com",
              },
              {
                userId: "62f0caedad71500015c8be3a",
                email: "nysh@sapient.com",
              },
            ],
          })
        done();
    })
});

