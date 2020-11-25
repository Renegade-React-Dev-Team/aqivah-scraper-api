const express = require("express");
const router = express.Router();
const { Query } = require("../db/db");

router.get("/", async (req, res) => {
  const query = `
  SELECT *
  FROM fields;
  `;

  try {
    var results = await Query(query);
    res.send(results);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;
