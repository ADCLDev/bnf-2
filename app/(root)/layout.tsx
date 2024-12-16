// src/app/(root)/layout.tsx
import { FC, ReactNode } from 'react';
import '../globals.css'
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

interface LayoutProps {
  children: ReactNode;
}

const RootLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {/* Header */}
        <Navbar/>
        <main>{children}</main>
        {/* Footer */}
        <Footer/>
      </body>
    </html>
  );
};

export default RootLayout;