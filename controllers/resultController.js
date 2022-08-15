const db = require("../models");

const Result = db.results;

const addResult = async (req, res) => {
  console.log(req.body);
  const result = await Result.create(req.body).then((result) => {
    res.status(200).send("/teacher");
  });
};

const getAllResults = async (req, res) => {
  let results = await Result.findAll({});
  res.render("./teacher/teacherHome", { title: "Teacher Home", results });
};
const viewResult = async (req, res) => {
  let rollNumber = req.params.rollNumber;
  let result = await Result.findOne({
    where: {
      rollNumber: rollNumber,
    },
  }).then((result) => {
    res.render("./student/studentresult", { title: "Result ", result });
  });
};
const getOneResults = async (req, res) => {
  let rollNumber = req.params.rollNumber;
  let result = await Result.findOne({
    where: {
      rollNumber: rollNumber,
    },
  }).then((result) => {
    res.render("./teacher/editStudent", { title: "Edit Student", result });
  });
};

const getStuResult = async (req, res) => {
  let rollNumber = req.body.rollNumber;
  let dateOfBirth = req.body.dob;
  console.log(rollNumber + "  " + dateOfBirth);
  let result = await Result.findOne({
    where: {
      rollNumber: rollNumber,
      dateOfBirth: dateOfBirth,
    },
  });
  if (result != null) {
    res.status(200).send(rollNumber);
  } else {
    res.status(200).send(false);
  }
};

const updateResults = async (req, res) => {
  const rollNumber = req.params.rollNumber;
  let result = await Result.update(req.body, {
    where: { rollNumber: rollNumber },
  }).then((result) => {
    res.redirect("/teacher");
  });
};

const deleteResults = async (req, res) => {
  let rollNumber = req.params.rollNumber;
  await Result.destroy({ where: { rollNumber: rollNumber } });
  res.status(200).send("/teacher");
};

const checkResut = async (req, res) => {
  let rollNumber = req.params.rollNumber;
  let result = await Result.findOne({
    where: {
      rollNumber: rollNumber,
    },
  });
  if (result != null) {
    res.status(200).send(true);
  } else {
    res.status(200).send(false);
  }
};

module.exports = {
  addResult,
  getAllResults,
  getOneResults,
  updateResults,
  deleteResults,
  checkResut,
  viewResult,
  getStuResult,
};
