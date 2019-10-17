const jwt = require("jsonwebtoken");
const secret = require("./secret");

function generateToken(user) {
  const payload = {
    username: user.username,
    subject: user.id,
  };
  const options = {
    expiresIn: "10m",
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = generateToken;
