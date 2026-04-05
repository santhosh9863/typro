// src/components/keyboard/SpecialKey.tsx
'use client';

import React from 'react';
import { ArrowBigUp, Delete, Minus } from 'lucide-react';
import { colors, shadows, radius, transitions } from '@/styles/neumorphism';
import { useTheme } from '@/context/ThemeContext';

interface SpecialKeyProps {
    label: string;
    isPressed: boolean;
    width?: number;
    rgbMode?: boolean;
}

export default function SpecialKey({ label, isPressed, width = 1.5, rgbMode = false }: SpecialKeyProps) {
    const { theme } = useTheme();

    const dynamicWidth = {
        width: `calc(${width} * 3.5rem)`,
        minWidth: `calc(${width} * 2.5rem)`,
    };

    const renderIcon = () => {
        switch (label.toLowerCase()) {
            case 'backspace':
                return <Delete className="w-4 h-4 sm:w-5 sm:h-5" />;
            case 'shift':
                return <ArrowBigUp className="w-4 h-4 sm:w-5 sm:h-5" />;
            case 'space':
                return <Minus className="w-6 h-0.5 sm:w-8 sm:h-0.5" />;
            default:
                return label;
        }
    };

    return (
        <div
            className={`
                flex items-center justify-center
                h-10 sm:h-12 md:h-14
                px-3
                select-none cursor-default
                ${colors.background}
                ${radius.md}
                ${transitions.fast}
                ${isPressed ? shadows.pressed : shadows.raised}
                ${rgbMode && isPressed ? 'rgb-mode-active' : ''}
                border-t border-l
            `}
            style={{
                ...dynamicWidth,
                borderColor: theme.border,
                color: isPressed ? theme.accent : theme.textSecondary,
            }}
        >
            {renderIcon()}
        </div>
    );
}
