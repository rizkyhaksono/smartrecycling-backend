import supertest from "supertest";
import testServer from "../../lib/testServer";
import { token } from "../db";

const app = testServer();

describe("Report Controller", () => {
  describe("Get Report", () => {
    it("should get a list of reports", async () => {
      const response = await supertest(app).get("/api/report").set("Authorization", token).expect(200);

      expect(response.body.status).toBe(200);
    });

    it("should return 401 if no Bearer token is provided", async () => {
      const response = await supertest(app).get("/api/report").expect(401);

      expect(response.body.status).toBe(401);
    });
  });

  describe("Create Report", () => {
    it("should create a new report", async () => {
      const newReport = {
        email: "test@example.com",
        subject: "Test Report",
        location: "Test Location",
        user_id: "f2da6afa-2d64-4138-ba28-3884339a6ff8",
      };

      const response = await supertest(app).post("/api/report").set("Authorization", token).send(newReport).expect(201);

      expect(response.body.status).toBe(201);
    });

    it("should return 500 if user_id is false", async () => {
      const newReport = {
        email: "test@example.com",
        subject: "Test Report",
        location: "Test Location",
        user_id: 100,
      };

      await supertest(app).post("/api/report").send(newReport).expect(500);
    });
  });
});
