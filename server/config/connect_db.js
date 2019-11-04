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
    .catch(e => console.log(e))
  }
}



export default DBTransaction;