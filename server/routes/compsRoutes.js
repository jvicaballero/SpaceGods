import express from "express";

// comps.js uses a NAMED export, so destructure it (default import would be undefined).
import { compsData } from "../data/comps.js";

const router = express.Router();

// GET /comps -> all comps
router.get("/", (req, res) => {
  res.status(200).json(compsData);
});

// GET /comps/:compId -> one comp by id
router.get("/:compId", (req, res) => {
  const comp = compsData.find((c) => c.id === Number(req.params.compId));
  if (!comp) {
    return res.status(404).json({ error: "Comp not found" });
  }
  res.status(200).json(comp);
});

export default router;
