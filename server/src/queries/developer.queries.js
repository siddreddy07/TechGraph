import driver from "../config/db.js";

export async function getAllDeveloperNames() {
  const result = await driver.executeQuery(
    `MATCH (d:Developer) RETURN d.name AS name`
  );

  return result.records.map((record) => record.get("name"));
}

export async function getDeveloperTechnologies(developerName) {
  const result = await driver.executeQuery(
    `
    MATCH (d:Developer { name: $developerName })
          -[:WORKED_ON]->(p:Project)
          -[:USES]->(t:Technology)

    RETURN d.role AS role, collect(DISTINCT t) AS technologies
    `,
    {
      developerName,
    }
  );

  if (result.records.length === 0) return null;

  const record = result.records[0];
  return {
    role: record.get("role"),
    technologies: record.get("technologies").map((t) => t.properties),
  };
}
