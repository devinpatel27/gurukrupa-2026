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

const MAX_PRICE = 50000

const PRICE_RANGES = [
    { label: 'All Prices', min: 0, max: MAX_PRICE },
    { label: 'Under ₹5,000', min: 0, max: 5000 },
    { label: '₹5k - ₹15k', min: 5000, max: 15000 },
    { label: '₹15k - ₹25k', min: 15000, max: 25000 },
    { label: 'Above ₹25k', min: 25000, max: MAX_PRICE },
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

        if (filters.sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price)
        if (filters.sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price)

        return result
    }, [filters])

    const activeFilterCount = [
        filters.category !== 'All',
        filters.minPrice > 0 || filters.maxPrice < MAX_PRICE,
        filters.tags.length > 0,
        filters.search !== '',
    ].filter(Boolean).length

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-24">
            {/* Premium Header */}
            <div className="bg-white border-b border-gray-100 pt-16 pb-12 mb-8">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-[#0D3B50] mb-4 tracking-tight">
                        Our <span className="text-gradient">Collections</span>
                    </h1>
                    <p className="text-gray-500 max-w-xl mx-auto font-medium">
                        Explore our wide range of premium water purifiers, softeners, and dispensers designed for your family's health.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4">
                {/* Search + Action Bar */}
                <div className="glass p-4 rounded-[2rem] border border-white/50 shadow-xl mb-10 flex flex-col md:flex-row gap-4 items-center">
                    {/* Search */}
                    <div className="flex-1 w-full relative group">
                        <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#035797] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Find your perfect purifier..."
                            value={filters.search}
                            onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
                            className="w-full pl-14 pr-6 py-4 bg-white/50 border-2 border-transparent rounded-2xl text-base focus:outline-none focus:border-[#035797]/20 focus:bg-white transition-all font-medium"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        {/* Filter Toggle (Mobile) */}
                        <button
                            onClick={() => setDrawerOpen(true)}
                            className="lg:hidden relative flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white rounded-2xl text-sm font-bold text-[#0D3B50] shadow-sm hover:bg-gray-50 transition-all border border-gray-100"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0014 13.828V20l-4-2v-4.172a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z" />
                            </svg>
                            Filters
                            {activeFilterCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#f97316] text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>

                        {/* Sort Dropdown */}
                        <div className="relative flex-1 md:w-56 group">
                            <select
                                value={filters.sort}
                                onChange={e => setFilters(f => ({ ...f, sort: e.target.value as FilterState['sort'] }))}
                                className="w-full appearance-none px-6 py-4 bg-white rounded-2xl text-sm font-bold text-[#0D3B50] focus:outline-none border border-gray-100 shadow-sm cursor-pointer hover:bg-gray-50 transition-all"
                            >
                                {SORT_OPTIONS.map(o => (
                                    <option key={o.value} value={o.value}>{o.label}</option>
                                ))}
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Quick Pills */}
                <div className="flex flex-col gap-6 mb-12">
                    {/* Categories */}
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-black text-[#0D3B50]/40 uppercase tracking-widest hidden sm:block">Category</span>
                        <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
                            {(['All', 'RO', 'Tabletop Filters', 'Dispensers', 'Softeners'] as Category[]).map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilters(f => ({ ...f, category: cat }))}
                                    className={`flex-none px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${filters.category === cat
                                        ? 'bg-[#035797] text-white shadow-lg shadow-blue-900/20'
                                        : 'bg-white text-gray-600 hover:bg-[#035797]/5 border border-gray-100'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-black text-[#0D3B50]/40 uppercase tracking-widest hidden sm:block">Budget</span>
                        <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
                            {PRICE_RANGES.map(range => (
                                <button
                                    key={range.label}
                                    onClick={() => setFilters(f => ({ ...f, minPrice: range.min, maxPrice: range.max }))}
                                    className={`flex-none px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${activePriceRangeLabel === range.label
                                        ? 'border-[#035797] text-[#035797] bg-[#035797]/5'
                                        : 'bg-white border-gray-100 text-gray-600 hover:border-[#035797]/30'
                                        }`}
                                >
                                    {range.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Grid Layout */}
                <div className="flex gap-8">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-72 shrink-0">
                        <div className="sticky top-28">
                            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                                <FilterSidebar
                                    filters={filters}
                                    onFilterChange={setFilters}
                                    allTags={allTags}
                                />
                            </div>

                            {/* Promo Card in Sidebar */}
                            <div className="mt-8 bg-gradient-to-br from-[#0D3B50] to-[#035797] rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                                <h4 className="text-lg font-bold mb-3 relative z-10">Free Water Test</h4>
                                <p className="text-sm text-blue-100/70 mb-6 leading-relaxed relative z-10">Get a professional TDS check done at your home for free.</p>
                                <a href="tel:+918866138815" className="inline-block bg-white text-[#0D3B50] font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-[#f97316] hover:text-white transition-all relative z-10">Book Now</a>
                            </div>
                        </div>
                    </aside>

                    {/* Results Area */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-lg font-bold text-[#0D3B50]">
                                Showing {filtered.length} Results
                            </h2>
                            <div className="h-px bg-gray-100 flex-1 mx-6"></div>
                        </div>

                        {filtered.length === 0 ? (
                            <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-gray-100">
                                <div className="text-6xl mb-6">🏜️</div>
                                <h3 className="text-2xl font-black text-[#0D3B50] mb-3">No models match your search</h3>
                                <p className="text-gray-500 mb-8 max-w-sm mx-auto font-medium">Try broadening your filters or search for something else like "RO" or "Kent".</p>
                                <button
                                    onClick={() => setFilters({ category: 'All', minPrice: 0, maxPrice: MAX_PRICE, tags: [], search: '', sort: 'default' })}
                                    className="bg-[#035797] text-white font-bold px-10 py-4 rounded-2xl hover:bg-[#024e89] transition-all shadow-xl shadow-blue-900/20"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {filtered.map((product, idx) => (
                                    <div key={product.id} className="opacity-0 animate-fadeInUp" style={{ animationDelay: `${idx * 0.05}s` }}>
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar (Drawer) */}
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
            <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#035797]/20 border-t-[#035797] rounded-full animate-spin"></div>
                    <p className="text-[#0D3B50] font-bold animate-pulse">Filtering Results...</p>
                </div>
            </div>
        }>
            <ProductsContent />
        </Suspense>
    )
}
