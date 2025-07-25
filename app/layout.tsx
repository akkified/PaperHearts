// app/layout.tsx
import type React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import { SessionProvider } from "next-auth/react";
import Link from "next/link"
import { Instagram, Linkedin, Mail } from "lucide-react"; // Import Mail icon

// --- SEO Metadata for the entire application ---
// This metadata will serve as defaults for all pages unless overridden by page-specific metadata
export const metadata = {
  // Define a default title and a template for dynamic page titles
  title: {
    default: 'PaperHearts | Handmade Art for Every Heart & Community',
    template: '%s | PaperHearts', // e.g., "About Us | PaperHearts"
  },
  description: 'PaperHearts creates unique handmade art and fosters community through engaging activities like origami, rock painting, and more. Join us and make a difference with handmade gifts!',
  keywords: [
    'PaperHearts', 'handmade art', 'community art', 'origami', 'crafts',
    'art workshops', 'local community', 'creative activities', 'non-profit art',
    'volunteer art', 'foster care activities', 'elderly art programs', 'youth art initiatives'
  ],
  // Canonical URL (IMPORTANT: Replace with your actual domain)
  // This helps search engines understand the preferred version of your site
  alternates: {
    canonical: 'https://paperhearts-azure.vercel.app/', // <<-- IMPORTANT: Replace with your actual domain
  },
  openGraph: {
    title: 'PaperHearts | Handmade Art for Every Heart & Community',
    description: 'PaperHearts creates unique handmade art and fosters community through engaging activities like origami, rock painting, and more. Join us and make a difference with handmade gifts!',
    url: 'https://paperhearts-azure.vercel.app/', // <<-- IMPORTANT: Replace with your actual domain
    siteName: 'PaperHearts',
    images: [
      {
        url: 'https://placehold.co/1200x630/A0BBE0/FFFFFF?text=Public+Image', // <<-- IMPORTANT: Provide a compelling image for social shares (e.g., in public/images)
        width: 1200,
        height: 630,
        alt: 'PaperHearts Community Art & Connection - Bringing joy through handmade crafts',
      },
      // You can add more image variants here if needed
    ],
    locale: 'en_US',
    type: 'website', // For a general website
  },
  // Add robots meta tag to instruct search engines how to crawl your site
  // Default is 'index, follow', but explicitly setting it can be good practice
  robots: {
    index: true,
    follow: true,
    nocache: true, // Optional: tells crawlers not to cache the page
    googleBot: { // Specific rules for Googlebot
      index: true,
      follow: true,
      noimageindex: false,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  // Optionally add authors, publisher, etc.
  authors: [{ name: 'PaperHearts', url: 'https://paperhearts-azure.vercel.app/' }],
  publisher: 'PaperHearts',
};


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="garden" className="m-0 p-0">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased m-0 p-0 bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 flex flex-col min-h-screen`}
      >
        {/*
          SessionProvider needs to be a client component itself, or wrapped in one,
          if you render it directly in a Server Component layout.
          However, Next.js typically handles this by making components like SessionProvider
          that need client-side features, able to be rendered within Server Components.
          If you encounter issues, consider wrapping <SessionProvider> in its own client component.
        */}
        <SessionProvider>
          <NavBar />
          <main className="flex-grow m-0 p-0">{children}</main> {/* flex-grow makes main take available space */}

          {/* Footer Section */}
          <footer className="bg-transparent text-white py-8 px-6 mt-auto">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
              {/* Copyright */}
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p>&copy; {new Date().getFullYear()} PaperHearts. All rights reserved.</p>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mb-4 md:mb-0">
                {/* Use Next.js Link component for internal navigation for performance & SEO */}
                <Link href="/" className="hover:text-purple-300 transition-colors duration-200">Home</Link>
                <Link href="/about" className="hover:text-purple-300 transition-colors duration-200">About Us</Link>
                <Link href="/team" className="hover:text-purple-300 transition-colors duration-200">Meet the Team</Link>
                {/* <Link href="/privacy" className="hover:text-purple-300 transition-colors duration-200">Privacy Policy</Link> */}
              </div>

              {/* Social Media Links */}
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/PaperHeartsstudentled/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow PaperHearts on Instagram" // More descriptive aria-label
                  className="hover:text-purple-300 transition-colors duration-200"
                >
                  <Instagram size={24} aria-hidden="true" /> {/* Add aria-hidden for decorative icons */}
                </a>
                <a
                  href="https://www.linkedin.com/company/PaperHearts-inc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow PaperHearts on LinkedIn" // More descriptive aria-label
                  className="hover:text-purple-300 transition-colors duration-200"
                >
                  <Linkedin size={24} aria-hidden="true" /> {/* Add aria-hidden */}
                </a>
                {/* Email Button */}
                <a
                  href="mailto:akki.akella@gmail.com"
                  aria-label="Email PaperHearts" // More descriptive aria-label
                  className="hover:text-purple-300 transition-colors duration-200"
                >
                  <Mail size={24} aria-hidden="true" /> {/* Add aria-hidden */}
                </a>
              </div>
            </div>
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}