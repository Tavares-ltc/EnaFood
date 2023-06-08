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

async function findLastSessionByUserId(userId: string) {
  const lastSession = await Session.findOne({ user_id: userId })
    .sort({ _id: -1 })
    .exec();
  return lastSession;
}

const sessionRepository = {
  createSession,
  findLastSessionByUserId
};

export default sessionRepository;
