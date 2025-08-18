import type { Metadata } from "next";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import localFont from "next/font/local";
import { Mulish } from 'next/font/google';
import "./globals.css";
// import NavBar from "@/components/nav-bar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const mulish = Mulish({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mulish',
  weight: [ '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "Blood Bank",
  description:
    "Efficiently manage blood donations, donor information, and blood inventory with our comprehensive Blood Bank Management System. Join us in saving lives by ensuring a steady supply of blood for those in need.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-[#ffffff] ${geistSans.variable} ${geistMono.variable}  ${mulish.variable} antialiased`}
        suppressHydrationWarning
      >
        <ClerkProvider>
          <div className="flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
