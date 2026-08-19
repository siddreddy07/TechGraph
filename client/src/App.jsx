import TechnologySearch from './components/TechnologySearch'
import TechnologyDetails from './components/TechnologyDetails'
import ConnectionGraph from './components/ConnectionGraph'
import DeveloperExplorer from './components/DeveloperExplorer'
import { useState } from 'react'
import { getProjectsByTechnology, getRelatedTechnologies } from './api/technology'

const App = () => {

  const [technologyData, setTechnologyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(search) {
    if (!search.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const [projectsData, relatedData] = await Promise.all([
        getProjectsByTechnology(search),
        getRelatedTechnologies(search),
      ]);
      setTechnologyData({
        technology: search,
        projects: projectsData.projects,
        related: relatedData.relatedTechnologies,
      });
    } catch (err) {
      console.error(err);
      setTechnologyData(null);
      setError("Failed to fetch technology data. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <h1 className="text-lg font-semibold tracking-tight">
            TechGraph
          </h1>
          <p className="hidden text-sm text-gray-500 sm:block">
            Explore how technologies and projects are connected.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        <TechnologySearch onSearch={handleSearch} loading={loading} />

        <DeveloperExplorer />

        <div className="grid gap-6 lg:grid-cols-2">
          <TechnologyDetails 
          technology={technologyData?.technology}
  projects={technologyData?.projects || []}
  related={technologyData?.related || []}
  loading={loading}
  error={error}
          />
          <ConnectionGraph />
        </div>
      </main>
    </div>
  )
}

export default App
