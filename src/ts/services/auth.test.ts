import { login } from "./auth";
test("", (done) => {
  login({
    email: "prak4@sapient.com",
    password: "Prak4@16",
  }).then((response) => {
    expect(response).toEqual({
      message: "Signed in sucessfully",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYWs0QHNhcGllbnQuY29tIiwidXNlcklkIjoiNjJmMGNiZThhZDcxNTAwMDE1YzhiZTQ1IiwiaWF0IjoxNjYzMTQ0NDkyLCJleHAiOjE2NjMyMzA4OTJ9.C-2ZbFey_WRdyCCjhsNkg7Zr49VtxRwM5fovlH_h7UE",
      email: "prak4@sapient.com",
      name: "Prarthana K",
    });
    done();
  });
  
});
