const Connection = require("./connection.js");
const checkEmailExist = async (email, collectionName, filter) => {
  console.log("in helper function email");
  console.log(email);
  // let connection =await Connection.connectDB();
  // const collection = Connection.conn.collection(collectionName);
  // console.log(connection);
  // process.exit(0);
  if (email.trim().length == 0) {
    return { success: false, message: "email is empty" };
  }
  try {
    let appliedFilter = { email: email, ...filter };
    console.log("appliedFilter", appliedFilter);
    // const collection = connection.collection(collectionName);
    const collection =  Connection.conn.collection(collectionName);
    let dbResponse = await collection.find(appliedFilter).toArray();
    console.log("dbResponse");
    console.log(dbResponse.length);
    if (dbResponse.length > 0) {
      return { success: true, message: "email already exists" };
    } else {
      return { success: false, message: "email not exists" };
    }
    // res.json({ result: result });
  } catch (error) {
    console.log(error);
    return { success: true, message: error };
    // res.status(500).json({ error });
  }
};

const checkSitePresentOrNot = async (siteId) => {
  const collection = Connection.conn.collection("sites");
  let userId=global.userId;

  try {
    let validateResponse = await collection.find({ site_id: siteId,user_id:userId }).toArray();
 
    if (validateResponse.length == 0) {
      return {
        success: false,
        message: "invalid site_id please provide a valid site_id",
      };
    } else {
      return {
        success: true,
        message: `site is present of this ${siteId}`,
      };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

module.exports = { checkEmailExist,checkSitePresentOrNot };
