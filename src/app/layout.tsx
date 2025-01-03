import type { Metadata } from "next";
import {
  ClerkProvider,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import localFont from "next/font/local";
import "./globals.css";

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
        className={`min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ClerkProvider>
          <div className="flex min-h-screen flex-col">
            <header className="flex items-center justify-between p-4">
              <div>
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignInButton>
                  <UserButton />
                </SignInButton>
              </div>
            </header>
            <main className="flex-1">{children}</main>
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
