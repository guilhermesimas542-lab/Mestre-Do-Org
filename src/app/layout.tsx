import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Providers from "./providers";
import { MetaPixelGate } from "@/components/MetaPixelGate";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mestre do Orgasmo",
  description: "Treinamento completo para dominar o prazer feminino.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head />
      <body className={`${inter.variable} antialiased`}>
        <MetaPixelGate />
        <Providers>{children}</Providers>

        {/* UTMify — passagem de UTMs */}
        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          strategy="afterInteractive"
        />

        {/* UTMify — Pixel */}
        <Script id="utmify-pixel-id" strategy="afterInteractive">
          {`window.pixelId = "69a84b02c3d164212b1d527e";`}
        </Script>
        <Script
          src="https://cdn.utmify.com.br/scripts/pixel/pixel.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
