import { configDotenv } from "dotenv";
configDotenv({ quiet: true });
const corsOption = {
  origin: [...JSON.parse(process.env.CORS_ORIGIN)],
  credentials: true,
};
console.log(corsOption);
export default corsOption;
