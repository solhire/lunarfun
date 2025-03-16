import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import WalletContextProvider from "@/providers/WalletContextProvider";
import TokenDiscoveryProvider from "@/components/TokenDiscoveryProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import { NewTokenNotifications } from "@/services/codexWebsocketService";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yums.fun | Solana Memecoin Launchpad",
  description: "Create and trade Solana tokens with minimal effort on the most user-friendly launchpad in the ecosystem",
  keywords: ["solana", "memecoin", "crypto", "token", "launchpad", "yums", "pump"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-mode="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-navy text-white min-h-screen`}
      >
        <Providers>
          <WalletContextProvider>
            <TokenDiscoveryProvider>
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
              <NewTokenNotifications />
            </TokenDiscoveryProvider>
          </WalletContextProvider>
        </Providers>
      </body>
    </html>
  );
}
