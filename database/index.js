require('dotenv').config();
const { Client } = require('pg');

const user = process.env.PGUSER;
const host = process.env.PGHOST;
const database = process.env.PGDATABASE;
const password = process.env.PGPASSWORD;
const port = process.env.PGPORT;
const connectionString = `postgresql://${user}:${password}@${host}:${port}/${database}`;

const client = new Client({
  connectionString,
});

client.connect();

module.exports = client;
