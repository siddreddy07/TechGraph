import { getDeviconSrc } from "../utils/devicon";

function TechnologyDetails({
  technology,
  projects,
  related,
  loading,
  error,
}) {
  return (
    <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-300">
        Technology Details
      </h2>

      {loading && (
        <div className="mt-5 space-y-5">
          <div className="h-6 w-28 animate-pulse rounded-md bg-gray-100" />
          <div className="space-y-2.5">
            <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 w-full animate-pulse rounded-lg bg-gray-50" />
            ))}
          </div>
          <div className="space-y-2.5">
            <div className="h-3 w-32 animate-pulse rounded bg-gray-100" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 w-16 animate-pulse rounded-md bg-gray-50" />
              ))}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-500">
          {error}
        </div>
      )}

      {!loading && !error && !technology && (
        <div className="mt-10 flex flex-col items-center gap-2 pb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <p className="text-sm text-gray-300">
            Search for a technology to explore its connections.
          </p>
        </div>
      )}

      {!loading && !error && technology && (
        <div className="mt-5 space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50">
              <img src={getDeviconSrc(technology)} alt={technology} className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-gray-900">
              {technology}
            </h3>
          </div>

          <div>
            <h4 className="mb-2.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-300">
              <span className="inline-block h-1 w-1 rounded-full bg-gray-300" />
              Projects
            </h4>

            {projects.length === 0 ? (
              <p className="text-sm text-gray-300">No projects found.</p>
            ) : (
              <ul className="divide-y divide-gray-50 overflow-hidden rounded-xl border border-gray-100">
                {projects.map((project, i) => (
                  <li
                  title={project.description}
                    key={project.name}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gray-100 text-[10px] font-bold text-gray-400">
                      {i + 1}
                    </span>
                    {project.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h4 className="mb-2.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-300">
              <span className="inline-block h-1 w-1 rounded-full bg-gray-300" />
              Related Technologies
            </h4>

            {related.length === 0 ? (
              <p className="text-sm text-gray-300">None found.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {related.map((item) => (
                  <span
                    key={item.name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
                  >
                    <img src={getDeviconSrc(item.name)} alt={item.name} className="h-4 w-4" />
                    {item.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default TechnologyDetails;
