import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart AR Assistant — Augmented Reality Engine Inspector",
  description:
    "A premium augmented reality experience with AI-powered 3D object inspection. Point your camera at a Hiro marker to visualize and explore engine components in AR.",
  keywords: ["AR", "augmented reality", "3D", "engine", "AI assistant", "Three.js"],
  authors: [{ name: "Smart AR Assistant" }],
  openGraph: {
    title: "Smart AR Assistant",
    description: "AI-powered Augmented Reality engine inspection experience",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#020408",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased bg-[#020408] text-[#f0f4ff] overflow-hidden">
        {children}
      </body>
    </html>
  );
}
