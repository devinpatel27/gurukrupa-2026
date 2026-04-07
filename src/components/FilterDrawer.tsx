'use client'

import type { Category, FilterState } from '@/types'
import { useEffect } from 'react'

interface FilterDrawerProps {
    isOpen: boolean
    onClose: () => void
    filters: FilterState
    onFilterChange: (filters: FilterState) => void
    allTags: string[]
}

const CATEGORIES: Category[] = ['All', 'RO', 'Tabletop Filters', 'Dispensers', 'Softeners']
const MAX_PRICE = 50000

export default function FilterDrawer({ isOpen, onClose, filters, onFilterChange, allTags }: FilterDrawerProps) {
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

    // Lock body scroll when drawer open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    const hasActiveFilters =
        filters.category !== 'All' ||
        filters.minPrice > 0 ||
        filters.maxPrice < MAX_PRICE ||
        filters.tags.length > 0

    if (!isOpen) return null

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 bg-black/40"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 z-50 w-[85vw] max-w-sm bg-white shadow-2xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl text-gray-500 hover:bg-gray-100"
                        aria-label="Close filters"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
                    {/* Category */}
                    <div>
                        <h3 className="text-xs font-black text-[#0D3B50]/40 uppercase tracking-widest mb-4">Category</h3>
                        <div className="space-y-2">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => update({ category: cat })}
                                    className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold transition-all ${filters.category === cat
                                        ? 'bg-[#035797] text-white shadow-lg shadow-blue-900/20'
                                        : 'text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-[#035797]'
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
                            <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2.5 text-sm text-gray-700 border border-gray-200">
                                Min: <strong>₹{filters.minPrice.toLocaleString('en-IN')}</strong>
                            </div>
                            <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2.5 text-sm text-gray-700 border border-gray-200">
                                Max: <strong>₹{filters.maxPrice.toLocaleString('en-IN')}</strong>
                            </div>
                        </div>
                    </div>

                    {/* Tags */}
                    {allTags.length > 0 && (
                        <div className="pt-6 border-t border-gray-50">
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
                </div>

                {/* Footer Actions */}
                <div className="px-5 py-4 border-t border-gray-100 flex gap-3">
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-base hover:border-gray-300 transition-colors"
                        >
                            Clear
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="flex-[2] py-4 rounded-2xl bg-[#035797] text-white font-bold text-base hover:bg-[#024e89] transition-all shadow-xl shadow-blue-900/20"
                    >
                        Show Results
                    </button>
                </div>
            </div>
        </>
    )
}
