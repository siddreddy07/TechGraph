import driver from "../config/db.js";

export async function getProjectsByTechnology(technologyName) {
  const result = await driver.executeQuery(
    `
    MATCH (p:Project)-[:USES]->(t:Technology { name: $technologyName })
    RETURN p
    `,
    { technologyName }
  );
  return result.records.map(record => record.get("p").properties);
}

export async function getRelatedTechnologies(technologyName) {
  const result = await driver.executeQuery(
    `
    MATCH (source:Technology { name: $technologyName })
          <-[:USES]-(p:Project)-[:USES]->(related:Technology)
    WHERE related.name <> $technologyName
    RETURN DISTINCT related
    `,
    { technologyName }
  );
  return result.records.map(record => record.get("related").properties);
}

export async function createTechnologies({ name, category }) {
  try {
    const { records } = await driver.executeQuery(
      `
      CREATE (t:Technology { name: $name, category: $category })
      RETURN t
      `,
      { name, category }
    );

    console.log("Technology created successfully:", records[0].get("t").properties);
  } catch (error) {
    console.error("Error creating technology:", error);
    throw error;
  }
}

export async function findTechnologyPath(from, to) {
  const result = await driver.executeQuery(
    `
    MATCH path = shortestPath(
      (source:Technology { name: $from })
      -[*..5]-
      (target:Technology { name: $to })
    )
    RETURN path
    `,
    { from, to }
  );

  if (result.records.length === 0) {
    return null;
  }

  const path = result.records[0].get("path");

  return {
    start: path.start.properties,
    end: path.end.properties,
    segments: path.segments.map((segment) => ({
      from: segment.start.properties,
      relationship: segment.relationship.type,
      to: segment.end.properties,
    })),
    length: path.length,
  };
}