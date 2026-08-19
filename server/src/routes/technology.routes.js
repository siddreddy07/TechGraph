import express from "express";
import { getProjects, getRelated, getPath } from "../controllers/technology.controller.js";

const router = express.Router();

router.get("/path", getPath);
router.get("/:name/projects", getProjects);
router.get("/:name/related", getRelated);

export default router;