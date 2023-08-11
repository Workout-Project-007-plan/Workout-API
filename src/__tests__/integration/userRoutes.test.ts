import request from "supertest";
import { app } from "../../../src/app";
import { DataSource } from "typeorm";
import {
  mockUserAdminSignUpData,
  mockUserSignUpData,
  mockWrongUserMailData,
  mockWrongUserSignUpData,
} from "../mocks/user.mocks";
import AppDataSource from "../../data-source"

