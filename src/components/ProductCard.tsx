'use client'

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

    const handleWhatsAppClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const link = typeof window !== 'undefined' ? `${window.location.origin}/products/${product.slug}` : '';
        const msg = encodeURIComponent(`Hello! I'm interested in *${product.name}*.\nPrice: ${formatPrice(product.price)}\nLink: ${link}\nPlease provide more details.`);
        window.open(`https://wa.me/918866138815?text=${msg}`, '_blank');
    };

    return (
        <div className="group bg-white rounded-[2rem] border border-gray-100 relative overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-900/10 p-6 flex flex-col h-full">
            {/* Top Badge (Featured/New) */}
            {product.tags.includes('featured') && (
                <div className="absolute top-6 left-6 z-10 pointer-events-none">
                    <span className="bg-[#035797]/10 text-[#035797] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                        Featured
                    </span>
                </div>
            )}

            {/* Discount Badge */}
            {discount > 0 && (
                <div className="absolute top-6 right-6 w-10 h-10 bg-red-600 text-white text-[11px] font-black rounded-full flex items-center justify-center shadow-lg z-10 group-hover:scale-110 transition-transform pointer-events-none">
                    -{discount}%
                </div>
            )}

            <Link href={`/products/${product.slug}`} className="flex-1 flex flex-col">
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
                </div>
            </Link>

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
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleWhatsAppClick}
                        className="w-10 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all z-10 shadow-sm"
                        title="Inquire on WhatsApp"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                    </button>
                    <Link href={`/products/${product.slug}`} className="w-10 h-10 rounded-xl bg-gray-50 text-[#0D3B50] flex items-center justify-center group-hover:bg-[#035797] group-hover:text-white transition-all z-10">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}


