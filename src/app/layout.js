import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} bg-[#02040c] text-slate-100 font-sans antialiased`}
      >
        <ModalProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}
