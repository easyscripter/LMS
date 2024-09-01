import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/seo.constants';
import { Providers } from './providers';

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: {
    absolute: SITE_NAME,
    template: `%s - ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={nunito.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
