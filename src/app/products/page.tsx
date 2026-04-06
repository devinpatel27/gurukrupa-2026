'use client'

import FilterDrawer from '@/components/FilterDrawer'
import FilterSidebar from '@/components/FilterSidebar'
import ProductCard from '@/components/ProductCard'
import productsData from '@/data/products.json'
import type { Category, FilterState, Product } from '@/types'
import { useSearchParams } from 'next/navigation'
import { Suspense, useMemo, useState } from 'react'

const products = productsData as Product[]

const allTags = Array.from(new Set(products.flatMap(p => p.tags))).sort()

const MAX_PRICE = 40000

const PRICE_RANGES = [
    { label: 'Any Price', min: 0, max: MAX_PRICE },
    { label: 'Under ₹4,000', min: 0, max: 4000 },
    { label: '₹4,000 - ₹5,000', min: 4000, max: 5000 },
    { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
    { label: '₹10,000 - ₹20,000', min: 10000, max: 20000 },
    { label: 'Above ₹20,000', min: 20000, max: MAX_PRICE },
]

const SORT_OPTIONS = [
    { value: 'default', label: 'Relevance' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
]

function ProductsContent() {
    const searchParams = useSearchParams()
    const initialCategory = (searchParams.get('category') as Category) || 'All'

    const [filters, setFilters] = useState<FilterState>({
        category: initialCategory,
        minPrice: 0,
        maxPrice: MAX_PRICE,
        tags: [],
        search: '',
        sort: 'default',
    })
    const [drawerOpen, setDrawerOpen] = useState(false)

    // Determine current active price range button
    const activePriceRangeLabel = PRICE_RANGES.find(
        r => r.min === filters.minPrice && r.max === filters.maxPrice
    )?.label || 'Custom'

    const filtered = useMemo(() => {
        let result = products.filter(p => {
            if (filters.category !== 'All' && p.category !== filters.category) return false
            if (p.price < filters.minPrice || p.price > filters.maxPrice) return false
            if (filters.tags.length > 0 && !filters.tags.some(t => p.tags.includes(t))) return false
            if (filters.search) {
                const q = filters.search.toLowerCase()
                if (!p.name.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q)) return false
            }
            return true
        })

        if (filters.sort === 'price-asc') result = result.sort((a, b) => a.price - b.price)
        if (filters.sort === 'price-desc') result = result.sort((a, b) => b.price - a.price)

        return result
    }, [filters])

    const activeFilterCount = [
        filters.category !== 'All',
        filters.minPrice > 0 || filters.maxPrice < MAX_PRICE,
        filters.tags.length > 0,
    ].filter(Boolean).length

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-extrabold text-gray-900">
                    {filters.category === 'All' ? 'All Products' : `${filters.category} Products`}
                </h1>
                <p className="text-gray-500 text-sm mt-1">{filtered.length} products found</p>
            </div>

            {/* Search + Sort Bar (mobile top bar) */}
            <div className="flex gap-3 mb-5">
                {/* Search */}
                <div className="flex-1 relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={filters.search}
                        onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
                        className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                </div>

                {/* Filter Button (mobile only) */}
                <button
                    onClick={() => setDrawerOpen(true)}
                    className="lg:hidden relative flex-none flex items-center gap-2 px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-blue-400 hover:text-blue-700 transition-colors bg-white"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0014 13.828V20l-4-2v-4.172a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z" />
                    </svg>
                    Filters
                    {activeFilterCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 bg-blue-700 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                            {activeFilterCount}
                        </span>
                    )}
                </button>

                {/* Sort (desktop) */}
                <select
                    value={filters.sort}
                    onChange={e => setFilters(f => ({ ...f, sort: e.target.value as FilterState['sort'] }))}
                    className="hidden sm:block flex-none px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                    {SORT_OPTIONS.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                </select>
            </div>

            {/* Sort (mobile) */}
            <div className="sm:hidden mb-4">
                <select
                    value={filters.sort}
                    onChange={e => setFilters(f => ({ ...f, sort: e.target.value as FilterState['sort'] }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                    {SORT_OPTIONS.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                </select>
            </div>

            {/* Category Pills (quick filter) */}
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 mb-5 scrollbar-none">
                {(['All', 'RO', 'Geyser', 'Solar'] as Category[]).map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilters(f => ({ ...f, category: cat }))}
                        className={`flex-none px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${filters.category === cat
                            ? 'bg-blue-700 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                            }`}
                    >
                        {cat === 'All' ? 'All' : cat}
                    </button>
                ))}
            </div>

            {/* Price Tags (quick filter) */}
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 mb-5 scrollbar-none">
                {PRICE_RANGES.map(range => (
                    <button
                        key={range.label}
                        onClick={() => setFilters(f => ({ ...f, minPrice: range.min, maxPrice: range.max }))}
                        className={`flex-none px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors border-2 ${activePriceRangeLabel === range.label
                            ? 'bg-white border-brand-blue text-brand-blue'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-brand-blue hover:text-brand-blue'
                            }`}
                    >
                        {range.label}
                    </button>
                ))}
            </div>

            {/* Layout: Sidebar + Grid */}
            <div className="flex gap-6">
                {/* Desktop Sidebar */}
                <div className="hidden lg:block w-64 flex-none">
                    <FilterSidebar
                        filters={filters}
                        onFilterChange={setFilters}
                        allTags={allTags}
                    />
                </div>

                {/* Product Grid */}
                <div className="flex-1 min-w-0">
                    {filtered.length === 0 ? (
                        <div key={`${filtered.length}-${filters.search}-${filters.category}-${filters.maxPrice}`} className="text-center py-16 opacity-0 animate-fadeInUp">
                            <div className="text-5xl mb-4">🔍</div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">No products found</h3>
                            <p className="text-gray-500 mb-4">Try adjusting your filters or search term.</p>
                            <button
                                onClick={() => setFilters({ category: 'All', minPrice: 0, maxPrice: MAX_PRICE, tags: [], search: '', sort: 'default' })}
                                className="btn-primary"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                            {filtered.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Filter Drawer */}
            <FilterDrawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                filters={filters}
                onFilterChange={setFilters}
                allTags={allTags}
            />
        </div>
    )
}

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <div className="max-w-6xl mx-auto px-4 py-12 text-center">
                <div className="text-gray-400">Loading products...</div>
            </div>
        }>
            <ProductsContent />
        </Suspense>
    )
}
