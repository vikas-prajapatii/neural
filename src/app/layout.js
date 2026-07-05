import { Inter, Outfit } from "next/font/google";
import "./globals.css";
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth bg-[#02040c]">
      <body
        className={`${inter.variable} ${outfit.variable} text-slate-100 font-sans antialiased relative min-h-screen bg-transparent`}
      >
        {/* Global Continuous Background Video Layer */}
        <div className="fixed inset-0 -z-10 overflow-hidden select-none pointer-events-none">
          <video
            key="bg-video"
            autoPlay
            muted
            loop
            playsInline
            src="/bg-cinematic-v2.mp4?v=2"
            className="w-full h-full object-cover opacity-[0.88] scale-[1.02]"
            aria-label="Neural Noir - AI generated photorealistic 4K cinematic background video loop"
            title="Neural Noir - AI generated photorealistic 4K cinematic background video loop"
          />
          {/* Ambient Overlay Mask - Deep Navy & Midnight Tints */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#02040a] via-[#080d1a]/20 to-[#0b152d]/15 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-slate-950/5"></div>
        </div>

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
