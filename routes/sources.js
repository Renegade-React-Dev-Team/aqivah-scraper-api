const express = require("express");
const router = express.Router();
const data = require("./../data");
const { db } = require("../index");
const { Query } = require("../db/db");
const Error = {
  data: null,
  error: "No data found",
};

router.get("/", async (req, res) => {
  var data = null;
  try {
    data = await Query("SELECT * FROM sources");
  } catch (e) {
    console.log(e);
  }
  if (!data) {
    res.status(200).send(Error);
  } else {
    res.send(data);
  }
});

router.post("/", (req, res) => {
  console.log("received source -> ", req.body);
  res.send("Success");
});

module.exports = router;


