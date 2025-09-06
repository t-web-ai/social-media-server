import bcrypt from "bcrypt";
import { config } from "dotenv";

config({ quiet: true });
const saltRound = parseInt(process.env.BCRYPT_SALT_ROUND);
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRound);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashed) => {
  return await bcrypt.compare(password, hashed);
};
