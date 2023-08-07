const assetsController = require("express").Router();
const { getAllAssets } = require("../services/assetsServices");
assetsController.get("/", async (req, res) => {
  try {
    const assets = await getAllAssets();
    console.log(assets);
  } catch (error) {
    console.log(error);
  }
});

module.exports = assetsController;
