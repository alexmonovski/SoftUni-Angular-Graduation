const router = require("express").Router();
const articlesController = require("../controllers/articlesController");
const authController = require("../controllers/authController");
const authorsController = require("../controllers/authorsController");

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
router.use("/auth", authController);
router.use("/authors", authorsController);

module.exports = router;
