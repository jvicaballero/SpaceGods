// Config Folder will have all the crap that we need to connect to the database
// This directory will store files related to server and database configurations.

// PG is the bridge between Express and Postgres, lets Express communicate with PostgresDB
import pg from "pg";

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
};

/**
 *  Option 2: Connection string
 * import pg from "pg";
    const db = new pg.Pool({
    connectionString: "postgresql://postgres:yourpassword@localhost:5432/spacegods",
    }   );


    * Option 3: Environment variables
    import pg from "pg";
    const db = new pg.Pool(); // reads PG* env vars with no config needed
 */

// A connection pool is a cache of database connections maintained so that the connections can be reused when future requests to the database are required.

export const pool = new pg.Pool(config);
