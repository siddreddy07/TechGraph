import { useState } from "react";
import { findTechnologyPath } from "../api/technology.js";
import {
  ReactFlow,
  Background,
  Controls,
  MarkerType,
  applyNodeChanges,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { pathToReactFlow } from "../utils/graph.js";

function ConnectionGraph() {

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [, setPath] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onNodesChange = (changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  };

  async function handleFindPath() {
    if (!from.trim() || !to.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await findTechnologyPath(from, to);
      setPath(data);
      const graph = pathToReactFlow(data);
      setNodes(graph.nodes);
      setEdges(graph.edges);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to find path.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <section className="rounded-lg border border-gray-200 bg-white p-5">
      <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-gray-500">
        Find Connection
      </h2>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          placeholder="From: React"
          disabled={loading}
          className="flex-1 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />

        <input
          placeholder="To: Redis"
          disabled={loading}
          className="flex-1 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <button
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleFindPath}
        >
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          )}
          {loading ? "Search..." : "Find Path"}
        </button>
      </div>

      {error && (
        <p className="mt-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="relative mt-4 h-64 w-full overflow-hidden rounded-md border border-dashed border-gray-200">
        {nodes.length === 0 && !loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
            <p className="text-sm">Enter two technologies to find a connection</p>
          </div>
        )}
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            fitView
            defaultEdgeOptions={{
              type: "straight",
              markerEnd: { type: MarkerType.ArrowClosed },
              style: { strokeWidth: 3 },
            }}
        >
        <Background />
        <Controls />
        </ReactFlow>
      </div>
    </section>
  );
}

export default ConnectionGraph;
