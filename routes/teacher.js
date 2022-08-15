var express = require("express");
var router = express.Router();
const resultController = require("../controllers/resultController.js");
const teacherController = require("../controllers/teacherController.js");
let flag = require("../app.js");
/* Get Teacher Home Page */

router.post("/login", teacherController.teacherLogin);

router.get("/", resultController.getAllResults);

router.get("/add", function (req, res, next) {
  res.render("./teacher/addStudent", { title: "Add Student" });
});
router.post("/updateResult/:rollNumber", resultController.updateResults);
router.post("/addresult", resultController.addResult);
router.get("/edit/:rollNumber", resultController.getOneResults);
router.delete("/delete/:rollNumber", resultController.deleteResults);
router.get("/check/:rollNumber", resultController.checkResut);

module.exports = router;
