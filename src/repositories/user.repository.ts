import { IUser, IUserData } from "../interfaces/IUser.js";
import User from "../models/user.model.js";

async function getUserByEmail(email: string) {
  return User.findOne({ email });
}

async function createUser(userData: IUserData){
 return User.create(userData)
}

const userRepository = {
  getUserByEmail,
  createUser
};

export default userRepository;
