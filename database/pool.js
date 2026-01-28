const { Pool } = require("pg");
const dbConfig = require("../config/dbconfig");

module.exports = new Pool(dbConfig);
