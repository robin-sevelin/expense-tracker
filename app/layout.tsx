import type { Metadata } from 'next';
import './globals.css';
import Header from './components/header/Header';
import { Provider } from 'jotai';
import ThemeProvider from './contexts/ThemeContext';
import ThemeWrapper from './contexts/ThemeWrapper';
import Footer from './components/mainPage/Footer';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

type CustomMetadata = Metadata & {
  author?: string;
};

export const metadata: CustomMetadata = {
  title: 'Expense Tracker',
  description: 'App that keeps track of your expenses',
  author: 'Robin Sevelin',
  openGraph: {
    title: 'Expense Tracker',
    description: 'App that keeps track of your expenses',
    images: [
      {
        url: '/og-image.jpg', // Update with the correct path to your image
        width: 1200,
        height: 630,
        alt: 'Alternate text for the image',
      },
    ],
    url: 'https://expense-tracker-robin-sevelins-projects.vercel.app/',
    type: 'website',
  },

  icons: {
    icon: '/app/favicon/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider>
          <ThemeProvider>
            <ThemeWrapper>
              <Header />
              <main>{children}</main>
              <Footer />
            </ThemeWrapper>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
