'use client';

import React from 'react';
import { shadows, radius, transitions } from '@/styles/neumorphism';
import { useTheme } from '@/context/ThemeContext';

interface HeatmapProps {
    mistakeData: Record<string, number>;
    threshold?: number;
}

const KEYBOARD_KEYS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

export default function Heatmap({ mistakeData, threshold = 3 }: HeatmapProps) {
    const { theme } = useTheme();

    const getMistakeCount = (key: string): number => {
        return mistakeData[key.toLowerCase()] || 0;
    };

    const isHot = (key: string): boolean => {
        return getMistakeCount(key) > threshold;
    };

    return (
        <div className={`p-4 rounded-xl ${shadows.pressed} bg-[var(--typro-bg)]`}>
            <div className="flex flex-col items-center gap-1">
                {KEYBOARD_KEYS.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-1">
                        {row.map((key) => {
                            const hot = isHot(key);
                            const count = getMistakeCount(key);

                            return (
                                <div
                                    key={key}
                                    className={`
                                        w-7 h-7 sm:w-8 sm:h-8
                                        flex items-center justify-center
                                        text-[10px] sm:text-xs font-bold
                                        ${radius.sm} ${transitions.fast}
                                    `}
                                    style={{
                                        backgroundColor: hot
                                            ? `rgba(220, 38, 38, ${Math.min(0.8, 0.2 + count * 0.15)})`
                                            : theme.bgSecondary,
                                        color: hot ? '#fff' : theme.textSecondary,
                                        boxShadow: hot
                                            ? `0 0 ${count * 3}px rgba(220, 38, 38, ${count * 0.15}), 0 0 ${count * 6}px rgba(220, 38, 38, ${count * 0.1})`
                                            : undefined,
                                    }}
                                    title={`${key}: ${count} mistakes`}
                                >
                                    {key}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: theme.bgSecondary }} />
                    <span className="text-[10px] text-[var(--typro-text-secondary)]">OK</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-red-500" />
                    <span className="text-[10px] text-[var(--typro-text-secondary)]">&gt;{threshold} mistakes</span>
                </div>
            </div>
        </div>
    );
}
