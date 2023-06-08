import bcrypt from "bcrypt";
import { IUserData } from "../interfaces/IUser.js";
import { conflictError } from "../errors/conflict.error.js";
import userRepository from "../repositories/user.repository.js";

async function createUser(userData: IUserData) {
  const encryptedPassword = bcrypt.hashSync(userData.password, 10);
  userData.password = encryptedPassword;
  const emailExists = await userRepository.getUserByEmail(userData.email);
  if (emailExists) {
    throw conflictError("Email already in use");
  }
  await userRepository.createUser(userData);
}

const userService = {
  createUser,
};

export default userService;
