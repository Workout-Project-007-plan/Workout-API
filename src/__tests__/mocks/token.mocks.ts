import request from "supertest";
import { app } from "../../app";
import { mockAdminLoginData, mockUserLoginData } from "./user.mocks";

export const userToken = async () => {
  const userLoginResponse = await request(app)
    .post("/login")
    .send(mockUserLoginData);
  return `Bearer ${userLoginResponse}`;
};

export const adminToken = async () => {
  const adminLoginResponse = await request(app)
    .post("/login")
    .send(mockAdminLoginData);
  return `Bearer ${adminLoginResponse}`;
};
