import supertest from "supertest";
import server from "../../lib/testServer";

const app = server();

// describe("POST User Authentication (/auth)", () => {
//   describe("Creating  User Account (/signup)", () => {
//     // change email if want to run again
//     it("should return 201", async () => {
//       const account = {
//         name: "Jest Test Account",
//         email: "jesttest6@gmail.com",
//         password: "jest123",
//       };

//       await supertest(app).post("/auth/signup").send(account).expect(201);
//     });
//   });
// });

describe("Creating User Account with Exist Email (/signup)", () => {
  it("should return 400", async () => {
    const accountDetail = {
      name: "Jest Test Account",
      email: "jesttest4@gmail.com",
      password: "jest123",
    };

    await supertest(app).post("/auth/signup").send(accountDetail).expect(400);
  });
});

describe("Login User Account (/signin)", () => {
  it("should return 200", async () => {
    const accountDetail = {
      email: "jesttest4@gmail.com",
      password: "jest123",
    };

    await supertest(app).post("/auth/signin").send(accountDetail).expect(200);
  });
});

describe("Login User Account where password incorrect (/signin)", () => {
  it("should return 422", async () => {
    const accountDetail = {
      email: "jesttest4@gmail.com",
      password: "1234424132",
    };

    await supertest(app).post("/auth/signin").send(accountDetail).expect(422);
  });
});
