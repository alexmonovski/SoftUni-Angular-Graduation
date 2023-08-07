const mongoose = require("mongoose");
const { DB_STRING } = require("./env");

exports.initDb = () => {
  //strict mode for query params; i.e. can't access the db with fields not defined in schema
  mongoose.set("strictQuery", true);
  mongoose.connection.on("open", () => console.log("Db is connected!"));
  return mongoose.connect(`mongodb://127.0.0.1:27017/${DB_STRING}`);
};
