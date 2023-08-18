import request from "supertest";
import { app } from "../../../src/app";
import { DataSource } from "typeorm";
import {
  mockUserAdminSignUpData,
  mockUserLoginData,
  mockUserSignUpData,
  mockUserUpdateData,
  mockWrongUserMailData,
  mockWrongUserSignUpData,
} from "../mocks/user.mocks";
import AppDataSource from "../../../src/data-source";
import { adminToken, userToken } from "../mocks/token.mocks";

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
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /login - Should be able to login.", async () => {
    const response = await request(app).post("/login").send(mockUserLoginData);
    expect(response.body).toHaveProperty("token");
    expect(response.statusCode).toBe(200);
  });

  test("POST /login - Should NOT be able to login with email or password invalid.", async () => {
    const response = await request(app)
      .post("/login")
      .send(mockWrongUserMailData);
    expect(response.body).not.toHaveProperty("token");
    expect(response.statusCode).toBe(401);
  });

  test("POST /login - Should NOT be able to login if field is empty or wrong.", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "", password: "" });

    expect(response.body).not.toHaveProperty("token");
    expect(response.statusCode).toBe(400);
  });

  test("POST /login - Should NOT be able to login with isActive = false.", async () => {
    const userToDeleteResponse = await request(app)
      .post("/users")
      .send(mockUserAdminSignUpData);

    await request(app)
      .delete(`/users/${userToDeleteResponse.body[0].id}`)
      .set("Authorization", await adminToken());
    const response = await request(app)
      .post("/login")
      .send(mockUserAdminSignUpData);

    expect(response.body).not.toHaveProperty("token");
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});
