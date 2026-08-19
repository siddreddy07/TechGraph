import "dotenv/config";
import express from "express";
import cors from "cors";
import driver from "./config/db.js";
import technologyRoutes from "./routes/technology.routes.js";
import developerRoutes from "./routes/developer.routes.js";

const app = express();

app.use(
  cors({
    origin: (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, ""),
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/technologies", technologyRoutes);
app.use("/api/developers", developerRoutes);


  const port = process.env.PORT || 8000;
  app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);
    try {

          await driver.verifyConnectivity();
    console.log("Connected to CognoDB");

    } catch (error) {
        console.error("Connection failed:", error);
    }
  });
