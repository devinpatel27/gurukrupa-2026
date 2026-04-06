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
    return Math.round(((original - current) / original) * 100)
}

// Not using category colors in new design, but keeping for fallback if needed

export default function ProductCard({ product }: ProductCardProps) {
    const discount = getDiscountPercent(product.originalPrice, product.price)

    return (
        <Link
            href={`/products/${product.slug}`}
            className="group block bg-[#f4f6f8] rounded-[2rem] relative overflow-hidden transition-transform duration-300 hover:-translate-y-2 p-6 flex flex-col items-center text-center h-full"
        >
            {/* Discount Badge (Top Right) */}
            {discount > 0 && (
                <div className="absolute top-6 right-6 w-8 h-8 bg-[#e11d48] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md z-10">
                    -{discount}%
                </div>
            )}

            {/* Image (Centered, mix-blend) */}
            <div className="relative w-full aspect-square mb-6">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
            </div>

            {/* 5 Stars */}
            <div className="flex items-center justify-center gap-0.5 text-[#fbbf24] mb-3">
                {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-[#0D3B50] mb-2 leading-tight">
                {product.name}
            </h3>

            {/* Generic Description (from reference UI) */}
            <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed mb-4 max-w-[200px]">
                {product.description || "Clean drinking water should be available to everyone. We work to make it possible."}
            </p>

            {/* Price block */}
            <div className="flex items-end justify-center gap-2 mt-auto pt-2">
                {product.originalPrice > product.price && (
                    <span className="text-sm font-medium text-gray-400 line-through decoration-gray-300">
                        {formatPrice(product.originalPrice)}
                    </span>
                )}
                <span className="text-lg sm:text-xl font-bold text-[#e11d48]">
                    {formatPrice(product.price)}
                </span>
            </div>
        </Link>
    )
}
