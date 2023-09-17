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

describe("/users", () => {
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

  test("POST /users - Should be able to create an account.", async () => {
    const response = await request(app).post("/users").send(mockUserSignUpData);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("is_adm");

    expect(response.body.email).toEqual(mockUserSignUpData.email);
    expect(response.body.is_adm).toEqual(false);
    expect(response.status).toBe(201);
  });

  test("POST /users - Should NOT be able to create an account that already exists.", async () => {
    const response = await request(app).post("/users").send(mockUserSignUpData);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("POST /users - Should NOT be able to create an account with missing fields.", async () => {
    const response = await request(app)
      .post("/users")
      .send(mockWrongUserSignUpData);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /users - Should NOT be able to create an account with an invalid e-mail.", async () => {
    const response = await request(app)
      .post("/users")
      .send(mockWrongUserMailData);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  // test("POST /users/forgotpassword - Should be able to send an e-mail to recover the password.", async () => {
  //   const response = await request(app)
  //     .post("/users/forgotpassword")
  //     .send(mockUserSignUpData.email);

  //   expect(response.body).toHaveProperty("message");
  //   expect(response.status).toBe(200);
  // });

  // test("POST /users/forgotpassword - Should NOT be able to send the recovery password e-mail with an invalid e-mail.", async () => {
  //   const response = await request(app).post("/users/forgotpassword");

  //   expect(response.body).toHaveProperty("message");
  //   expect(response.status).toBe(400);
  // });

  // test("POST /users/forgotpassword - Should NOT be able to send a password recovery email to unregistered users.", async () => {
  //   const response = await request(app)
  //     .post("/users/forgotpassword")
  //     .send("schuhmacher.mail.com");

  //   expect(response.body).toHaveProperty("message");
  //   expect(response.status).toBe(404);
  // });

  test("GET /users - Should be able to list users.", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", await adminToken());
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).not.toHaveProperty("password");
    expect(response.status).toBe(200);
  });

  test("GET /users - Should NOT be able to list users without authentication.", async () => {
    const response = await request(app).get("/users");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /users/:id - Should be able to list an user by ID.", async () => {
    const users = await request(app)
      .get("/users")
      .set("Authorization", await adminToken());
    const response = await request(app)
      .get(`/users/${users.body[0].id}`)
      .set("Authorization", await adminToken());

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("is_active");
    expect(response.body).toHaveProperty("is_adm");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
    expect(response.status).toBe(200);
  });

  test("GET /users/:id - Should NOT be able to list an user by ID WITHOUT authorization.", async () => {
    const users = await request(app)
      .get("/users")
      .set("Authorization", await adminToken());
    const response = await request(app).get(`/users/${users.body[0].id}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET users/:id - Should NOT be able to list an user without a valid id.", async () => {
    const response = await request(app)
      .get(`/users/b855d86b-d4c9-41cd-ab98-d7fa734c6ce4`)
      .set("Authorization", await adminToken());

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("GET /users/profile - Should be able to list your own profile.", async () => {
    const response = await request(app)
      .get(`/users/profile`)
      .set("Authorization", await adminToken());

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("is_active");
    expect(response.body).toHaveProperty("is_adm");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
    expect(response.status).toBe(200);
  });

  // test("PATCH /users - Should NOT be able to update without authentication.", async () => {
  //   const userToUpdate = await request(app)
  //     .get("/users")
  //     .set("Authorization", await adminToken());

  //   const response = await request(app).patch(
  //     `/users/${userToUpdate.body[0].id}`
  //   );

  //   expect(response.body).toHaveProperty("message");
  //   expect(response.status).toBe(401);
  // });

  // test("PATCH /users - Should NOT be able to update with invalid id.", async () => {
  //   const newData = { name: "Test", email: "test@mail.com" };

  //   const response = await request(app)
  //     .patch(`/users/98198198-dsfsdfdhfgh-1961651`)
  //     .set("Authorization", await userToken())
  //     .send(newData);

  //   expect(response.body).toHaveProperty("message");
  //   expect(response.status).toBe(400);
  // });

  // test("PATCH /users - Should NOT be able to update another user without admin permission.", async () => {
  //   const newData = { name: "Test", email: "test@mail.com" };

  //   const userToUpdateRequest = await request(app)
  //     .get("/users")
  //     .set("Authorization", await adminToken());
  //   const response = await request(app)
  //     .patch(`/users/${userToUpdateRequest.body.users[0].id}`)
  //     .set("Authorization", await userToken())
  //     .send(newData);

  //   expect(response.body).toHaveProperty("message");
  //   expect(response.status).toBe(401);
  // });

  // test("PATCH /users - Should NOT be able to update Adm credential.", async () => {
  //   const newAdmValue = { isAdm: true };

  //   const userToUpdate = await request(app)
  //     .get("/users")
  //     .set("Authorization", await adminToken());

  //   const response = await request(app)
  //     .patch(`/users/${userToUpdate.body.users[0].id}`)
  //     .set("Authorization", await adminToken())
  //     .send(newAdmValue);

  //   expect(response.body).toHaveProperty("message");
  //   expect(response.status).toBe(401);
  // });

  // test("PATCH /users - Should be able to update user.", async () => {
  //   const userToUpdate = await request(app)
  //     .post("/users")
  //     .send(mockUserLoginData);

  //   const updateResponse = await request(app)
  //     .patch(`/users/${userToUpdate.body.id}`)
  //     .set("Authorization", await userToken())
  //     .send(mockUserUpdateData);

  //   expect(updateResponse.body.email).toEqual(mockUserUpdateData.email);
  //   expect(updateResponse.body.name).toEqual(mockUserUpdateData.name);
  //   expect(updateResponse.body.height).toEqual(mockUserUpdateData.height);
  //   expect(updateResponse.body.age).toEqual(mockUserUpdateData.age);
  //   expect(updateResponse.body.weight).toEqual(mockUserUpdateData.weight);
  //   expect(updateResponse.body.weight_goal).toEqual(
  //     mockUserUpdateData.weight_goal
  //   );
  //   expect(updateResponse.status).toBe(200);
  //   expect(updateResponse.body).toHaveProperty("message");
  // });

  // test("DELETE /users/:id - Should NOT be able to inactive someone else account without admin permissions.", async () => {
  //   const userToBeDeleted = await request(app)
  //     .get("/users")
  //     .set("Authorization", await adminToken());
  //   const response = await request(app)
  //     .delete(`/users/${userToBeDeleted.body.users[0].id}`)
  //     .set("Authorization", await userToken());

  //   expect(response.body).toHaveProperty("message");
  //   expect(response.status).toBe(401);
  // });

  // test("DELETE /users/:id - Should NOT be able to inactive an account without a valid ID.", async () => {
  //   const response = await request(app)
  //     .delete("/users/165981909")
  //     .set("Authorization", await adminToken());

  //   expect(response.body).toHaveProperty("message");
  //   expect(response.status).toBe(401);
  // });

  // test("DELETE /users/profile - Should be able to inactive your own account.", async () => {
  //   const userToBeDeleted = await request(app)
  //     .get(`/users/profile`)
  //     .set("Authorization", await userToken());

  //   const response = await request(app)
  //     .delete(`/users/${userToBeDeleted.body.id}`)
  //     .set("Authorization", await userToken());

  //   expect(response.status).toBe(204);
  // });

  // test("DELETE /users/profile - Should NOT be able to inactive an account that already have been inactivated.", async () => {
  //   const userToBeDeleted = await request(app)
  //     .get(`/users/profile`)
  //     .set("Authorization", await userToken());

  //   const response = await request(app)
  //     .delete(`/users/${userToBeDeleted.body.id}`)
  //     .set("Authorization", await userToken());

  //   expect(response.body).toHaveProperty("message");
  //   expect(response.status).toBe(401);
  // });

  // test("PATCH /users/:id - Should be able to reactive your own account.", async () => {
  //   const userToReactive = await request(app)
  //     .patch(`/users/:id`)
  //     .set("Authorization", await userToken());

  //   const response = await request(app)
  //     .delete(`/users/${userToReactive.body.id}/reactivation`)
  //     .set("Authorization", await userToken());

  //   expect(response.body).toHaveProperty("message");
  //   expect(response.status).toBe(201);
  // });

  // test("PATCH /users/:id - Should NOT be able to reactive an account already activated.", async () => {
  //   const userToReactive = await request(app)
  //     .patch(`/users/:id`)
  //     .set("Authorization", await userToken());

  //   const response = await request(app)
  //     .delete(`/users/${userToReactive.body.id}/reactivation`)
  //     .set("Authorization", await userToken());

  //   expect(response.body).toHaveProperty("message");
  //   expect(response.status).toBe(401);
  // });
});
