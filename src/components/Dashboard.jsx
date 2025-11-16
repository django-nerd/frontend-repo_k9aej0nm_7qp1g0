import { useEffect, useState, useMemo } from 'react'
import CategoryFilters from './CategoryFilters'
import CallCard from './CallCard'

function Dashboard() {
  const [calls, setCalls] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchCalls = async () => {
    try {
      setLoading(true)
      setError('')
      const url = new URL('/api/calls', baseUrl)
      if (activeCategory !== 'All') {
        url.searchParams.set('category', activeCategory)
      }
      const res = await fetch(url.toString())
      if (!res.ok) throw new Error('Failed to load calls')
      const data = await res.json()
      setCalls(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCalls()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory])

  const empty = !loading && calls.length === 0

  const grouped = useMemo(() => {
    const map = new Map()
    for (const c of calls) {
      const key = c.category || 'Other'
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(c)
    }
    return Array.from(map.entries())
  }, [calls])

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Recent Calls</h2>
      </div>
      <CategoryFilters active={activeCategory} onChange={setActiveCategory} onRefresh={fetchCalls} />

      <div className="mt-6">
        {loading && (
          <div className="text-gray-600">Loading calls...</div>
        )}
        {error && (
          <div className="text-rose-600">{error}</div>
        )}
        {empty && (
          <div className="text-gray-500">No calls in this category yet.</div>
        )}

        {!loading && !empty && (
          <div className="space-y-8">
            {grouped.map(([cat, items]) => (
              <div key={cat}>
                {activeCategory === 'All' && (
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{cat}</h3>
                )}
                <div className="grid md:grid-cols-2 gap-4">
                  {items.map((call) => (
                    <CallCard key={call.id} call={call} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Dashboard
