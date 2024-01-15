import supertest from "supertest";
import testServer from "../../lib/testServer";
import { token } from "../db";

const app = testServer();

describe("GET User Profile Data (/api/user/)", () => {
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
