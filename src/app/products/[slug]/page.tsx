import ImageSlider from '@/components/ImageSlider'
import ProductCard from '@/components/ProductCard'
import ShareButton from '@/components/ShareButton'
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
    return Math.round(((original - current) / original) * 100)
}

const categoryColors: Record<string, string> = {
    RO: 'bg-blue-100 text-blue-700',
    Geyser: 'bg-orange-100 text-orange-700',
    Solar: 'bg-green-100 text-green-700',
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

    const whatsappMsg = encodeURIComponent(
        `Hello! I'm interested in *${product.name}* priced at ${formatPrice(product.price)}. Can you please provide more details?`
    )

    return (
        <div>
            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-blue-700">Home</Link>
                        <span>/</span>
                        <Link href="/products" className="hover:text-blue-700">Products</Link>
                        <span>/</span>
                        <Link href={`/products?category=${product.category}`} className="hover:text-blue-700">{product.category}</Link>
                        <span>/</span>
                        <span className="text-gray-800 font-medium truncate max-w-[140px]">{product.name}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-6">
                {/* Product Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-10">
                    {/* Image Slider */}
                    <div className="relative">
                        <ImageSlider
                            images={product.images || [
                                product.image,
                                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
                                "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80"
                            ]}
                            productName={product.name}
                            discount={discount}
                        />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col">
                        {/* Category + Warranty */}
                        <div className="flex items-center gap-2 mb-3">
                            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${categoryColors[product.category] || 'bg-gray-100 text-gray-700'}`}>
                                {product.category}
                            </span>
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                🛡️ {product.warranty} Warranty
                            </span>
                        </div>

                        {/* Name */}
                        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug mb-4">
                            {product.name}
                        </h1>

                        {/* Price */}
                        <div className="bg-blue-50 rounded-2xl p-4 mb-5">
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-extrabold text-blue-700">
                                    {formatPrice(product.price)}
                                </span>
                                {product.originalPrice > product.price && (
                                    <span className="text-lg text-gray-400 line-through">
                                        {formatPrice(product.originalPrice)}
                                    </span>
                                )}
                                {discount > 0 && (
                                    <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                                        Save {formatPrice(product.originalPrice - product.price)}
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-base leading-relaxed mb-5">
                            {product.description}
                        </p>

                        {/* Key Features */}
                        {product.features.length > 0 && (
                            <div className="mb-5">
                                <h3 className="text-sm font-bold text-gray-700 mb-2.5">Key Features</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {product.features.map(f => (
                                        <div key={f} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 text-sm text-gray-700">
                                            <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tags */}
                        {product.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {product.tags.map(tag => (
                                    <span key={tag} className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* CTA Buttons */}
                        <div className="grid grid-cols-2 gap-3 mt-auto">
                            <a
                                href={`https://wa.me/918866138815?text=${whatsappMsg}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-green-500 text-white font-bold px-4 py-4 rounded-2xl text-base hover:bg-green-600 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                WhatsApp
                            </a>
                            <a
                                href="tel:+918866138815"
                                className="flex items-center justify-center gap-2 bg-orange-500 text-white font-bold px-4 py-4 rounded-2xl text-base hover:bg-orange-600 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Call Now
                            </a>
                        </div>

                        {/* Share Link */}
                        <div className="mt-4 p-3 bg-gray-50 rounded-xl flex items-center justify-between gap-2">
                            <span className="text-sm text-gray-500 truncate">Share this product</span>
                            <ShareButton name={product.name} />
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-xl font-bold text-gray-900">More {product.category} Products</h2>
                            <Link href={`/products?category=${product.category}`} className="text-blue-700 font-semibold text-sm hover:text-blue-800">
                                View all →
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
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
