const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log("Time: ", Date.now());
//   next();
// });

// define the home page route
router
  .post("/register", register)
  .post("/login", login)
  .get("/", (req, res) => {
    res.send({ success: true, message: "ROOT" });
  });
// router.post("/marklogin",markLogin);

module.exports = router;
