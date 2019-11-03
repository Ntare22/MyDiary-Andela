import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.dbURL
})

const createTable = pool.query(`DROP TABLE IF EXISTS mydiaryusers CASCADE;
CREATE TABLE mydiaryUsers(
  id SERIAL PRIMARY KEY NOT NULL,
  firstName VARCHAR NOT NULL,
  lastName VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL
);
DROP TABLE IF EXISTS mydiaryEntries CASCADE;
CREATE TABLE mydiaryEntries(
  entryid SERIAL PRIMARY KEY NOT NULL,
  userid INTEGER NOT NULL,
  title VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  datecreated VARCHAR NOT NULL
);`)

export default createTable;