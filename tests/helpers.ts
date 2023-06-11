import { randCity, randCountry, randStreetName, randZipCode } from "@ngneat/falso";
import { Address } from "../src/interfaces/IAddress.js";
import User from "../src/models/user.model.js";

export async function cleanDb() {
  await User.deleteMany();
}


export function createRandAddress() {
  const address: Address = {
    state: randCountry(),
    city: randCity(),
    street: randStreetName(),
    zip: randZipCode()
  }
  return address
}