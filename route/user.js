const express = require("express");
const fs = require("fs");

// const {
//   saveUserInfo,
//   markLogin,
//   addUserInfo,
//   getUserInfo,
//   getLoginInfo,
//   applyLeave,
//   uploadImage,
// } = require("../controllers/userController");
const router = express.Router();

/* const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where you want to save the uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name for the saved file
  },
});
const upload = multer({ storage: storage }); */
// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log("Time: ", Date.now());
//   console.log(global.role);
//   if (global.role != "user") {
//     return res.send({ success: false, message: "not authorized" });
//   }
//   next();
// });

// // define the home page route
// // router.post("/save",saveUserInfo);
// router.post("/upload", upload.single("test"), function (req, res) {
//   // req.file is the name of your file in the form above, here 'uploaded_file'
//   // req.body will hold the text fields, if there were any
//   const fileData = fs.readFileSync(req.file.path);
//   // Encode file contents to Base64
//   const base64Data = fileData.toString("base64");
//   console.log(base64Data);
//   process.exit(0);
// });

// router
//   .post("/marklogin", markLogin)
//   .post("/addinfo", addUserInfo)
//   .get("/me", getUserInfo)
//   .get("/mylogin", getLoginInfo)
//   .post("/applyleave", applyLeave);
// // .post("/upload", upload.single("file"), uploadImage);

module.exports = router;
