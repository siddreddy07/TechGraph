import { useState } from "react";

function TechnologySearch({ onSearch, loading }) {
  const [search, setSearch] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!search.trim()) return;

    await onSearch(search);
  }

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-5">
      <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-gray-500">
        Explore Technology
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="React, Redis, Node.js..."
          disabled={loading}
          className="flex-1 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white disabled:cursor-not-allowed disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          )}
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
    </section>
  );
}

export default TechnologySearch;
