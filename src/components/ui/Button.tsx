// src/components/ui/Button.tsx
'use client';

import React, { useState } from 'react';
import { colors, shadows, radius, transitions } from '@/styles/neumorphism';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export default function Button({ children, onClick, className = '' }: ButtonProps) {
    const [isPressed, setIsPressed] = useState(false);

    // Visual "click" effect handlers
    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsPressed(false);

    return (
        <button
            onClick={onClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className={`
        px-6 py-2 
        font-bold uppercase tracking-wider text-sm
        outline-none focus:outline-none
        ${colors.background}
        ${colors.textPrimary}
        ${radius.md}
        ${transitions.fast}
        ${isPressed ? shadows.pressed : shadows.raised}
        ${className}
      `}
        >
            {children}
        </button>
    );
}