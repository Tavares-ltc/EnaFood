import {
  randCity,
  randCountry,
  randStreetName,
  randZipCode,
} from "@ngneat/falso";
import User from "../src/models/user.model.js";
import { IAddress } from "../src/interfaces/IAddress.js";

export async function cleanDb() {
  await User.deleteMany();
}

export function createRandAddress() {
  const address: IAddress = {
    state: randCountry(),
    city: randCity(),
    street: randStreetName(),
    zip: randZipCode(),
  };
  return address;
}
