import { useState } from 'react'
import { Filter, Sparkles } from 'lucide-react'

const categories = [
  'All',
  'Structural',
  'Civil',
  'Geotechnical',
  'New Enquiry',
  'Other',
]

function CategoryFilters({ active, onChange, onRefresh }) {
  const [loading, setLoading] = useState(false)

  const handleRefresh = async () => {
    try {
      setLoading(true)
      await onRefresh?.()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 text-gray-500"><Filter className="w-4 h-4"/> Categories:</div>
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`px-3 py-1.5 rounded-full text-sm border transition-all ${active === c ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 hover:border-blue-300 border-gray-200'}`}
        >
          {c}
        </button>
      ))}
      <button onClick={handleRefresh} className="ml-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-purple-600 text-white text-sm hover:bg-purple-700 disabled:opacity-60">
        <Sparkles className="w-4 h-4"/>
        {loading ? 'Refreshing...' : 'Refresh'}
      </button>
    </div>
  )
}

export default CategoryFilters