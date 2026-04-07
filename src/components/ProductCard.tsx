import type { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
    product: Product
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

export default function ProductCard({ product }: ProductCardProps) {
    const discount = getDiscountPercent(product.originalPrice, product.price)

    return (
        <Link
            href={`/products/${product.slug}`}
            className="group block bg-white rounded-[2rem] border border-gray-100 relative overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-900/10 p-6 flex flex-col h-full"
        >
            {/* Top Badge (Featured/New) */}
            {product.tags.includes('featured') && (
                <div className="absolute top-6 left-6 z-10">
                    <span className="bg-[#035797]/10 text-[#035797] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                        Featured
                    </span>
                </div>
            )}

            {/* Discount Badge */}
            {discount > 0 && (
                <div className="absolute top-6 right-6 w-10 h-10 bg-red-600 text-white text-[11px] font-black rounded-full flex items-center justify-center shadow-lg z-10 group-hover:scale-110 transition-transform">
                    -{discount}%
                </div>
            )}

            {/* Image Section */}
            <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-2xl bg-[#f8fafc]">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1">
                <div className="flex items-center gap-0.5 text-yellow-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                    ))}
                    <span className="text-[10px] text-gray-400 font-bold ml-1">(4.9)</span>
                </div>

                <h3 className="text-lg font-extrabold text-[#0D3B50] mb-2 leading-tight group-hover:text-[#035797] transition-colors">
                    {product.name}
                </h3>

                <p className="text-xs text-gray-500 leading-relaxed mb-6 line-clamp-2 font-medium">
                    {product.description}
                </p>

                {/* Price Section */}
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex flex-col">
                        {product.originalPrice > product.price && (
                            <span className="text-[11px] font-bold text-gray-400 line-through">
                                {formatPrice(product.originalPrice)}
                            </span>
                        )}
                        <span className="text-xl font-black text-[#035797]">
                            {formatPrice(product.price)}
                        </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gray-50 text-[#0D3B50] flex items-center justify-center group-hover:bg-[#035797] group-hover:text-white transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    )
}
