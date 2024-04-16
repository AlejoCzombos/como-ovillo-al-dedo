import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Toaster } from "react-hot-toast";

const typography = Fredoka({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Como Ovillo al Dedo - Sistema de puntos",
  description: "Sistema de puntos para la tienda Como Ovillo al Dedo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={typography.className}>
        <Navigation />
        {children}
      </body>
      <Toaster toastOptions={{ style: { textAlign: "center" } }} />
    </html>
  );
}
