import ImageSlider from '@/components/ImageSlider'
import ProductCard from '@/components/ProductCard'
import ShareButton from '@/components/ShareButton'
import WhatsAppOrderButton from '@/components/WhatsAppOrderButton'
import productsData from '@/data/products.json'
import type { Product } from '@/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const products = productsData as Product[]

interface Props {
    params: { slug: string }
}

function formatPrice(price: number) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(price)
}

function getDiscountPercent(original: number, current: number) {
    if (!original || original <= current) return 0
    return Math.round(((original - current) / original) * 100)
}

const categoryColors: Record<string, string> = {
    RO: 'bg-blue-100 text-blue-700',
    'Tabletop Filters': 'bg-orange-100 text-orange-700',
    Dispensers: 'bg-green-100 text-green-700',
    Softeners: 'bg-purple-100 text-purple-700',
}

export async function generateStaticParams() {
    return products.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
    const product = products.find(p => p.slug === params.slug)
    if (!product) return {}
    return {
        title: `${product.name} — Gurukrupa Water Solutions`,
        description: product.description,
    }
}

export default function ProductDetailPage({ params }: Props) {
    const product = products.find(p => p.slug === params.slug)
    if (!product) notFound()

    const discount = getDiscountPercent(product.originalPrice, product.price)
    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4)

    return (
        <div className="bg-white min-h-screen pb-24">
            {/* Premium Breadcrumb */}
            <div className="bg-[#f8fafc] border-b border-gray-100 py-4">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center gap-3 text-sm font-bold">
                        <Link href="/" className="text-gray-400 hover:text-[#035797] transition-colors">Home</Link>
                        <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                        <Link href="/products" className="text-gray-400 hover:text-[#035797] transition-colors">Catalog</Link>
                        <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-[#0D3B50] truncate max-w-[200px]">{product.name}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 pt-12">
                {/* Product Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    {/* Visual Side */}
                    <div className="relative group">
                        <div className="relative z-10 bg-white rounded-[3rem] p-4 lg:p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-500">
                            <ImageSlider
                                images={product.images || [product.image]}
                                productName={product.name}
                                discount={discount}
                            />
                        </div>
                    </div>

                    {/* Info Side */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm ${categoryColors[product.category] || 'bg-gray-100 text-gray-700'}`}>
                                {product.category}
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 bg-gray-100 px-4 py-1.5 rounded-full">
                                🛡️ {product.warranty}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-black text-[#0D3B50] mb-6 leading-tight tracking-tight">
                            {product.name}
                        </h1>

                        {/* Price Block */}
                        <div className="premium-gradient rounded-[2.5rem] p-8 mb-8 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
                            <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                            <div className="relative z-10">
                                <div className="flex items-baseline gap-4 mb-2">
                                    <span className="text-4xl font-black">
                                        {formatPrice(product.price)}
                                    </span>
                                    {product.originalPrice > product.price && (
                                        <span className="text-xl text-white/50 line-through decoration-white/30 font-bold">
                                            {formatPrice(product.originalPrice)}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <p className="text-sm font-bold text-blue-100">Official Dealer Price</p>
                                    {discount > 0 && (
                                        <span className="bg-white/20 backdrop-blur-md text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider">
                                            Save {formatPrice(product.originalPrice - product.price)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-500 text-lg leading-relaxed  font-medium">
                            {product.description}
                        </p>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 mt-auto border-t border-gray-50 mb-10">
                            <WhatsAppOrderButton product={product} />
                            <a
                                href="tel:+918866138815"
                                className="flex items-center justify-center gap-3 bg-white text-[#0D3B50] font-black px-8 py-5 rounded-[1.5rem] text-lg border-2 border-gray-100 hover:border-[#035797]/30 hover:bg-gray-50 transition-all shadow-lg hover:-translate-y-1"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Service Inquiry
                            </a>
                        </div>

                        {/* Core Features */}
                        {product.features.length > 0 && (
                            <div className="mb-10">
                                <h3 className="text-xs font-black text-[#0D3B50]/40 uppercase tracking-widest mb-6">Key Specifications</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {product.features.map(f => (
                                        <div key={f} className="flex items-center gap-4 bg-[#f8fafc] border border-gray-100 rounded-2xl p-5 group hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all">
                                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#035797] group-hover:bg-[#035797] group-hover:text-white transition-all">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-bold text-[#0D3B50]">{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}



                        <div className="mt-8 flex items-center justify-between gap-4 p-5 bg-[#f8fafc] rounded-2xl border border-dashed border-gray-200">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Share Product</span>
                            <ShareButton name={product.name} />
                        </div>
                    </div>
                </div>

                {/* Related Collection */}
                {relatedProducts.length > 0 && (
                    <div className="pt-24 border-t border-gray-50">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                            <div>
                                <h2 className="text-3xl font-black text-[#0D3B50] mb-3">Similar Models</h2>
                                <p className="text-gray-500 font-medium tracking-tight">Handpicked {product.category} collections for your home.</p>
                            </div>
                            <Link href={`/products?category=${product.category}`} className="text-[#035797] font-black text-sm flex items-center gap-2 group">
                                View Entire Collection
                                <span className="w-8 h-8 rounded-full bg-[#035797]/10 flex items-center justify-center group-hover:bg-[#035797] group-hover:text-white transition-all">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                                </span>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
