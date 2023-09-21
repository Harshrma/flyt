const Connection = require("./connection.js");
const helper = require("../components/helper");

const create = async (data) => {
  const collection = Connection.conn.collection("drones");
  let droneName = data.drone_name;
  let droneType = data.drone_type;
  let makeName = data.make_name;

  try {
    let validateResponse = await collection
      .find({ drone_name: droneName })
      .toArray();
    // console.log("validateResponse");
    // console.log(validateResponse);
    // process.exit(0);
    if (validateResponse.length > 0) {
      return {
        success: false,
        message: "site is alreadt created for this name ",
      };
    }
    console.log(validateResponse);
    let UUID = helper.createUUID(15);
    console.log(UUID);
    const created_at = new Date().toISOString();

    const dbResponse = await collection.insertOne({
      site_id: UUID,
      drone_name: droneName,
      drone_type: droneType,
      make_name: makeName,
      created_at: { $date: created_at },
      updated_at: { $date: created_at },
      deleted_by: "0",
      deleted_on: "",
    });
    // console.log(dbResponse);
    if (dbResponse.acknowledged) {
      return {
        success: true,
        data: `your drone created successfully `,
      };
    } else {
      return {
        success: false,
        message: `somthing went wrong please try again later`,
      };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

module.exports = {
  create,
};
