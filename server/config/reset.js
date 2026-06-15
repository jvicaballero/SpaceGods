// This file contains functions to reset the database, starting with creating and seeding the comps table

import "./dotenv.js";
import { pool } from "./database.js";
import { compsData } from "../data/comps.js";

export async function createCompsTable() {
  const createTableQuery = `
    DROP TABLE IF EXISTS comps;

    CREATE TABLE IF NOT EXISTS comps (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        cardImage VARCHAR(255) NOT NULL,
        boardImage VARCHAR(255) NOT NULL,
        mainCarry TEXT NOT NULL
    )
`;
  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 comps table created successfully");
  } catch (err) {
    console.error("⚠️ error creating comps table", err);
  }
}

export async function seedCompsTable() {
  await createCompsTable();

  // Since ID is SERIAL, we don't need to insert it manually; it will auto-increment
  // Loop through compsData and insert each comp into the database
  compsData.forEach((comp) => {
    const insertQuery = {
      text: "INSERT INTO comps (name, description, cardImage, boardImage, mainCarry) VALUES ($1, $2, $3, $4, $5)",
    };

    //
    const values = [
      comp.name,
      comp.description,
      comp.cardImage,
      comp.boardImage,
      comp.mainCarry,
    ];

    // Use parameterized queries to prevent SQL injection and ensure proper data handling
    // A parameterized query separates the SQL command from the data values.
    // NOT ENCOURAGED: `INSERT INTO comps (name, description, cardImage, boardImage, mainCarry) VALUES ('${comp.name}', <--- risk of SQL injection here, etc....`
    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting comp", err);
        return;
      }

      console.log(`✅ ${comp.name} added successfully`);
    });
  });
}

seedCompsTable();

// New Things I learned:
// in package.json:
// --require loads the module listed first before running the the following file to execute
// --watch restarts the server whenever a file changes, so we don't have to manually restart the server every time we make a change to the code
// && only runs the second command if the first command is successful

// To run the dev script: npm run dev
// Note that run is required for any script that isn't start or test
// dev — for local development, usually with extra conveniences like watch mode, verbose logging, or in your case skipping the db reset.
// start — convention for running the app in production (or as the "official" way to launch it). Tools like Heroku, Railway, and Render look for npm start specifically when deploying.

// PSQL COMMANDS:
// \d  - list all tables in the current database
// \d comps - view the structure of the comps table
// SELECT * FROM comps; - view all data in the comps table
// \q - quit psql
