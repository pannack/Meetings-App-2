import { rest } from "msw";

import meetings from "../data/meetings";
import teams from "../data/teams";
import users from "../data/users";

const handlers = [
    rest.get(
        `https://mymeetingsapp.herokuapp.com/api/calendar`,
        ( req, res, ctx ) => {
            return res( ctx.json( meetings ) );
        }
    ),
    rest.get( `https://mymeetingsapp.herokuapp.com/api/users`, ( req, res, ctx ) => {
        return res( ctx.json( users ) );
    } ),
    rest.get( `https://mymeetingsapp.herokuapp.com/api/teams`, ( req, res, ctx ) => {
        return res( ctx.json( teams ) );
    } ),
    rest.get(
        `https://mymeetingsapp.herokuapp.com/api/meetings`,
        ( req, res, ctx ) => {
            return res( ctx.json( meetings ) );
        }
    ),
    rest.post(
        "https://mymeetingsapp.herokuapp.com/api/auth/login",
        ( req, res, ctx ) => {
            return res(
                ctx.status( 200 ),
                ctx.json( {
                    message: "Signed in sucessfully",
                    token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYWs0QHNhcGllbnQuY29tIiwidXNlcklkIjoiNjJmMGNiZThhZDcxNTAwMDE1YzhiZTQ1IiwiaWF0IjoxNjYzMTQ0NDkyLCJleHAiOjE2NjMyMzA4OTJ9.C-2ZbFey_WRdyCCjhsNkg7Zr49VtxRwM5fovlH_h7UE",
                    email: "prak4@sapient.com",
                    name: "Prarthana K"
                } )
            );
        }
    ),
    rest.post(
        "https://mymeetingsapp.herokuapp.com/api/auth/register",
        ( req, res, ctx ) => {
            return res( ctx.status( 200 )
            )
        }
    ),
    rest.post(
        "https://mymeetingsapp.herokuapp.com/api/meetings",
        ( req, res, ctx ) => {
            return res(
                ctx.status( 200 ),
                ctx.json( {
                    name: "Google marketing campaign",
                    description:
            "Increasing brand awareness and spreading information about new products",
                    date: "2022-09-16",
                    startTime: {
                        hours: 10,
                        minutes: 0
                    },
                    endTime: {
                        hours: 10,
                        minutes: 30
                    },
                    attendees: ["nysh@sapient.com", "rehan.pathan@publicisgroupe.com"]
                } )
            );
        }
    ),

    rest.post( "https://mymeetingsapp.herokuapp.com/api/teams", ( rq, res, ctx ) => {
        return res(
            ctx.status( 200 ),
            ctx.json( {
                name: "Customer campaign",
                shortName: "cust-training",
                description: "Team for training",
                members: [
                    {
                        userId: "62f0cbe8ad71500015c8be45",
                        email: "prak4@sapient.com"
                    },
                    {
                        userId: "62f4e0c8193e1900151d4f2b",
                        email: "nbhat@abcd.com"
                    },
                    {
                        userId: "62f0d277ad71500015c8be52",
                        email: "Praveenkumar4@example.com"
                    },
                    {
                        userId: "62f0caedad71500015c8be3a",
                        email: "nysh@sapient.com"
                    }
                ]
            } )
        );
    } ),

    rest.patch(
        `https://mymeetingsapp.herokuapp.com/api/teams/6320330fb95f1e00158ffa7c?action=remove_member`,
        ( req, res, ctx ) => {
            return res( ctx.json( teams ) );
        }
    )
];

export default handlers;
