import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUserData } from "../interfaces/IUser.js";
import { conflictError } from "../errors/conflict.error.js";
import userRepository from "../repositories/user.repository.js";
import { requestError } from "../errors/request.error.js";
import sessionRepository from "../repositories/session.repository.js";
import { notFoundError } from "../errors/notFound.error.js";

async function createUser(userData: IUserData) {
  const encryptedPassword = bcrypt.hashSync(userData.password, 10);
  userData.password = encryptedPassword;
  const emailExists = await userRepository.getUserByEmail(userData.email);
  if (emailExists) {
    throw conflictError("Email already in use");
  }
  const user = await userRepository.createUser(userData);
  return user;
}

async function getUser(password: string, email: string) {
  const user = await userRepository.getUserByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw requestError;
  }
  const token = jwt.sign(
    {
      userId: user.id,
      date: Date.now(),
    },
    process.env.TOKEN_SECRET
  );

  const session = await sessionRepository.createSession({
    userId: user._id,
    name: user.name,
    token,
  });
  if (!session) {
    throw notFoundError;
  }
  return { name: user.name, token };
}

const userService = {
  createUser,
  getUser,
};

export default userService;
