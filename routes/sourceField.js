const express = require("express");
const router = express.Router();
const { db } = require("../index");
const { Query } = require("../db/db");
const { v4: uuid } = require("uuid");
const Error = {
  data: null,
  error: "No data found",
};

router.get("/", async (req, res) => {
  var data = null;
  try {
    data = await Query("SELECT * FROM sourceFields v LEFT JOIN sources d ON v.sourceId = d.id");
    
  } catch (e) {
    console.log(e);
  }
  if (!data) {
    res.status(200).send(Error);
  } else {
    res.send(data);
  }
});

router.post("/", async (req, res) => {
  let data = null;
  let {field,fieldType, source, selector  } = req.body;
  let id = uuid();
  const query = `
  INSERT INTO sourceFields (id, fieldId, sourceId,typeId, selector) VALUES (?,?,?,?,?);
  `;
  
  try {
    data = await Query(query, [id, field.id, source.id, fieldType.id,selector]);
    if(Array.isArray(data))data={success: true};
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


