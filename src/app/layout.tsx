import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ClientSessionProvider } from '@/components/providers';

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'LMS APP',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientSessionProvider>
          {children}
          <Toaster />
        </ClientSessionProvider>
      </body>
    </html>
  );
}
