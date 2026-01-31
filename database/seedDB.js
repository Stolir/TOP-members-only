const { Client } = require("pg");
const dbConfig = require("../config/dbconfig");

const client = new Client(dbConfig);

async function run() {
  try {
    // Connect to client
    await client.connect();
    await client.query("BEGIN");

    // Create tables if they don't exist
    await client.query(
      `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        first_name TEXT NOT NULL,
        last_name TEXT,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        is_admin BOOLEAN NOT NULL DEFAULT false,
        is_club_member BOOLEAN NOT NULL DEFAULT false
      );

      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS account_status_passwords (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      role_name TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      created_by INTEGER REFERENCES users(id) ON DELETE SET NULL
      )
      `,
    );

    await client.query("COMMIT");
    console.log("---- Seeding Complete ----");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("---- Seeding failed ----");
  } finally {
    await client.end();
  }
}

run();
