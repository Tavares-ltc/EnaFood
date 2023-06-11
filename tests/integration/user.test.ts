import { app, init } from "../../src/app.js";
import { describe, expect, beforeAll, beforeEach } from "@jest/globals";
import supertest from "supertest";
import { cleanDb, createRandAddress } from "../helpers.js";
import {
  randEmail,
  randPassword,
  randUserName,
} from "@ngneat/falso";
import { createUser } from "../factories/user.factory.js";
import { IAddress } from "../../src/interfaces/IAddress.js";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("POST /SIGNUP", () => {
  it("should respond with status 401 if no name is given", async () => {
    const address: IAddress = createRandAddress();
    const invalidBody = {
      email: randEmail(),
      password: randPassword(),
      address: [address],
    };
    const response = await server.post("/signup").send(invalidBody);
    expect(response.status).toBe(401);
  });

  it("should respond with status 401 if no email is given", async () => {
    const address: IAddress = createRandAddress();
    const invalidBody = {
      name: randUserName(),
      password: randPassword(),
      address: [address],
    };
    const response = await server.post("/signup").send(invalidBody);
    expect(response.status).toBe(401);
  });

  it("should respond with status 401 if no passowrd is given", async () => {
    const address: IAddress = createRandAddress();
    const invalidBody = {
      name: randUserName(),
      email: randEmail(),
      address: [address],
    };
    const response = await server.post("/signup").send(invalidBody);
    expect(response.status).toBe(401);
  });

  it("should respond with status 401 if no address is given", async () => {
    const invalidBody = {
      name: randUserName(),
      email: randEmail(),
      password: randPassword(),
    };
    const response = await server.post("/signup").send(invalidBody);
    expect(response.status).toBe(401);
  });

  it("should respond with status 409 if email already is in use", async () => {
    const address: IAddress = createRandAddress();
    const createdUser = await createUser();

    const invalidBody = {
      name: randUserName(),
      email: createdUser.email,
      password: randPassword(),
      address: [address],
    };

    const response = await server.post("/signup").send(invalidBody);
    expect(response.status).toBe(409);
  });

  it("should respond with status 200 if an valid body is given", async () => {
    const address: IAddress = createRandAddress();
    const validBody = {
      name: randUserName(),
      email: randEmail(),
      password: randPassword(),
      address: [address],
    };

    const response = await server.post("/signup").send(validBody);
    expect(response.status).toBe(200);
  });
});

describe("POST /SIGNIN", () => {
  it("should respond with status 401 if no email is given", async () => {
    const invalidBody = {
      password: randPassword(),
    };
    const response = await server.post("/signin").send(invalidBody);
    expect(response.status).toBe(401);
  });

  it("should respond with status 401 if no password is given", async () => {
    const user = await createUser();
    const invalidBody = {
      email: user.email,
    };
    const response = await server.post("/signin").send(invalidBody);
    expect(response.status).toBe(401);
  });

  it("should respond with status 401 if the user not exists", async () => {
    await createUser();
    const invalidBody = {
      email: randEmail(),
      password: randPassword(),
    };
    const response = await server.post("/signin").send(invalidBody);
    expect(response.status).toBe(401);
  });

  it("should respond with status 200 if an valid body is given", async () => {
    const password = randPassword();
    const user = await createUser(password);
    const validBody = {
      email: user.email,
      password: password,
    };
    const response = await server.post("/signin").send(validBody);
    expect(response.status).toBe(401);
  });
});
