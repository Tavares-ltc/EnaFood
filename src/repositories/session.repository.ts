import Session from "../models/session.model.js";

async function createSession({
  userId,
  name,
  token,
}: {
  userId: string;
  name: string;
  token: string;
}) {
  return await Session.create({ user_id: userId, name, token });
}

const sessionRepository = {
  createSession,
};

export default sessionRepository;
