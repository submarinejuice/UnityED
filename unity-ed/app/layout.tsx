import "./globals.css";
import React from "react";

import SessionProviderWrapper from "./providers/SessionProviderWrapper";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ReactQueryProvider from "@/lib/providers/ReactQueryProvider";
export const metadata = {
  title: "UnityED",
  description: "Empowering Learning Through Play",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SessionProviderWrapper>
        <body className="bg-white text-slate-900 antialiased">
          <Header />
          <main>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </main>
          <Footer />
        </body>
      </SessionProviderWrapper>
    </html>
  );
}
