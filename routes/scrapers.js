const express = require("express");
const router = express.Router();
const data = require("./../data");

router.patch("/:id", (req, res) => {
  const { status } = req.body;
  console.log("id of scraper is -> ", req.params.id);
  const { id } = req.params;

  console.log(`current status of scraper with id ${id} set to ${status}`);
  res.send({ message: "Success", sessionId: 1 });
});

module.exports = router;
