import request from "supertest";
import { app } from "../../../src/app";
import { DataSource } from "typeorm";
import {
  mockAdminLoginData,
  mockUserAdminSignUpData,
  mockUserLoginData,
  mockUserSignUpData,
  mockUserSignUpToUpdateData,
  mockUserUpdateData,
  mockWrongUserMailData,
} from "../mocks/user.mocks";
import AppDataSource from "../../../src/data-source";
import { adminToken } from "../mocks/token.mocks";

describe("/login", () => {
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
    await request(app).post("/users").send(mockUserSignUpData);
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /session - Should be able to login.", async () => {
    const response = await request(app)
      .post("/session")
      .send(mockUserLoginData);
    expect(response.body).toHaveProperty("token");
    expect(response.statusCode).toBe(200);
  });

  test("POST /session - Should NOT be able to login with email or password invalid.", async () => {
    const response = await request(app)
      .post("/session")
      .send(mockWrongUserMailData);
    expect(response.body).not.toHaveProperty("token");
    expect(response.statusCode).toBe(401);
  });

  test("POST /session - Should NOT be able to login if one or more field is empty or wrong.", async () => {
    const response = await request(app)
      .post("/session")
      .send({ email: "", password: "" });

    expect(response.body).not.toHaveProperty("token");
    expect(response.statusCode).toBe(401);
  });

  test("POST /session - Should NOT be able to login with isActive = false.", async () => {
    const userToDeleteResponse = await request(app)
      .get("/users")
      .set("Authorization", await adminToken());
    await request(app)
      .delete(`/users/${userToDeleteResponse.body[1].id}`)
      .set("Authorization", await adminToken());
    const response = await request(app)
      .post("/session")
      .send(mockUserLoginData);

    expect(response.body).not.toHaveProperty("token");
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /session - Should be able to login with a reactivated account.", async () => {
    await request(app)
      .patch(`/session/reactive`)
      .send({ email: mockUserLoginData.email });
    const response = await request(app)
      .post("/session")
      .send(mockUserLoginData);

    expect(response.body).toHaveProperty("token");
    expect(response.statusCode).toBe(200);
  });

  test("POST /session - Should be able to login with updated password and e-mail account.", async () => {
    const userToUpdate = await request(app)
      .post("/users")
      .send(mockUserSignUpToUpdateData);

    await request(app)
      .patch(`/users/${userToUpdate.body.id}`)
      .set("Authorization", await adminToken())
      .send(mockUserUpdateData);

    const response = await request(app)
    .post("/session")
    .send({
      email: mockUserUpdateData.email,
      password: mockUserUpdateData.password,
    });

    expect(response.body).toHaveProperty("token");
    expect(response.statusCode).toBe(200);
  });
});
