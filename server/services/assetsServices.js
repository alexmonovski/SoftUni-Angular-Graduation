const Article = require("../models/Article");
async function getAllAssets() {
  return Article.find().lean();
}
module.exports = { getAllAssets };
