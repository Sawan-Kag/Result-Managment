var express = require("express");
const { get } = require("express/lib/response");
var router = express.Router();
const resultController = require("../controllers/resultController.js");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("./student/student", { title: "Student Home" });
});

router.post("/result", resultController.getStuResult);

router.get("/getresult/:rollNumber", resultController.viewResult);

module.exports = router;
