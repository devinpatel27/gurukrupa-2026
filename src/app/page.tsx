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
        image: '/product-images/kent/imgi_88_kent-gold.webp',
    },
    {
        name: 'Coolers & Water Dispensers',
        slug: 'Dispensers',
        image: '/product-images/kent/imgi_8_kent-perk.webp',
    },
    {
        name: 'Reverse Osmosis Systems',
        slug: 'RO',
        image: '/product-images/kent/imgi_4_kent-grand-star-b.webp',
    },
    {
        name: 'Water Softeners',
        slug: 'Softeners',
        image: '/product-images/kent/imgi_93_kent-washing-machine-water-softener.png',
    },
]

const featuredProducts = products.filter(p => p.tags.includes('featured') || p.tags.includes('bestseller')).slice(0, 4)

const brands = [
    { name: 'Kent', logo: '/product-images/kent/imgi_3_kent-logo.svg' },
    { name: 'Aquaguard', logo: '/logo.svg' }, // Placeholder if specific logo missing
    { name: 'Pureit', logo: '/logo.svg' },
    { name: 'Livpure', logo: '/logo.svg' },
    { name: 'Blue Mount', logo: '/logo.svg' },
]

export default function HomePage() {
    return (
        <main className="min-h-screen selection:bg-[#035797]/30">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f2fe] pt-20 pb-24 lg:pt-32 lg:pb-40 border-b border-[#bfd6ed]/30">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[#035797]/5 -skew-x-12 translate-x-1/4 -z-0"></div>
                <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#035797]/20 text-[#035797] text-sm font-bold px-5 py-2 rounded-full mb-8 shadow-sm">
                            <span className="flex h-2.5 w-2.5 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f97316] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f97316]"></span>
                            </span>
                            ISO 9001:2015 Certified Service
                        </div>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-8 text-[#0D3B50] tracking-tight">
                            Experience <br />
                            The Purity of <br />
                            <span className="text-gradient">Pure Water</span>
                        </h1>
                        <p className="text-gray-600 text-xl mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                            Authorized dealer and service center for premium RO systems. We ensure your family drinks only the safest, mineral-rich water.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
                            <Link
                                href="/products"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#035797] text-white font-bold px-10 py-5 rounded-2xl text-lg hover:bg-[#024e89] transition-all shadow-2xl shadow-blue-900/40 hover:-translate-y-1"
                            >
                                View Catalog
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                            <a
                                href="https://wa.me/918866138815"
                                target="_blank" rel="noopener noreferrer"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-[#0D3B50] font-bold px-10 py-5 rounded-2xl border-2 border-gray-100 text-lg hover:bg-gray-50 transition-all hover:border-[#035797]/20 shadow-lg"
                            >
                                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                                </svg>
                                WhatsApp Us
                            </a>
                        </div>
                    </div>
                    <div className="flex-1 w-full relative">
                        <div className="relative w-full aspect-square max-w-sm lg:max-w-lg mx-auto">
                            <div className="absolute inset-0 bg-[#035797] rounded-[2.5rem] lg:rounded-[3rem] rotate-6 opacity-10 animate-pulse"></div>
                            <div className="absolute inset-0 bg-[#0D3B50] rounded-[2.5rem] lg:rounded-[3rem] -rotate-3 opacity-5"></div>
                            <div className="relative z-10 w-full h-full glass rounded-[2.5rem] lg:rounded-[3rem] p-6 lg:p-12 flex items-center justify-center overflow-hidden group text-center">
                                <Image
                                    src="/product-images/kent/imgi_4_kent-grand-star-b.webp"
                                    alt="Premium Water Purifier"
                                    fill
                                    className="object-contain p-6 lg:p-12 transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                            </div>

                            {/* Floating Badges */}
                            <div className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 glass p-3 lg:p-5 rounded-xl lg:rounded-2xl shadow-2xl z-20 animate-bounce transition-all">
                                <div className="text-xl lg:text-3xl mb-1">🛡️</div>
                                <div className="font-bold text-[#0D3B50] text-[10px] lg:text-sm whitespace-nowrap">4 Year Free</div>
                                <div className="text-[8px] lg:text-[10px] text-gray-500 uppercase tracking-wider font-bold whitespace-nowrap">Service Warranty</div>
                            </div>

                            <div className="absolute -bottom-6 -left-6 lg:-bottom-10 lg:-left-10 glass p-4 lg:p-6 rounded-xl lg:rounded-2xl shadow-2xl z-20 flex items-center gap-2 lg:gap-4 border-l-4 border-[#035797]">
                                <div className="bg-blue-100 p-2 lg:p-3 rounded-full text-lg lg:text-2xl">💧</div>
                                <div>
                                    <div className="font-bold text-[#0D3B50] text-sm lg:text-lg leading-tight whitespace-nowrap">100% Pure</div>
                                    <div className="text-[8px] lg:text-xs text-gray-500 font-medium tracking-wide whitespace-nowrap">Mineral RO Technology</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brands Section (Client Section) */}
            <section className="py-20 bg-white overflow-hidden">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-sm font-bold text-[#035797] uppercase tracking-[0.2em] mb-4">Authorized Service Partners</h2>
                        <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            {brands.map(brand => (
                                <div key={brand.name} className="h-10 w-32 relative group">
                                    <Image
                                        src={brand.logo}
                                        alt={brand.name}
                                        fill
                                        className="object-contain transition-all group-hover:scale-110"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Modern Categories */}
            <section className="max-w-6xl mx-auto px-4 py-24">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-4xl font-extrabold text-[#0D3B50] mb-5 tracking-tight">Our Core Collections</h2>
                        <p className="text-gray-500 text-lg font-medium leading-relaxed">From compact tabletop solutions to high-capacity whole-house systems, we have the perfect fit for your needs.</p>
                    </div>
                    <Link href="/products" className="group inline-flex items-center gap-2 text-[#035797] font-bold text-lg">
                        View Entire Collection
                        <span className="w-8 h-8 rounded-full bg-[#035797]/10 flex items-center justify-center group-hover:bg-[#035797] group-hover:text-white transition-all">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map(cat => (
                        <Link
                            key={cat.slug}
                            href={`/products?category=${cat.slug}`}
                            className="group relative flex flex-col bg-[#f8fafc] rounded-[2.5rem] overflow-hidden aspect-[4/5] hover:-translate-y-3 transition-all duration-700 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10"
                        >
                            <div className="flex-1 w-full relative p-10 overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-contain p-10 transition-all duration-700 group-hover:scale-110 drop-shadow-xl"
                                />
                            </div>
                            <div className="p-8 pt-0 flex items-center justify-between z-10 w-full">
                                <h3 className="text-[#0D3B50] font-bold text-xl leading-snug pr-4">
                                    {cat.name}
                                </h3>
                                <div className="w-12 h-12 rounded-2xl bg-[#035797] text-white flex flex-shrink-0 items-center justify-center transform group-hover:rotate-[360deg] transition-all duration-700 shadow-lg shadow-blue-900/20">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-[#0D3B50] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <svg className="h-full w-full" fill="currentColor">
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>
                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <h2 className="text-[#38bdf8] font-bold uppercase tracking-widest text-sm mb-4">The Gurukrupa Advantage</h2>
                        <h3 className="text-4xl font-extrabold text-white tracking-tight">Why Thousands of Families Trust Us</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: '⭐', title: 'Top Rated Service', desc: '4.9/5 stars from 1000+ happy customers in Ahmedabad & Gandhinagar.' },
                            { icon: '💎', title: 'Genuine Spares', desc: 'We only use 100% authentic Kent & Aquaguard spare parts for long-lasting results.' },
                            { icon: '🚀', title: 'Fast Turnaround', desc: 'Most service requests are handled within 24 hours by our expert technicians.' },
                            { icon: '💰', title: 'Fair Pricing', desc: 'Transparent billing with no hidden costs. Quality service that fits your budget.' },
                            { icon: '📞', title: 'AMC Protection', desc: 'Annual Maintenance Contracts to keep your purifiers running smoothly year-round.' },
                            { icon: '⚡', title: 'Expert Team', desc: 'Our technicians are factory-trained with 10+ years of industry experience.' },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white/5 border border-white/10 p-10 rounded-[2rem] hover:bg-white/10 transition-all group">
                                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                                <h4 className="text-white text-xl font-bold mb-4">{item.title}</h4>
                                <p className="text-blue-100/70 leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-32 bg-[#f8fafc]">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <div className="inline-block bg-[#035797]/10 text-[#035797] px-4 py-1.5 rounded-full text-xs font-bold uppercase mb-4 tracking-wider">Top Sellers</div>
                            <h2 className="text-4xl font-black text-[#0D3B50] mb-4">Featured Picks</h2>
                            <p className="text-gray-500 text-lg font-medium">Our most popular and highest rated models this month.</p>
                        </div>
                        <Link href="/products" className="hidden border-b-2 border-[#035797] pb-1 font-bold text-[#035797] hover:bg-[#035797] hover:text-white transition-all">
                            View All Catalog
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works / Process Section */}
            <section className="py-32 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-extrabold text-[#0D3B50] mb-4 tracking-tight">Our Simple Process</h2>
                        <p className="text-gray-500 text-lg">Four easy steps to pure healthy water for your family.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-[100px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-[#035797]/5 via-[#035797]/20 to-[#035797]/5 -z-0"></div>

                        {[
                            { step: '01', title: 'Choose', desc: 'Select the best model for your needs from our catalog.' },
                            { step: '02', title: 'Consult', desc: 'Our experts guide you based on your water quality.' },
                            { step: '03', title: 'Install', desc: 'Free professional installation by our trained team.' },
                            { step: '04', title: 'Enjoy', desc: 'Drink pure water with lifetime service support.' },
                        ].map((item, idx) => (
                            <div key={idx} className="relative z-10 text-center group">
                                <div className="w-20 h-20 bg-[#035797] text-white rounded-[1.5rem] flex items-center justify-center text-2xl font-black mx-auto mb-8 shadow-xl shadow-blue-900/30 group-hover:rotate-12 transition-all">
                                    {item.step}
                                </div>
                                <h4 className="text-xl font-bold text-[#0D3B50] mb-4">{item.title}</h4>
                                <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Grand CTA Banner */}
            <section className="max-w-6xl mx-auto px-4 py-20 pb-32">
                <div className="relative overflow-hidden rounded-[3rem] premium-gradient group">
                    <div className="absolute right-0 top-0 bottom-0 w-2/3 bg-white/5 origin-left skew-x-[-20deg] group-hover:skew-x-[-25deg] transition-all duration-700"></div>
                    <div className="relative z-10 px-8 py-16 md:py-24 md:px-20 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                                Ready to Pure Your Life?
                            </h2>
                            <p className="text-blue-100 text-xl mb-0 opacity-90 leading-relaxed font-medium">
                                Schedule a free water quality test at your home and get expert recommendations for the best RO system.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-5 w-full lg:w-auto shrink-0">
                            <a
                                href="tel:+918866138815"
                                className="inline-flex items-center justify-center gap-3 bg-[#f97316] text-white font-bold px-12 py-6 rounded-2xl text-lg hover:bg-orange-600 transition-all shadow-2xl hover:-translate-y-1"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                +91 88661 38815
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
