import { useState, useEffect } from "react";
import { getDeveloperTechnologies, getDevelopers } from "../api/developer";
import { getDeviconSrc } from "../utils/devicon";

function DeveloperExplorer() {
  const [developer, setDeveloper] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [demoDevelopers, setDemoDevelopers] = useState([]);

  useEffect(() => {
    getDevelopers()
      .then((data) => setDemoDevelopers(data))
      .catch(() => {});
  }, []);

  function handleQuickPick(name) {
    setDeveloper(name);
  }

  async function handleExplore(e) {
    e.preventDefault();

    if (!developer.trim()) return;

    try {
      setLoading(true);
      setError("");
      setTechnologies([]);
      setRole("");

      const data = await getDeveloperTechnologies(developer);
      setTechnologies(data.technologies);
      setRole(data.role);
    } catch (err) {
      console.error(err);
      setError("Failed to load developer data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold sm:text-xl">
        Explore Developer
      </h2>

      <form
        onSubmit={handleExplore}
        className="mt-4 flex flex-col gap-3 sm:flex-row"
      >
        <input
          value={developer}
          onChange={(e) => setDeveloper(e.target.value)}
          placeholder="Enter developer name..."
          disabled={loading}
          className="flex-1 rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-5 py-2 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          )}
          {loading ? "Searching..." : "Explore"}
        </button>
      </form>

      {demoDevelopers.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-gray-300">
            Try a developer
          </p>
          <div className="flex flex-wrap gap-2">
            {demoDevelopers.map((name) => (
              <button
                key={name}
                onClick={() => handleQuickPick(name)}
                className="cursor-pointer rounded-full border border-gray-100 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="mt-4 space-y-2">
          <div className="h-3 w-1/3 animate-pulse rounded bg-gray-200" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-7 w-20 animate-pulse rounded-md bg-gray-200" />
            ))}
          </div>
        </div>
      )}

      {error && (
        <p className="mt-4 text-red-500">
          {error}
        </p>
      )}

      {!loading && !error && technologies.length > 0 && (
        <div className="mt-6">
          <h3 className="font-medium">
            {developer.trim()}
          </h3>
          <p className="text-xs text-gray-400">{role}</p>

          <p className="mt-4 mb-2 text-[11px] font-semibold uppercase tracking-widest text-gray-300">
            Technologies worked with
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <span
                key={technology.name}
                className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-3 py-1 text-sm"
              >
                <img src={getDeviconSrc(technology.name)} alt={technology.name} className="h-4 w-4" />
                {technology.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default DeveloperExplorer;
