import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from '@/components/ui/toaster';
import { ClientSessionProvider } from '@/components/providers';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LMS APP",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientSessionProvider>
          {children}
          <Toaster />
        </ClientSessionProvider>
      </body>
    </html>
  );
}
