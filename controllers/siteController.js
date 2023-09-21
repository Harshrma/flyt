const site = require("../models/site");
const drone = require("../models/drone");
const helper = require("../models/helper");

const createSite = async (req, res) => {
  let requiredData = ["site_name", "position"];

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
      } else if (requiredData.includes(key)) {

        if (key === 'position' && (data[key].latitude === undefined || data[key].latitude === "" ||
          data[key].longtitude === undefined || data[key].longtitude === "")) {
          console.log([data[key].latitude, data[key].longtitude])
          console.log(data);
          error = true;

          errorMsg += `${key} has an invalid value.`;
        }
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


  let siteResponse = await site.create(req.body);
  // return res.send(userResponse);
  if (siteResponse.success) {
    return res.send({ success: true, data: siteResponse.data });
  } else {
    return res.send({ success: false, message: siteResponse.message });
  }
};
const updateSite = async (req, res) => {
  try {
    let siteId = req.params.siteId ?? "";
    let updatedKeys = ["site_name", "position", "drone"];
    let data = req.body ?? {};
    let error = false;
    let errorMsg = "";
    let filteredData = {};
    if (Object.keys(data).length === 0 || siteId === undefined) {
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
          if (key === 'position' && (data[key].latitude === undefined || data[key].latitude === "" ||
            data[key].longtitude === undefined || data[key].longtitude === "")) {
            console.log([data[key].latitude, data[key].longtitude])
            console.log(data);
            error = true;
            errorMsg += `${key} has an invalid value.`;
          }
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

    // console.log("filteredData");
    // let siteResponse = await site.update(req.body.site_name, siteId);
    let isSitePresent = await helper.checkSitePresentOrNot(siteId);
    // console.log(isSitePresent);
    // process.exit(0);

    if (!isSitePresent.success) {
      return res.send({
        success: false,
        message: "invalid site_id no site is present for this site_id",
      });
    }
    let siteResponse = await site.update(filteredData, siteId);
    // return res.send(userResponse);
    if (siteResponse.success) {
      return res.send({ success: true, data: siteResponse.data });
    } else {
      return res.send({ success: false, message: siteResponse.message });
    }
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
};
const deleteSite = async (req, res) => {
  let siteId = req.params.siteId ?? "";
  // let company = _.extend(siteId, req.body);
  // process.exit(0);

  if (siteId === "") {
    return res.send({
      success: false,
      message: "provide valid siteId ",
    });
  }
  let isSitePresent = await helper.checkSitePresentOrNot(siteId);

  if (!isSitePresent.success) {
    return res.send({
      success: false,
      message: "invalid site_id no site is present for this site_id",
    });
  }
  let siteResponse = await site.deleteSite(siteId);
  if (siteResponse.success) {
    return res.send({ success: true, data: siteResponse.data });
  } else {
    return res.send({ success: false, message: siteResponse.message });
  }
};
const removeDronefromSite = async (req, res) => {
  let siteId = req.params.siteId ?? "";
  // let company = _.extend(siteId, req.body);
  // console.log(siteId)
  // process.exit(0);

  if (siteId === "") {
    return res.send({
      success: false,
      message: "provide valid site_id.",
    });
  }

  let isSitePresent = await helper.checkSitePresentOrNot(siteId);

  if (!isSitePresent.success) {
    return res.send({
      success: false,
      message: "invalid site_id no site is present for this site_id",
    });
  }
  let siteResponse = await site.deleteDroneFromSite(siteId);
  // return res.send(userResponse);
  if (siteResponse.success) {
    return res.send({ success: true, data: siteResponse.data });
  } else {
    return res.send({ success: false, message: siteResponse.message });
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

  let siteResponse = await drone.create(req.body);
  // return res.send(userResponse);
  if (siteResponse.success) {
    return res.send({ success: true, data: siteResponse.data });
  } else {
    return res.send({ success: false, message: siteResponse.message });
  }
};

module.exports = {
  createSite,
  updateSite,
  deleteSite,
  createDrone,
  removeDronefromSite,
};
