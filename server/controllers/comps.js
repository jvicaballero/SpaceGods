import { pool } from "../config/database.js";

const getComps = async (req, res) => {
  try {
    const query = `SELECT id, name, description, cardimage AS "cardImage", boardimage AS "boardImage", maincarry AS "mainCarry" FROM comps`;
    const results = await pool.query(query);
    res.status(200).json(results.rows);
  } catch (err) {
    // Error 409 Conflict: This status code indicates that the request could not be processed because of a conflict in the current state of the resource. In this context, it could mean that there was an issue with retrieving the comps data from the database, such as a connection problem or a query error.
    // 409 specifically means the data itself is the problem, not the format of the request.
    // Example: Duplicate Entry: trying to create a user with an email that already exists. The server responds 409 to say "this already exists, I can't create it again."
    res.status(409).json({ error: error.message });
  }
};

const getCompById = async (req, res) => {
  try {
    const { compId } = req.params;
    const query = `SELECT id, name, description, cardimage AS "cardImage", boardimage AS "boardImage", maincarry AS "mainCarry" FROM comps WHERE id = $1`;
    const results = await pool.query(query, [compId]);
    if (!results.rows.length) {
      return res.status(404).json({ error: "Comp not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

// If using export default, the name on the import side can be anything, will import as CompsController
export default { getComps, getCompById };
