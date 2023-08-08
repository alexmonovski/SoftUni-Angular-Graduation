const router = require("express").Router();
const articlesController = require("../controllers/articlesController");
const usersController = require("../controllers/usersController");

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

router.use("/", articlesController);
router.use("/users", usersController);

module.exports = router;
