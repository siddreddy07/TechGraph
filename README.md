# TechGraph

[Live Demo](https://techgraph.netlify.app/)

[![TechGraph Demo](https://res.cloudinary.com/dtgf2auzt/image/upload/v1787165649/image_2026-08-20_002409099_cani5i.png)](https://res.cloudinary.com/dtgf2auzt/video/upload/v1787165579/TechGraph_keicbi.mp4)

## Web App Screenshots

![Screenshot 1](https://res.cloudinary.com/dtgf2auzt/image/upload/v1787165963/1_wre9qc.png)

![Screenshot 2](https://res.cloudinary.com/dtgf2auzt/image/upload/v1787165979/Screenshot_2026-08-20_002616_a9q8ll.png)

![Screenshot 3](https://res.cloudinary.com/dtgf2auzt/image/upload/v1787165980/Screenshot_2026-08-20_002904_dtxbhh.png)

Ever wonder what connects a developer to a technology they've never directly used? Or how two completely different tools end up in the same project?

TechGraph maps those connections. It's a graph-based tool that links **developers**, **projects**, and **technologies** together — so you can search a tech and see who uses it, explore a developer's full stack, or find the shortest path between any two technologies through shared projects.

React + Express + [CognoDB](https://cognodb.com) (Neo4j-compatible graph DB).

## What can you do with it?

- **Search a technology** — type "redis" and instantly see which projects use it, plus every other tech that shows up alongside it.
- **Explore a developer** — type a name and see every technology they've touched across all their projects.
- **Find the path** — give it two technologies (say, React and Docker) and it'll find the shortest route between them through projects, drawn out as an interactive graph.

## Why a graph database?

Relational databases are great for a lot of things, but "how are these things connected?" isn't one of them. That question usually means writing a bunch of self-joins and hoping you got the joins right.

A graph database stores relationships as first-class citizens. TechGraph needs exactly that — it's all about traversal. "What technologies share a project?" is a two-hop walk in Cypher. "Shortest path between React and Redis?" is a single `shortestPath()` call. Try doing that in SQL without crying.

## Data model

The whole graph boils down to three types of nodes and two types of edges:

```
(Developer) --WORKED_ON--> (Project) --USES--> (Technology)
```

### Nodes

| Node          | Properties            | Example                            |
|---------------|-----------------------|------------------------------------|
| `Technology`  | `name`, `category`    | react (Frontend), redis (Database) |
| `Project`     | `name`, `description` | E-commerce Platform                |
| `Developer`   | `name`, `role`        | siddharth (Full Stack Developer)   |

### Relationships

| Relationship | From → To            | What it means                        |
|--------------|----------------------|--------------------------------------|
| `USES`       | Project → Technology | A project depends on this tech       |
| `WORKED_ON`  | Developer → Project  | A developer contributed to a project |

### How it looks

```
                    ┌────────────┐     USES     ┌──────────────┐
                    │  Project   │─────────────▶│  Technology   │
                    │            │              │              │
                    │  name      │              │  name        │
                    │  desc      │              │  category    │
                    └─────┬──────┘              └──────────────┘
                          │
                     WORKED_ON
                          │
                    ┌─────▼──────┐
                    │  Developer │
                    │            │
                    │  name      │
                    │  role      │
                    └────────────┘
```

## Environment variables

Both `server/` and `client/` have `.env.example` files. Copy them and fill in the blanks.

### Server (`server/.env`)

```env
# CognoDB connection
COGNODB_URI=bolt+s://<your-instance>.databases.cognodb.com
COGNODB_USER=<your-username>
COGNODB_PASSWORD=<your-password>

# Server
PORT=8000

# CORS — your frontend's origin
FRONTEND_URL=http://localhost:5173
```

### Client (`client/.env`)

```env
# Backend API base URL — /api works with the Vite dev proxy, full URL for production
VITE_API_URL=http://localhost:8000/api
```

### What's what

| Variable           | Where  | Does what                                             | Default                    |
|--------------------|--------|-------------------------------------------------------|----------------------------|
| `COGNODB_URI`      | Server | Bolt connection URL for CognoDB                       | —                          |
| `COGNODB_USER`     | Server | CognoDB username                                      | —                          |
| `COGNODB_PASSWORD` | Server | CognoDB password                                      | —                          |
| `PORT`             | Server | Port Express listens on                               | `8000`                     |
| `FRONTEND_URL`     | Server | Allowed CORS origin                                   | `http://localhost:5173`    |
| `VITE_API_URL`     | Client | Backend API URL (Vite bakes this into the bundle)     | `http://localhost:8000/api`|

## CognoDB setup

TechGraph uses [CognoDB](https://cognodb.com) for the graph database — it's Neo4j-compatible so you get the full power of Cypher without managing your own Neo4j instance.

1. Sign up at [cognodb.com](https://cognodb.com)
2. Spin up a new database
3. Grab the connection URI, username, and password
4. Paste them into `server/.env`

## Running locally

You'll need Node.js 18+ and npm.

```bash
git clone <repo-url>
cd techgraph

cd server && npm install
cd ../client && npm install

cp server/.env.example server/.env
cp client/.env.example client/.env
# fill in your CognoDB credentials in server/.env
```

Seed the database with sample data:

```bash
cd server
node scripts/seed.js
```

Start the backend and frontend in separate terminals:

```bash
# terminal 1
cd server && npm run dev    # → http://localhost:8000

# terminal 2
cd client && npm run dev    # → http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) and you're good to go.

## Deploying

### Backend

Set these on your hosting platform (Render, Railway, whatever):

```env
COGNODB_URI=bolt+s://<your-instance>.databases.cognodb.com
COGNODB_USER=<your-username>
COGNODB_PASSWORD=<your-password>
PORT=8000
FRONTEND_URL=https://your-frontend-domain.com
```

### Frontend

Point it at your deployed backend, then build:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

```bash
npm run build   # outputs to dist/
npm run preview # preview the build locally
```

Heads up: Vite bakes `VITE_*` vars into the JS bundle at build time. Set them **before** you run `npm run build`.

## Seed command

```bash
cd server && node scripts/seed.js
```

What gets seeded:

| Entity            | Count | What                                                              |
|-------------------|-------|-------------------------------------------------------------------|
| Technologies      | 6     | react, node.js, express, postgresql, redis, docker                |
| Projects          | 4     | E-commerce Platform, Real-time Chat App, Analytics Dashboard, Job Tracker |
| Developers        | 3     | siddharth, maya, rahul                                            |
| `USES` edges      | 10    | project ↔ technology links                                        |
| `WORKED_ON` edges | 4     | developer ↔ project links                                         |

Uses `MERGE` everywhere, so running it again won't create duplicates.

## API routes

| Method | Endpoint                              | What it returns                        |
|--------|---------------------------------------|----------------------------------------|
| GET    | `/api/technologies/:name/projects`    | All projects that use a tech           |
| GET    | `/api/technologies/:name/related`     | Techs that co-occur in the same projects |
| GET    | `/api/technologies/path?from=X&to=Y`  | Shortest path between two techs        |
| GET    | `/api/developers`                     | All developer names                    |
| GET    | `/api/developers/:name/technologies`  | Every tech a developer has worked with |

## The Cypher queries

The interesting ones that power the app.

### Projects using a technology

```cypher
MATCH (p:Project)-[:USES]->(t:Technology { name: $technologyName })
RETURN p
```

Walks from Project → Technology via `USES`. Simple, but useful — gives you every project that depends on a given tech.

### Technologies related to a tech

```cypher
MATCH (source:Technology { name: $technologyName })<-[:USES]-(p:Project)-[:USES]->(related:Technology)
WHERE related.name <> $technologyName
RETURN DISTINCT related
```

This one's the fun part of graphs. It goes: Tech ← Project → Tech. Find every project that uses the source tech, then look at what else those projects use. Skip the tech itself. That's how you get "people who use X also tend to use Y."

### What has a developer worked with?

```cypher
MATCH (d:Developer { name: $developerName })-[:WORKED_ON]->(p:Project)-[:USES]->(t:Technology)
RETURN DISTINCT t
```

Developer → Project → Technology. Walk through every project a developer touched and collect all the techs. One query, full picture.

### Shortest path between two technologies

```cypher
MATCH path = shortestPath(
  (source:Technology { name: $from })-[*..5]-(target:Technology { name: $to })
)
RETURN path
```

`shortestPath` with `[*..5]` means "any relationship type, up to 5 hops." It traverses through Project nodes automatically — so the path might look like React → E-commerce Platform → Redis. Capped at 5 to keep it fast.

## Tech stack

**Frontend:** React 19, Vite 8, Tailwind CSS 4, ReactFlow, Axios

**Backend:** Express 5, Node.js, neo4j-driver

**Database:** CognoDB
