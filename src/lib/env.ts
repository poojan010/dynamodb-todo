import { cleanEnv, str } from "envalid";

export default cleanEnv(process.env, {
  STAGE: str(),
});
