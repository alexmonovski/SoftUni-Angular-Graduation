const router = require("express").Router();
const articlesController = require("../controllers/articlesController");
const authController = require("../controllers/authController");
const topicsController = require("../controllers/topicsController");
const usersController = require("../controllers/usersController");
const cors = require("cors");

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

router.use("/users", cors(), usersController);
router.use("/auth", cors(), authController);
router.use("/articles", cors(), articlesController);
router.use("/topics", cors(), topicsController);

module.exports = router;
