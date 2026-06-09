import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://akshat-shettigar.dev'),
  title: 'Akshat Shettigar | Full Stack Developer',
  description:
    'Full Stack Developer skilled in React.js, Next.js, Node.js, Prisma ORM, and GraphQL. Building high-performance, scalable web applications.',
  keywords: ['Akshat Shettigar', 'Full Stack Developer', 'React.js', 'Next.js', 'Node.js', 'TypeScript', 'GraphQL'],
  authors: [{ name: 'Akshat Shettigar' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Akshat Shettigar | Full Stack Developer',
    description: 'Full Stack Developer building high-performance web applications.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className} style={{ backgroundColor: '#07080f' }}>
        {children}
      </body>
    </html>
  );
}
