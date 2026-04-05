// src/app/layout.tsx
import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Typro | Neumorphic Mechanical Typing',
    description: 'A high-performance typing experience featuring a tactile neumorphic mechanical keyboard UI.',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" className="hide-scrollbar">
            <body className={`${inter.className} antialiased transition-colors duration-300`}>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
