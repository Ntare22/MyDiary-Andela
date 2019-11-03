import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Pool({
  connectionString: process.env.dbURL
})

class DBTransaction {
  static db_connect = () => {
    client.connect()
    .then(() => console.log('db connected successfully'))
    .then(() => client.query('select * from mytable'))
    .then(results => console.table(results.rows))
    .catch(e => console.log(e))
    .finally(() => client.end());
  }
}



export default DBTransaction;