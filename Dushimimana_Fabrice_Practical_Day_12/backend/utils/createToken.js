import crypto from "crypto";

const createToken = function (inputToken = null) {
  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(inputToken ?? token)
    .digest("hex");

  return { token, hashedToken };
};

export default createToken;
