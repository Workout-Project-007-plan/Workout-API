import request from "supertest";
import { app } from "../../../src/app";
import { DataSource } from "typeorm";
import { mockUserAdminSignUpData } from "../mocks/user.mocks";
import AppDataSource from "../../../src/data-source";
import { userToken } from "../mocks/token.mocks";
import { mockedPlan, mockedUpdatedPlan } from "../mocks/train.mocks";

describe("/trains", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error(`Error during Data Source initialization, ${err}`);
      });
    await request(app).post("/plans").send(mockUserAdminSignUpData);
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /plans - Should NOT be able to create a plan without authentication.", async () => {
    const response = await request(app).post("/plans").send(mockedPlan);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /plans - Should NOT be able to delete a plan without a plan.", async () => {
    const response = await request(app)
      .delete("/plans")
      .set("Authorization", await userToken());

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /plans - Should be able to create a plan.", async () => {
    const response = await request(app)
      .post("/plans")
      .send(mockedPlan)
      .set("Authorization", await userToken());

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("plan_type");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("end_date");
    expect(response.body).toHaveProperty("userId");
    expect(response.body).toHaveProperty("trains");
    expect(response.body.trains).toHaveProperty("length");
    expect(response.status).toBe(201);
  });

  test("POST /plans - Should NOT be able to have two active plans.", async () => {
    const response = await request(app)
      .post("/plans")
      .send(mockedPlan)
      .set("Authorization", await userToken());

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("PATCH /plans - Should NOT be able to edit a plan without authentication.", async () => {
    const response = await request(app).patch("/plans");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /plans - Should be able to edit a plan.", async () => {
    const response = await request(app)
      .patch("/plans")
      .send(mockedUpdatedPlan)
      .set("Authorization", await userToken());

    expect(response.body).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("exercises");
    expect(response.body[0]).toEqual(mockedUpdatedPlan[0]);
    expect(response.status).toBe(200);
  });

  test("DELETE /plans - Should NOT be able to delete a plan without authentication.", async () => {
    const response = await request(app).delete("/plans");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /plans - Should be able to delete a plan.", async () => {
    const response = await request(app)
      .delete("/plans")
      .set("Authorization", await userToken());

    expect(response.status).toBe(204);
  });
});
