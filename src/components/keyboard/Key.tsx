// src/components/keyboard/Key.tsx
'use client';

import React from 'react';
import { colors, shadows, radius, transitions } from '@/styles/neumorphism';
import { useTheme } from '@/context/ThemeContext';

interface KeyProps {
    label: string;
    isPressed: boolean;
    isPredicted?: boolean;
    width?: number;
    rgbMode?: boolean;
}

export default function Key({ label, isPressed, isPredicted = false, width = 1, rgbMode = false }: KeyProps) {
    const { theme } = useTheme();

    const dynamicWidth = {
        width: `calc(${width} * 3.5rem)`,
        minWidth: `calc(${width} * 2.5rem)`,
    };

    return (
        <div
            style={dynamicWidth}
            className={`
                flex items-center justify-center
                h-10 sm:h-12 md:h-14
                px-2
                text-xs sm:text-sm md:text-base font-bold uppercase
                select-none cursor-default
                ${colors.background}
                ${radius.md}
                ${transitions.fast}
                ${isPressed ? shadows.pressed : shadows.raised}
                ${isPredicted && !isPressed ? 'predictive-glow' : ''}
                ${rgbMode && isPressed ? 'rgb-mode-active' : ''}
            `}
        >
            <span
                style={{
                    color: isPredicted && !isPressed
                        ? theme.accentSecondary
                        : isPressed
                            ? theme.accent
                            : theme.text,
                }}
            >
                {label}
            </span>
        </div>
    );
}
