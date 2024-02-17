import type { Metadata } from 'next';
import './globals.css';
import Header from './components/header/Header';
import { Provider } from 'jotai';
import ThemeProvider from './contexts/ThemeContext';
import ThemeWrapper from './contexts/ThemeWrapper';
import Footer from './components/mainPage/Footer';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Expense Tracker',
  description: 'App that keeps track of your expenses',
  author: 'Robin Sevelin',
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
