const express = require("express");
const routes = express.Router();
const { v4: uuid } = require("uuid");
const router = require("./fields");

const { Query } = require("../db/db");
const Error = {
  data: null,
  error: "No data found",
};

async function getTypeById(id){
    let data = await Query(`Select * from fieldTypes where id=${id}`);
    return data;
}

routes.get("/:id?", async (req, res) => {
 if(req.params.id){
  var data = null;
  try {
    data = await getTypeById(req.params.id)
  } catch (e) {
    console.log(e);
  }
  if (!data) {
    res.status(200).send(Error);
  } else {
    res.send(data);
  }
 }else{
  const query = `
  SELECT *
  FROM fieldTypes
  `;
  var data = null;
  try {
    data = await Query(query);
  } catch (e) {
    console.log(e);
  }
  if (!data) {
    res.status(200).send(Error);
  } else {
    res.send(data);
  }
 }

});

routes.post("/", async (req, res) => {
  
  const { name } = req.body;
  console.log("incoming name -> ", name);
  const id = uuid();
  const query = `
  INSERT INTO fieldTypes
  (id, label)
  VALUES
  (?,?)`;
  try {
    data = await Query(query, [id,name]);
    if(Array.isArray(data))data={success: true};
  } catch (e) {
    console.log(e);
  }
  if (!data) {
    res.status(200).send(Error);
  } else {
    res.send(data);
  }
  
  // res.send(name);
});

routes.get("/:id", (req, res) => {
  console.log("request value -> ", req.params);
  const id = req.params.id;
  if (!id) {
    res.send("No id provided");
    return;
  }

  const query = `
  SELECT id, label
  FROM fieldTypes
  WHERE id = ?
  `;

  db.each(query, [id], (error, result) => {
    if (error) {
      console.log("failed to retrieve row", error);
      res.sendStatus(404);
      return;
    }
    console.log("result of fetching field type with id -> ", result);
    res.send(result);
  });
});

routes.put("/:id", (req, res) => {
  const id = req.params.id;
  console.log("request body -> ", req);
  const { label } = req.body;
  console.log("value of label -> ", label);

  const query = `
  UPDATE 
    fieldTypes
  SET 
    label = ? 
  WHERE id = ?;
  `;

  console.log(query);
  db.all(query, [label, id], (error, rows) => {
    if (error) {
      console.log("error updating field type -> ", error);
      return res.send(error);
    }

    console.log("result of update -> ", rows);
    res.send("success");
  });
});



routes.delete("/:id", async (req, res) => {
  console.log(req.body)
  const { id } = req.params;
  const query = `
  DELETE FROM fieldTypes
  WHERE id = ?;
  `;
  try {
    data = await Query(query, [id]);
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

module.exports = routes;
