import { getAllDeveloperNames, getDeveloperTechnologies } from "../queries/developer.queries.js";

export async function getDeveloperNames(req, res) {
  try {
    const names = await getAllDeveloperNames();
    res.status(200).json(names);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch developers" });
  }
}

export async function getTechnologies(req, res) {
  try {
    const { name } = req.params;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({ message: "Developer name is required" });
    }

    const profile = await getDeveloperTechnologies(name.trim().toLowerCase());

    if (!profile) {
      return res.status(404).json({ message: "Developer not found" });
    }

    res.status(200).json({
      developer: name.trim(),
      role: profile.role,
      technologies: profile.technologies,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch developer technologies",
    });
  }
}
