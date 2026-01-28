const fs = require("fs");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl:
    process.env.DB_SSL === "true"
      ? {
          rejectUnauthorized: true,
          ca: fs.readFileSync(process.env.DB_CA_CERT_PATH),
        }
      : false,
};

module.exports = dbConfig;
