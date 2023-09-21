const express = require("express");
const { createSite, updateSite,deleteSite,createDrone,removeDronefromSite } = require("../controllers/siteController");
const router = express.Router();

// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log("Time: ", Date.now());
//   next();
// });

// define the home page route
router.post("/site", createSite)
      .put("/site/:siteId", updateSite)
      .delete("/site/:siteId", deleteSite)
      .post("/site/drone", createDrone)
      .delete("/drone/:siteId", removeDronefromSite);

module.exports = router;
