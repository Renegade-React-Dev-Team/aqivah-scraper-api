const express = require("express");
const router = express.Router();
const { Query } = require("../db/db");
const Error = {
  data: null,
  error: "No data found",
};

router.get("/", async (req, res) => {
  var data = null;
  try {
    data = await Query("SELECT * FROM paginationTypes");
  } catch (e) {
    console.log(e);
  }
  if (!data) {
    res.status(200).send(Error);
  } else {
    res.send(data);
  }
});

module.exports = router;
