'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface CursorProps {
    isBlinking?: boolean;
}

export default function Cursor({ isBlinking = true }: CursorProps) {
    const { theme } = useTheme();

    return (
        <span
            className="relative inline-flex items-center justify-center w-0 h-0 pointer-events-none select-none"
            aria-hidden="true"
        >
            <span
                className={`
                    inline-block w-[2px] h-[1.2em] rounded-full
                    ${isBlinking ? 'animate-pulse' : ''}
                `}
                style={{
                    backgroundColor: theme.active,
                    boxShadow: `0 0 8px ${theme.glow}`,
                    animation: isBlinking ? 'blink 1s step-end infinite' : 'none',
                }}
            />
        </span>
    );
}
