import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Bunyan — AI Construction Intelligence Platform",
    template: "%s | Bunyan",
  },
  description: "Transform construction projects with AI-powered intelligence. Reduce waste by 67%, save costs, optimize procurement, and build sustainably with Bunyan's eco-certified marketplace and recycled materials platform.",
  keywords: [
    "construction AI",
    "sustainable construction",
    "waste reduction",
    "green building",
    "eco materials",
    "construction procurement",
    "recycled materials",
    "building materials Egypt",
    "LEED certification",
    "construction cost optimization",
    "AI bill scanning",
    "construction analytics",
    "carbon footprint reduction",
    "circular economy construction",
    "upcycled building materials"
  ],
  authors: [{ name: "Bunyan Team" }],
  creator: "Bunyan",
  publisher: "Bunyan",
  metadataBase: new URL('https://bunyan.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Bunyan — AI Construction Intelligence Platform",
    description: "Transform construction with AI. Reduce waste by 67%, optimize costs, and build sustainably with eco-certified materials and recycled products.",
    url: 'https://bunyan.ai',
    siteName: 'Bunyan',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/Logo.png',
        width: 1200,
        height: 630,
        alt: 'Bunyan - AI Construction Intelligence Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bunyan — AI Construction Intelligence',
    description: 'Reduce construction waste by 67% with AI-powered intelligence and sustainable materials.',
    images: ['/Logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/Logo.png', sizes: 'any' },
      { url: '/Logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/Logo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/Logo.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon',
        url: '/Logo.png',
      },
    ],
  },
  manifest: '/manifest.json',
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
