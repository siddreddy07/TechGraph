import { getProjectsByTechnology, getRelatedTechnologies, findTechnologyPath } from "../queries/technology.queries.js";

export async function getProjects(req, res) {
  try {
    const { name } = req.params;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({ message: "Technology name is required" });
    }

    const projects = await getProjectsByTechnology(name.trim().toLowerCase());

    res.status(200).json({
      technology: name.trim(),
      projects,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch projects",
    });
  }
}

export async function getRelated(req, res) {
  try {
    const { name } = req.params;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({ message: "Technology name is required" });
    }

    const technologies = await getRelatedTechnologies(name.trim().toLowerCase());

    res.status(200).json({
      technology: name.trim(),
      relatedTechnologies: technologies,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch related technologies",
    });
  }
}

export async function getPath(req, res) {
  try {
    const { from, to } = req.query;

    if (!from || typeof from !== "string" || from.trim().length === 0) {
      return res.status(400).json({ message: "from query parameter is required" });
    }

    if (!to || typeof to !== "string" || to.trim().length === 0) {
      return res.status(400).json({ message: "to query parameter is required" });
    }

    const path = await findTechnologyPath(from.trim().toLowerCase(), to.trim().toLowerCase());

    if (!path) {
      return res.status(404).json({ message: "No path found between these technologies" });
    }

    res.status(200).json(path);
  } catch (error) {
    res.status(500).json({
      message: "Failed to find technology path",
    });
  }
}