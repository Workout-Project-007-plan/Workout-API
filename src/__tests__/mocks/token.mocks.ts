import request from "supertest";
import { app } from "../../app";
import { mockAdminLoginData, mockUserLoginData } from "./user.mocks";

export const userToken = async () => {
  const userLoginResponse = await request(app)
    .post("/session")
    .send(mockUserLoginData);
  return `Bearer ${userLoginResponse.body.token}`;
};

export const adminToken = async () => {
  const adminLoginResponse = await request(app)
    .post("/session")
    .send(mockAdminLoginData);
  return `Bearer ${adminLoginResponse.body.token}`;
};
