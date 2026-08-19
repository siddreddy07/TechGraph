import express from "express";
import { getDeveloperNames, getTechnologies } from "../controllers/developer.controller.js";

const router = express.Router();

router.get("/", getDeveloperNames);
router.get("/:name/technologies", getTechnologies);

export default router;
