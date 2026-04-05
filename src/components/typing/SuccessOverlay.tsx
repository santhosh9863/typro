'use client';

import React from 'react';
import { shadows, radius, transitions } from '@/styles/neumorphism';
import { useTheme } from '@/context/ThemeContext';

interface SuccessOverlayProps {
    wpm: number;
    accuracy: number;
    onNext: () => void;
}

export default function SuccessOverlay({ wpm, accuracy, onNext }: SuccessOverlayProps) {
    const { theme } = useTheme();

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/5 rounded-lg animate-in fade-in duration-300">
            <div
                className={`
                    p-8 sm:p-12 
                    flex flex-col items-center justify-center 
                    text-center
                    bg-[var(--typro-bg)]
                    ${shadows.raised} 
                    ${radius.lg}
                    border border-white/10
                `}
            >
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-widest mb-6 text-[var(--typro-text)]">
                    Level Complete!
                </h2>

                <div className="grid grid-cols-2 gap-8 mb-10">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-tighter opacity-60 font-bold text-[var(--typro-text)]">WPM</span>
                        <span className="text-4xl sm:text-5xl font-mono font-black" style={{ color: theme.accent }}>
                            {wpm}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-tighter opacity-60 font-bold text-[var(--typro-text)]">Accuracy</span>
                        <span className="text-4xl sm:text-5xl font-mono font-black text-green-500">
                            {accuracy}%
                        </span>
                    </div>
                </div>

                <button
                    onClick={onNext}
                    className={`
                        px-12 py-4
                        text-sm font-bold uppercase tracking-wider
                        rounded-xl
                        ${transitions.fast}
                        bg-[var(--typro-bg)]
                        text-[var(--typro-text)]
                        hover:text-white
                        ${shadows.raised}
                    `}
                    style={{
                        '--tw-shadow-color': theme.accent,
                    } as React.CSSProperties}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 20px ${theme.accent}, 6px 6px 12px var(--typro-shadow-dark), -6px -6px 12px var(--typro-shadow-light)`;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '6px 6px 12px var(--typro-shadow-dark), -6px -6px 12px var(--typro-shadow-light)';
                    }}
                >
                    Next Level
                </button>
            </div>
        </div>
    );
}
