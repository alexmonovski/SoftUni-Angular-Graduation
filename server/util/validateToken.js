const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/env");

async function getUserIdFromToken(header) {
  try {
    const token = header.split(" ")[1];
    const decodedToken = jwt.verify(token, SECRET);
    console.log("decodedToken: ", decodedToken);
    return decodedToken.userId;
  } catch (error) {
    console.error(error);
    throw new Error("Invalid token");
  }
}

module.exports = { getUserIdFromToken };
