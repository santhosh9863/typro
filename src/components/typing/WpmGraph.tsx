'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface WpmGraphProps {
    snapshots: number[];
    width?: number;
    height?: number;
}

export default function WpmGraph({ snapshots, width = 600, height = 150 }: WpmGraphProps) {
    const { theme } = useTheme();

    if (snapshots.length < 2) {
        return (
            <div className="text-center py-4 text-xs text-[var(--typro-text-secondary)]">
                Start typing to see your WPM graph
            </div>
        );
    }

    const padding = { top: 20, right: 20, bottom: 30, left: 40 };
    const graphW = width - padding.left - padding.right;
    const graphH = height - padding.top - padding.bottom;

    const maxWpm = Math.max(...snapshots, 10);
    const minWpm = 0;

    const points = snapshots.map((wpm, i) => {
        const x = padding.left + (i / (snapshots.length - 1)) * graphW;
        const y = padding.top + graphH - ((wpm - minWpm) / (maxWpm - minWpm)) * graphH;
        return { x, y, wpm };
    });

    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaD = `${pathD} L ${points[points.length - 1].x} ${padding.top + graphH} L ${points[0].x} ${padding.top + graphH} Z`;

    const yTicks = 5;
    const yTickValues = Array.from({ length: yTicks + 1 }, (_, i) => Math.round((maxWpm / yTicks) * i));

    return (
        <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
            <defs>
                <linearGradient id="wpmGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.accent} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={theme.accent} stopOpacity="0.02" />
                </linearGradient>
            </defs>

            {yTickValues.map((val, i) => {
                const y = padding.top + graphH - (val / maxWpm) * graphH;
                return (
                    <g key={i}>
                        <line
                            x1={padding.left}
                            y1={y}
                            x2={width - padding.right}
                            y2={y}
                            stroke={theme.border}
                            strokeWidth="1"
                            strokeDasharray="4,4"
                        />
                        <text
                            x={padding.left - 8}
                            y={y + 4}
                            textAnchor="end"
                            fill={theme.textSecondary}
                            fontSize="10"
                            fontFamily="monospace"
                        >
                            {val}
                        </text>
                    </g>
                );
            })}

            <path d={areaD} fill="url(#wpmGradient)" />
            <path
                d={pathD}
                fill="none"
                stroke={theme.accent}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {points.map((p, i) => (
                <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r="3"
                    fill={theme.bg}
                    stroke={theme.accent}
                    strokeWidth="2"
                />
            ))}

            <text
                x={width / 2}
                y={height - 4}
                textAnchor="middle"
                fill={theme.textSecondary}
                fontSize="10"
                fontFamily="sans-serif"
            >
                Time →
            </text>
        </svg>
    );
}
