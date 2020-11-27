const sqlite = require("sqlite3");

var db = getDb();

const Query = async (sql, params) => {
  db = getDb();
  return new Promise((resolve, reject) => {
    db.serialize(()=>{
      db.all(sql, params, (err, rows) => {
        // db.close();
        if (err) reject(err);
        resolve(rows);
      });
    })
  });
};
function getDb() {
  return new sqlite.Database("./db/data.db");
}

module.exports = {
  Query,
};
