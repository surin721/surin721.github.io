import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://surin721.github.io'),
  alternates: {
    canonical: '/'
  },
  title: {
    default: 'Surin Athukorala',
    template: '%s | Surin Athukorala'
  },
  description:
    'Surin Athukorala — Senior Software Engineer at Neurotechnology Lab, Sri Lanka. Portfolio and writing.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body className="antialiased tracking-tight">
        <div className="min-h-screen flex flex-col justify-between p-6 md:p-8 text-gray-900">
          <Header />
          <main className="max-w-3xl mx-auto w-full space-y-6">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="max-w-3xl mx-auto w-full flex items-center justify-between">
      <Link href="/" className="font-medium text-gray-900">
        Surin Athukorala
      </Link>
      <nav className="flex gap-5 text-sm text-gray-500">
        <Link href="/#experience" className="hover:text-blue-600">
          Experience
        </Link>
        <a
          href="/Surin_Athukorala_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600"
        >
          CV
        </a>
      </nav>
    </header>
  );
}

function Footer() {
  const links = [
    { name: 'linkedin', url: 'https://www.linkedin.com/in/surinathukorala' },
    { name: 'github', url: 'https://github.com/surin721' }
  ];

  return (
    <footer className="mt-16 text-center text-sm text-gray-400 space-y-2">
      <div className="flex justify-center space-x-4 tracking-tight">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            {link.name}
          </a>
        ))}
      </div>
      <p>© {new Date().getFullYear()} Surin Athukorala</p>
    </footer>
  );
}
