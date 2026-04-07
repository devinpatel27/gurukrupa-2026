import type { Category, FilterState } from '@/types'

interface FilterSidebarProps {
    filters: FilterState
    onFilterChange: (filters: FilterState) => void
    allTags: string[]
}

const CATEGORIES: Category[] = ['All', 'RO', 'Tabletop Filters', 'Dispensers', 'Softeners']
const MAX_PRICE = 50000

export default function FilterSidebar({ filters, onFilterChange, allTags }: FilterSidebarProps) {
    const update = (partial: Partial<FilterState>) =>
        onFilterChange({ ...filters, ...partial })

    const toggleTag = (tag: string) => {
        const tags = filters.tags.includes(tag)
            ? filters.tags.filter(t => t !== tag)
            : [...filters.tags, tag]
        update({ tags })
    }

    const clearFilters = () => {
        onFilterChange({
            category: 'All',
            minPrice: 0,
            maxPrice: MAX_PRICE,
            tags: [],
            search: filters.search,
            sort: 'default',
        })
    }

    const hasActiveFilters =
        filters.category !== 'All' ||
        filters.minPrice > 0 ||
        filters.maxPrice < MAX_PRICE ||
        filters.tags.length > 0

    return (
        <aside className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-gray-900">Filters</h2>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Clear all
                    </button>
                )}
            </div>

            {/* Category */}
            <div>
                <h3 className="text-xs font-black text-[#0D3B50]/40 uppercase tracking-widest mb-4">Category</h3>
                <div className="space-y-2">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => update({ category: cat })}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${filters.category === cat
                                ? 'bg-[#035797] text-white shadow-lg shadow-blue-900/20'
                                : 'text-gray-600 hover:bg-[#035797]/5 hover:text-[#035797] border border-transparent'
                                }`}
                        >
                            <span>{cat === 'All' ? 'All Products' : cat}</span>
                            {filters.category === cat && (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Price Range</h3>
                <div className="flex justify-between text-xs text-gray-500 mb-3">
                    <span>₹{filters.minPrice.toLocaleString('en-IN')}</span>
                    <span>₹{filters.maxPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="space-y-3">
                    <input
                        type="range"
                        min={0}
                        max={MAX_PRICE}
                        step={500}
                        value={filters.minPrice}
                        onChange={e => update({ minPrice: Math.min(Number(e.target.value), filters.maxPrice - 500) })}
                        className="w-full"
                    />
                    <input
                        type="range"
                        min={0}
                        max={MAX_PRICE}
                        step={500}
                        value={filters.maxPrice}
                        onChange={e => update({ maxPrice: Math.max(Number(e.target.value), filters.minPrice + 500) })}
                        className="w-full"
                    />
                </div>
                <div className="flex gap-2 mt-3">
                    <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700 border border-gray-200">
                        Min: <strong>₹{filters.minPrice.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700 border border-gray-200">
                        Max: <strong>₹{filters.maxPrice.toLocaleString('en-IN')}</strong>
                    </div>
                </div>
            </div>

            {/* Tags */}
            {allTags.length > 0 && (
                <div className="pt-4 border-t border-gray-50">
                    <h3 className="text-xs font-black text-[#0D3B50]/40 uppercase tracking-widest mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filters.tags.includes(tag)
                                    ? 'bg-[#035797] text-white shadow-lg shadow-blue-900/20'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </aside>
    )
}
