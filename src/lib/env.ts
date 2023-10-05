import { cleanEnv, str } from "envalid";

export default cleanEnv(process.env, {
  STAGE: str({ default: "uat" }),
  AWS_ACCOUNT_ID: str(),
});
