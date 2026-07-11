import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ModalProvider } from "@/context/ModalContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap"
});

export const metadata = {
  title: "Neural Noir Studios | Ultra-Premium AI Video Production",
  description: "Global AI Video Production Studio blending raw creative vision with cutting-edge AI. Lock-in character consistency, deep noir atmospheres, and cinematic visual scales.",
  keywords: ["AI Video Production", "Cinematic AI", "Brand Video Production", "Short-Form Video AI", "Video Ads Production", "Neural Noir"],
  icons: {
    icon: [
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      { rel: "shortcut icon", url: "/favicon.ico" },
      { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512" }
    ]
  }
};

export default function RootLayout({ children }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Neural Noir Studios",
    "url": "https://neuralnoirstudio.com",
    "logo": "https://neuralnoirstudio.com/logo-icon-blue-final.png",
    "description": "Ultra-premium AI Video Production house building insane visual dimensions for visionary brands.",
    "sameAs": [
      "https://github.com/vikas-prajapatii/neural"
    ]
  };

  return (
    <html lang="en" className="scroll-smooth bg-[#02040c]">
      <head>
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" />
        <link rel="preconnect" href="https://f.vimeocdn.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://player.vimeo.com" />
        <link rel="dns-prefetch" href="https://i.vimeocdn.com" />
        <link rel="dns-prefetch" href="https://f.vimeocdn.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} text-slate-100 font-sans antialiased relative min-h-screen bg-transparent`}
      >

        {/* Content Container (Lying on top of video layer) */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <ModalProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <ContactModal />
          </ModalProvider>
        </div>
      </body>
    </html>
  );
}
