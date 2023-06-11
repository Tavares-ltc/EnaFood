import { randEmail, randFirstName, randPassword } from "@ngneat/falso";
import User from "../../src/models/user.model.js";
import { createRandAddress } from "../helpers.js";

export async function createUser(userPassword? : string) {
  const name = randFirstName()
  const email = randEmail()
  const address = [createRandAddress()]
  const password = userPassword || randPassword()
  return User.create({
    name,
    email,
    address,
    password,
  });
}
