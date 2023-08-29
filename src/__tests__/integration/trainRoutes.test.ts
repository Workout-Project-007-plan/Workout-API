import request from "supertest";
import { app } from "../../../src/app";
import { DataSource } from "typeorm";
import { mockUserAdminSignUpData } from "../mocks/user.mocks";
import AppDataSource from "../../../src/data-source";
import { mockTrainACreateData, mockTrainAUpdated } from "../mocks/train.mocks";
import { userToken } from "../mocks/token.mocks";

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
    await request(app).post("/users").send(mockUserAdminSignUpData);
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /trains - Should NOT be able to create a train without authentication.", async () => {
    const response = await request(app)
      .post("/trains")
      .send(mockTrainACreateData);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /trains - Should be able to create a train.", async () => {
    const response = await request(app)
      .post("/trains")
      .send(mockTrainACreateData)
      .set("Authorization", await userToken());

    expect(response.body).toHaveProperty("length");
    expect(response.body.exercises[0]).toEqual(
      mockTrainACreateData.exercises[0]
    );
    expect(response.status).toBe(201);
  });

  test("PATCH /trains - Should be able to edit a train.", async () => {
    const response = await request(app)
      .patch("/trains")
      .send(mockTrainAUpdated)
      .set("Authorization", await userToken());

    expect(response.body).toHaveProperty("length");
    expect(response.body.exercises[0]).toEqual(
      mockTrainACreateData.exercises[0]
    );
    expect(response.status).toBe(201);
  });

  test("PATCH /trains - Should NOT be able to edit a train without authentication.", async () => {
    const response = await request(app)
      .patch("/trains")
      .send(mockTrainAUpdated);

    expect(response.body).toHaveProperty("message");

    expect(response.status).toBe(401);
  });

  test("DELETE /trains - Should NOT be able to delete a train without authentication.", async () => {
    const response = await request(app)
      .delete("/trains")
      .send(mockTrainAUpdated);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /trains - Should be able to delete a train.", async () => {
    const response = await request(app)
      .delete("/trains")
      .send(mockTrainAUpdated)
      .set("Authorization", await userToken());

    expect(response.status).toBe(204);
  });
});
