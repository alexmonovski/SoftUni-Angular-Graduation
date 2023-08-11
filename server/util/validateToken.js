const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/env");

async function getUserIdFromToken(token) {
  try {
    const decodedToken = await jwt.verify(token, SECRET);
    return decodedToken.userId;
  } catch (error) {
    console.error(error);
    throw new Error("Invalid token");
  }
}

module.exports = { getUserIdFromToken };
