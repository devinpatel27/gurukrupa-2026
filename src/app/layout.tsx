import FloatingWidget from '@/components/FloatingWidget'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

export const metadata: Metadata = {
    title: 'Gurukrupa Water Solutions — RO, Geyser & Solar Water Heaters',
    description:
        'Shop RO water purifiers, gas geysers, and solar water heaters at the best prices. Gurukrupa Water Solutions — trusted dealer in Gujarat.',
    keywords: 'RO purifier, water purifier, gas geyser, solar water heater, Gurukrupa, Gujarat',
    icons: {
        icon: '/favicon.ico',
    },
    openGraph: {
        title: 'Gurukrupa Water Solutions',
        description: 'Your trusted source for RO purifiers, geysers, and solar heaters.',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={inter.variable} suppressHydrationWarning>
            <body className="bg-white text-gray-900 min-h-screen flex flex-col" suppressHydrationWarning>
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <FloatingWidget />
            </body>
        </html>
    )
}
