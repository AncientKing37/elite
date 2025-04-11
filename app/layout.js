// app/layout.js

import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'El1te Market',
  description: 'Buy & Sell Fortnite Accounts',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}