'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ImageSliderProps {
    images: string[]
    productName: string
    discount?: number
}

export default function ImageSlider({ images, productName, discount = 0 }: ImageSliderProps) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isZoomed, setIsZoomed] = useState(false)

    // Deduplicate array just in case
    const uniqueImages = Array.from(new Set(images))

    // Close lightbox on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsZoomed(false)
        }
        if (isZoomed) window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isZoomed])

    return (
        <div className="flex flex-col gap-4">
            {/* Large View */}
            <div
                className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 group cursor-zoom-in"
                onClick={() => setIsZoomed(true)}
            >
                <Image
                    src={uniqueImages[activeIndex]}
                    alt={`${productName} view ${activeIndex + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Discount Badge */}
                {discount > 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full z-10">
                        -{discount}% OFF
                    </div>
                )}

                {/* Navigation Arrows (visible on hover/desktop) */}
                {uniqueImages.length > 1 && (
                    <>
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                setActiveIndex(prev => prev === 0 ? uniqueImages.length - 1 : prev - 1)
                            }}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            aria-label="Previous image"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                setActiveIndex(prev => prev === uniqueImages.length - 1 ? 0 : prev + 1)
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            aria-label="Next image"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails Strip */}
            {uniqueImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 border-b border-transparent scrollbar-none">
                    {uniqueImages.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`relative flex-none w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeIndex === idx ? 'border-brand-blue ring-2 ring-brand-blue/20 ring-offset-1' : 'border-gray-200 hover:border-gray-400'
                                }`}
                        >
                            <Image
                                src={img}
                                alt={'thumbnail'}
                                fill
                                className="object-cover"
                                sizes="80px"
                            />
                        </button>
                    ))}
                </div>
            )}
            {/* Lightbox / Zoom Modal */}
            {isZoomed && (
                <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm animate-fadeInUp">
                    <button
                        onClick={() => setIsZoomed(false)}
                        className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-50"
                        aria-label="Close zoom"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="relative w-full max-w-5xl aspect-square sm:aspect-video px-4">
                        <Image
                            src={uniqueImages[activeIndex]}
                            alt={`Zoomed ${productName}`}
                            fill
                            className="object-contain"
                            sizes="100vw"
                            quality={100}
                        />
                    </div>

                    {uniqueImages.length > 1 && (
                        <>
                            <button
                                onClick={() => setActiveIndex(prev => prev === 0 ? uniqueImages.length - 1 : prev - 1)}
                                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                            >
                                <svg className="w-8 h-8 -translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setActiveIndex(prev => prev === uniqueImages.length - 1 ? 0 : prev + 1)}
                                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                            >
                                <svg className="w-8 h-8 translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
