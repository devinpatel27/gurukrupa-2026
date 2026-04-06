import ProductCard from '@/components/ProductCard'
import productsData from '@/data/products.json'
import type { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

const products = productsData as Product[]

const categories = [
    {
        name: 'Compact Tabletop Filters',
        slug: 'Tabletop Filters',
        image: '/product-images/tabletop_filter_1775470191344.png',
    },
    {
        name: 'Coolers & Water Dispensers',
        slug: 'Dispensers',
        image: '/product-images/water_dispenser_1775470175127.png',
    },
    {
        name: 'Reverse Osmosis Systems',
        slug: 'Reverse Osmosis',
        image: '/product-images/ro_purifier_1775470141435.png',
    },
    {
        name: 'Replacement Filter Cartridges',
        slug: 'Cartridges',
        image: '/product-images/filter_cartridge_1775470221849.png',
    },
]

const featuredProducts = products.filter(p => p.tags.includes('featured') || p.tags.includes('bestseller')).slice(0, 4)

export default function HomePage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-[#f0f7f9] to-[#ffffff] opacity-0 animate-fadeInUp pt-12 pb-16 sm:py-20 lg:py-24 border-b border-[#bfd6ed]">
                <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-[#035797]/10 text-[#035797] text-sm font-bold px-4 py-1.5 rounded-full mb-6">
                            <span className="w-2 h-2 rounded-full bg-[#f97316] inline-block animate-pulse"></span>
                            Trusted by 500+ Families
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 text-[#0D3B50] tracking-tight">
                            Smart Water <br className="hidden md:block" />
                            Solutions for <br className="hidden md:block" />
                            <span className="text-[#035797]">Modern Homes</span>
                        </h1>
                        <p className="text-gray-600 text-lg sm:text-xl mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
                            We provide top-rated RO Purifiers, Geysers, and Solar Water Heaters backed by expert installation across Gujarat.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                            <Link
                                href="/products"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#035797] text-white font-bold px-8 py-4 rounded-xl text-base hover:bg-[#024e89] transition-all shadow-xl shadow-blue-900/20"
                            >
                                Explore Products
                            </Link>
                            <a
                                href="https://wa.me/918866138815"
                                target="_blank" rel="noopener noreferrer"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#0D3B50] font-bold px-8 py-4 rounded-xl border border-gray-200 text-base hover:bg-gray-50 transition-colors"
                            >
                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                                </svg>
                                WhatsApp Us
                            </a>
                        </div>
                    </div>
                    <div className="flex-1 hidden md:block relative">
                        {/* Visual element for hero right side */}
                        <div className="relative w-full aspect-square max-w-md mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#035797] to-[#0D3B50] rounded-full blur-3xl opacity-20"></div>
                            <Image
                                src="/product-images/ro_purifier_1775470141435.png"
                                alt="Premium Water Purifier"
                                fill
                                className="object-contain p-8 rounded-[2rem] shadow-2xl relative z-10 mix-blend-multiply"
                                priority
                            />
                            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-4">
                                <div className="bg-green-100 p-2 rounded-full text-2xl">💧</div>
                                <div>
                                    <div className="font-bold text-[#0D3B50]">100% Pure</div>
                                    <div className="text-xs text-gray-500">Advanced RO Technology</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="py-12 bg-white border-y border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {[
                            { icon: '⭐', title: 'Top Rated', desc: '4.9/5 from customers' },
                            { icon: '🛡️', title: 'Authentic', desc: '100% genuine products' },
                            { icon: '⚡', title: 'Fast Setup', desc: 'Quick home installation' },
                            { icon: '📞', title: 'Support', desc: 'Dedicated after-sales' },
                        ].map(b => (
                            <div key={b.title} className="flex flex-col items-center">
                                <div className="text-3xl mb-2 bg-[#e6f0f8] w-12 h-12 rounded-full flex items-center justify-center">{b.icon}</div>
                                <h3 className="font-bold text-[#0D3B50] text-sm md:text-base">{b.title}</h3>
                                <p className="text-xs text-gray-500">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modern Categories (Waterly Style) */}
            <section className="max-w-6xl mx-auto px-4 py-16 md:py-20 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map(cat => (
                        <Link
                            key={cat.slug}
                            href={`/products?category=${cat.slug}`}
                            className="group relative flex flex-col bg-[#f0f3f5] rounded-[2rem] overflow-hidden aspect-[4/5] hover:-translate-y-2 transition-transform duration-500 shadow-sm"
                        >
                            <div className="flex-1 w-full relative p-8">
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-contain p-8 mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6 pt-0 flex items-end justify-between z-10 w-full">
                                <h3 className="text-[#0a2530] font-bold text-lg md:text-xl leading-tight max-w-[80%] pr-4 shadow-white" style={{ textShadow: '0 2px 10px rgba(255,255,255,0.7)' }}>
                                    {cat.name}
                                </h3>
                                <div className="w-8 h-8 rounded-full bg-[#dc2626] text-white flex flex-shrink-0 items-center justify-center transform group-hover:bg-[#b91c1c] transition-colors shadow-md">
                                    <svg className="w-4 h-4 translate-x-px" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20 bg-gray-50 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div>
                            <h2 className="text-3xl font-extrabold text-[#0D3B50] mb-3">Featured Picks</h2>
                            <p className="text-gray-500 text-lg">Our best-selling and highest rated products</p>
                        </div>
                        <Link href="/products" className="inline-flex items-center gap-1.5 text-[#035797] font-bold hover:text-[#024e89] transition-colors">
                            View All Catalog
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Grand CTA Banner */}
            <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
                <div className="relative overflow-hidden rounded-[2rem] bg-[#0D3B50]">
                    <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#035797]/20 origin-left skew-x-[-20deg]"></div>
                    <div className="relative z-10 px-6 py-12 md:py-16 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                        <div className="max-w-xl">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                                Need Help Choosing the Right Product?
                            </h2>
                            <p className="text-blue-100 text-lg mb-0">
                                Our experts will guide you to find the exact match for your home size, water quality, and budget.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
                            <a
                                href="tel:+918866138815"
                                className="inline-flex items-center justify-center gap-2 bg-[#f97316] text-white font-bold px-8 py-4 rounded-xl text-base hover:bg-orange-600 transition-colors shadow-lg"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Call +91 88661 38815
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
