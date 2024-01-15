import supertest from "supertest";
import testServer from "../../lib/testServer";
import { token } from "../db";

const app = testServer();

describe("Payment Controller", () => {
  describe("Get Payment History", () => {
    it("should get payment history for a user", async () => {
      const userId = "f2da6afa-2d64-4138-ba28-3884339a6ff8";

      const response = await supertest(app).get(`/api/payment-history/${userId}`).set("Authorization", token).expect(200);

      expect(response.body.status).toBe(200);
    });

    it("should return 404 if the user is not found", async () => {
      const userId = 999;

      const response = await supertest(app).get(`/api/payment-history/${userId}`).set("Authorization", token).expect(404);

      expect(response.body.status).toBe(404);
    });
  });

  describe("Create Payment Method", () => {
    it("should create a new payment method", async () => {
      const newPaymentMethod = {
        user_id: "f2da6afa-2d64-4138-ba28-3884339a6ff8",
        method_type: "QRIS",
        card_number: "1234567890123456",
        expiration_date: "2023-12-31",
        cvv: "123",
      };

      const response = await supertest(app).post("/api/payment-method").set("Authorization", token).send(newPaymentMethod).expect(201);

      expect(response.body.status).toBe(201);
    });

    it("should return 404 if the user is not found", async () => {
      const newPaymentMethod = {
        user_id: 999,
        method_type: "QRIS",
        card_number: "1234567890123456",
        expiration_date: "2023-12-31",
        cvv: "123",
      };

      const response = await supertest(app).post("/api/payment-method").set("Authorization", token).send(newPaymentMethod).expect(404);

      expect(response.body.status).toBe(404);
    });
  });
});
