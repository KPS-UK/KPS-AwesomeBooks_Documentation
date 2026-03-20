import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { client } from '@/data/client-config';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: `${client.name} × KPS - Headless Commerce Transformation`,
  description:
    `KPS is partnering with ${client.name} to modernise the customer-facing digital experience, transitioning from SAP Commerce Accelerator to a composable, headless architecture.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
