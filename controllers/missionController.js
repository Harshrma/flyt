const mission = require("../models/mission");
const helper = require("../models/helper");
const drone = require("../models/drone");

const createMission = async (req, res) => {
 
  let updatedKeys = ["mission_name", "speed", "alt", "site_id"];
  let data = req.body ?? {};

  let error = false;
  let errorMsg = "";
  let filteredData = {};
  if (Object.keys(data).length === 0) {
    return res.send({
      success: false,
      message: "please provide valid data.",
    });
  } else {
    Object.entries(data).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        error = true;
        errorMsg += `${key} has an invalid value: ${value} , `;
      } else if (updatedKeys.includes(key)) {
        filteredData[key] = value;
      }
    });
  }

  if (error) {
    return res.send({
      success: false,
      message: errorMsg,
    });
  }

  let isSitePresent = await helper.checkSitePresentOrNot(filteredData.site_id);
  // console.log(isSitePresent);
  // process.exit(0);

  if (!isSitePresent.success) {
    return res.send({
      success: false,
      message: "invalid site_id no site is present for this site_id",
    });
  }

  let missionResponse = await mission.create(filteredData);
  // return res.send(userResponse);
  if (missionResponse.success) {
    return res.send({ success: true, data: missionResponse.data });
  } else {
    return res.send({ success: false, message: missionResponse.message });
  }
};
const updateMission = async (req, res) => {
  let missionId = req.params.missionId ?? "";
  // console.log(req.body, missionId);
  let updatedKeys = ["mission_name", "speed", "alt"];
  let data = req.body ?? {};

  let error = false;
  let errorMsg = "";
  let filteredData = {};
  if (Object.keys(data).length === 0 || missionId === undefined) {
    return res.send({
      success: false,
      message: "please provide valid data.",
    });
  } else {
    Object.entries(data).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        error = true;
        errorMsg += `${key} has an invalid value: ${value} , `;
      } else if (updatedKeys.includes(key)) {
        filteredData[key] = value;
      }
    });
  }

  if (error) {
    return res.send({
      success: false,
      message: errorMsg,
    });
  }

  // console.log(filteredData);
  // process.exit(0);
  let missionResponse = await mission.update(filteredData, missionId);
  // return res.send(userResponse);
  if (missionResponse.success) {
    return res.send({ success: true, data: missionResponse.data });
  } else {
    return res.send({ success: false, message: missionResponse.message });
  }
};
const deleteMission = async (req, res) => {
  let missionId = req.params.missionId ?? "";
  // let company = _.extend(missionId, req.body);
  // console.log(missionId)
  // process.exit(0);

  if (missionId === "") {
    return res.send({
      success: false,
      message: "provide valid missionId ",
    });
  }

  let missionResponse = await mission.deleteMission(missionId);
  // return res.send(userResponse);
  if (missionResponse.success) {
    return res.send({ success: true, data: missionResponse.data });
  } else {
    return res.send({ success: false, message: missionResponse.message });
  }
};
// 
const getAllMission = async (req, res) => {
  let siteId = req.params.siteId ?? "";
  
  if (siteId === "") {
    return res.send({
      success: false,
      message: "provide valid missionId ",
    });
  }

  let missionResponse = await mission.getAllMissions(siteId);
  // return res.send(userResponse);
  if (missionResponse.success) {
    return res.send({ success: true, data: missionResponse.data });
  } else {
    return res.send({ success: false, message: missionResponse.message });
  }
};
const addWayPoints = async (req, res) => {
  let missionId = req.params.missionId ?? "";


  let updatedKeys = ["alt", "lat", "lng"];
  let data = req.body ?? {};

  let error = false;
  let errorMsg = "";
  let filteredData = {};
  if (Object.keys(data).length === 0 || missionId === undefined ||
    !data.hasOwnProperty('alt') || !data.hasOwnProperty('lat') ||
    !data.hasOwnProperty('lng')) {
    return res.send({
      success: false,
      message: "please provide valid data.",
    });
  } else {
    Object.entries(data).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        error = true;
        errorMsg += `${key} has an invalid value: ${value} , `;
      } else if (updatedKeys.includes(key)) {
        filteredData[key] = value;
      }
    });
  }

  if (error) {
    return res.send({
      success: false,
      message: errorMsg,
    });
  }

  // console.log(missionId)
  // process.exit(0);

  let missionResponse = await mission.updateWayPoints(filteredData, missionId);
  // return res.send(userResponse);
  if (missionResponse.success) {
    return res.send({ success: true, data: missionResponse.data });
  } else {
    return res.send({ success: false, message: missionResponse.message });
  }
};



const createDrone = async (req, res) => {
  let droneName = req.body.drone_name;
  let droneType = req.body.drone_type;
  let makeName = req.body.make_name;

  if (
    droneName === undefined ||
    droneType === undefined ||
    makeName === undefined
  ) {
    return res.send({ success: false, message: "provide valid data" });
  }

  let missionResponse = await drone.create(req.body);
  // return res.send(userResponse);
  if (missionResponse.success) {
    return res.send({ success: true, data: missionResponse.data });
  } else {
    return res.send({ success: false, message: missionResponse.message });
  }
};

module.exports = { createMission, updateMission, deleteMission, createDrone, getAllMission, addWayPoints };
