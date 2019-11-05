import { pool } from '../config/connect_db';

const createTable = pool.query(`
DROP TABLE IF EXISTS mydiaryusers CASCADE;
CREATE TABLE mydiaryUsers(
  id VARCHAR PRIMARY KEY NOT NULL,
  firstName VARCHAR NOT NULL,
  lastName VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL
);
DROP TABLE IF EXISTS mydiaryEntries CASCADE;
CREATE TABLE mydiaryEntries(
  entryid SERIAL PRIMARY KEY NOT NULL,
  userid VARCHAR NOT NULL,
  title VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  datecreated VARCHAR NOT NULL
);`)

export default createTable;