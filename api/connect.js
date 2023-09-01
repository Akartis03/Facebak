import pkg from "pg";

const {Pool} = pkg;

const db = new Pool({

  host:"localhost",
  user:"postgres",
  password:"azertyuiop",
  database:"web"
});

db.connect();

export { db };


