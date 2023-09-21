const express = require("express");
const {
  createMission,
  updateMission,
  deleteMission,
  createDrone,
  getAllMission,
  addWayPoints
} = require("../controllers/missionController");
const router = express.Router();

// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log("Time: ", Date.now());
//   next();
// });

// define the home page route
router
  .post("/mission", createMission)
  .put("/mission/:missionId", updateMission)
  .put("/mission/waypoins/:missionId", addWayPoints)
  .delete("/mission/:missionId", deleteMission)
  .get("/mission/:siteId", getAllMission)
  .post("/mission/drone", createDrone);

module.exports = router;
