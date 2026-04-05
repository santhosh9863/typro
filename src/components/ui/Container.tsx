// src/components/ui/Container.tsx
import React, { ReactNode } from 'react';
import { colors } from '@/styles/neumorphism';

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

export default function Container({ children, className = '' }: ContainerProps) {
    return (
        <div
            className={`min-h-screen w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center ${colors.background} ${className}`}
        >
            {children}
        </div>
    );
}