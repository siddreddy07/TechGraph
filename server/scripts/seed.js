import "dotenv/config";
import driver from "../src/config/db.js";



const technologies = [
  { name: "react", category: "Frontend" },
  { name: "node.js", category: "Backend" },
  { name: "express", category: "Backend" },
  { name: "postgresql", category: "Database" },
  { name: "redis", category: "Database" },
  { name: "docker", category: "DevOps" },
]


const projects = [
  {
    name: "E-commerce Platform",
    description: "Online shopping platform",
  },
  {
    name: "Real-time Chat App",
    description: "Real-time messaging application",
  },
  {
    name: "Analytics Dashboard",
    description: "Application analytics dashboard",
  },
  {
    name: "Job Tracker",
    description: "Job application tracking platform",
  },
];


const projectTechnologies = [
  ["E-commerce Platform", "react"],
  ["E-commerce Platform", "node.js"],
  ["E-commerce Platform", "postgresql"],

  ["Real-time Chat App", "react"],
  ["Real-time Chat App", "node.js"],
  ["Real-time Chat App", "redis"],

  ["Analytics Dashboard", "react"],
  ["Analytics Dashboard", "postgresql"],

  ["Job Tracker", "react"],
  ["Job Tracker", "express"],
  ["Job Tracker", "postgresql"],
];

const developers = [
  { name: "siddharth", role: "Full Stack Developer" },
  { name: "maya", role: "Frontend Developer" },
  { name: "rahul", role: "Backend Developer" },
];


const developerProjects = [
  ["siddharth", "E-commerce Platform"],
  ["siddharth", "Job Tracker"],
  ["maya", "Analytics Dashboard"],
  ["rahul", "Real-time Chat App"],
];



async function clearDatabase() {
  await driver.executeQuery("MATCH (n) DETACH DELETE n");
  console.log("Database cleared");
}

async function seedDevelopers() {
  for (const developer of developers) {
    await driver.executeQuery(
      `
      MERGE (d:Developer { name: $name })
      SET d.role = $role
      `,
      {
        name: developer.name,
        role: developer.role,
      }
    );
  }

  console.log("Developers seeded");
}




async function seedProjects() {
  for (const project of projects) {
    await driver.executeQuery(
      `
      MERGE (p:Project { name: $name })
      SET p.description = $description
      `,
      {
        name: project.name,
        description: project.description,
      }
    );
  }

  console.log("Projects seeded");
}


async function seedTechnologies() {
    for(const tech of technologies) {
        await driver.executeQuery(
            `
            MERGE (t:Technology {name:$name})
            SET t.category = $category
            `,
            {
                name: tech.name,
                category: tech.category
            }
        )
    }
    console.log("Technologies seeded successfully.");
}



async function seedProjectTechnologies() {
  for (const [projectName, techName] of projectTechnologies) {
    await driver.executeQuery(
      `
      MATCH (p:Project { name: $projectName })
      MATCH (t:Technology { name: $techName })
      MERGE (p)-[:USES]->(t)
      `,
      {
        projectName,
        techName,
      }
    )
  }
}


async function seedDeveloperProjects() {
  for (const [developerName, projectName] of developerProjects) {
    await driver.executeQuery(
      `
      MATCH (d:Developer { name: $developerName })
      MATCH (p:Project { name: $projectName })

      MERGE (d)-[:WORKED_ON]->(p)
      `,
      {
        developerName,
        projectName,
      }
    );
  }

  console.log("Developer relationships seeded");
}

try {
  // await clearDatabase(); --> Entire db Cleared fn.
  await seedTechnologies();
  await seedProjects();
  await seedDevelopers();
  await seedProjectTechnologies();
  await seedDeveloperProjects();
} catch (error) {
  console.error("Seed failed:", error);
} finally {
  await driver.close();
}