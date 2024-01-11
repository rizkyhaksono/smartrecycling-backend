import supertest from "supertest";
import testServer from "../../lib/testServer";

const app = testServer();
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc4NGNiOTcyLTczNGQtNDQ2MS05ZDE1LTM0ZGRhYzhjNGE2ZCIsImlhdCI6MTcwNDk3Nzk4MiwiZXhwIjoxNzA0OTg4NzgyfQ.IEVHWn8_izVzN6vYiw_uVhQ6B94Q3R7qGFpqe-r0Nuc";

describe("GET User Profile Data (/api/user/)", () => {
  // describe("Fetching User Data", () => {
  //   it("should return 200", async () => {
  //     const response = await supertest(app).get("/api/user").set("Authorization", token).expect(200);

  //     expect(response.body.status).toBe(200);
  //   });
  // });

  describe("Fetching User Data ( Failed Token )", () => {
    it("should return 404", async () => {
      await supertest(app).get("/user").expect(404);
    });
  });

  describe("Fetching User Data ( No Token )", () => {
    it("should return 404", async () => {
      await supertest(app).get("/user").expect(404);
    });
  });
});
