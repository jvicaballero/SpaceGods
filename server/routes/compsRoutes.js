import express from "express";

// comps.js uses a NAMED export, so destructure it (default import would be undefined).
import CompsController from "../controllers/comps.js";

const router = express.Router();

// GET /comps -> all comps
router.get("/", CompsController.getComps);

// GET /comps/:compId -> one comp by id
router.get("/:compId", CompsController.getCompById);

export default router;
