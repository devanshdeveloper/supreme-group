import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ManropeLatin = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Supreme Group",
  description: "Supreme Group",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang="en">
      <body
        className={`${ManropeLatin.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <Navbar params={params} />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
