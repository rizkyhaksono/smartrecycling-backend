import supertest from "supertest";
import testServer from "../../lib/testServer";
import { token } from "../db";

const app = testServer();

describe("Transaction Controller", () => {
  describe("Get Transaction History", () => {
    it("should get the transaction history for a user", async () => {
      const userId = "f2da6afa-2d64-4138-ba28-3884339a6ff8";

      const response = await supertest(app).get(`/api/transaction-history/${userId}`).set("Authorization", token).expect(200);

      expect(response.body.status).toBe(200);
    });

    it("should return 404 if the user does not exist", async () => {
      const nonExistingUserId = 999;
      const response = await supertest(app).get(`/api/transaction-history/${nonExistingUserId}`).set("Authorization", token).expect(404);

      expect(response.body.status).toBe(404);
    });

    it("should return 404 if no Bearer token is provided", async () => {
      const userId = 1;
      const response = await supertest(app).get(`/api/transaction-history/${userId}`).expect(404);

      expect(response.body.status).toBe(404);
    });
  });

  describe("Create Transaction Payment", () => {
    it("should create a new transaction payment", async () => {
      const newTransactionPayment = {
        transaction_id: 1,
        payment_method_id: 1,
        amount: 100,
        status: "PENDING",
      };

      const response = await supertest(app).post("/api/transaction-payment").set("Authorization", token).send(newTransactionPayment).expect(201);

      expect(response.body.status).toBe(201);
    });

    it("should return 404 if the associated transaction or payment method does not exist", async () => {
      const invalidTransactionPayment = {
        transaction_id: 999,
        payment_method_id: 999,
        amount: 100,
        status: "success",
      };

      const response = await supertest(app).post("/api/transaction-payment").set("Authorization", token).send(invalidTransactionPayment).expect(404);

      expect(response.body.status).toBe(404);
    });

    it("should return 500 if no Bearer token is provided", async () => {
      const newTransactionPayment = {
        transaction_id: 1,
        payment_method_id: 1,
        amount: 100,
        status: "success",
      };

      await supertest(app).post("/api/transaction-payment").send(newTransactionPayment).expect(500);
    });
  });
});
