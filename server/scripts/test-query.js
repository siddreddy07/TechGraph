import "dotenv/config";
import { getRelatedTechnologies, findTechnologyPath } from "../src/queries/technology.queries.js";
import driver from "../src/config/db.js";

try {
  const path = await findTechnologyPath("react", "redis");
  console.log("Path:", path);
} catch (error) {
  console.error(error);
} finally {
  await driver.close();
}