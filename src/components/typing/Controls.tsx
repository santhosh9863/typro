'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { shadows, radius, transitions } from '@/styles/neumorphism';
import { useTheme } from '@/context/ThemeContext';

interface ControlsProps {
    currentLevel: number;
    totalLevels: number;
    onPrevious: () => void;
    onNext: () => void;
    onRetry: () => void;
    isRetrying?: boolean;
}

export default function Controls({
    currentLevel,
    totalLevels,
    onPrevious,
    onNext,
    onRetry,
    isRetrying = false,
}: ControlsProps) {
    const { theme } = useTheme();

    const btnBase = `
        flex items-center justify-center
        w-10 h-10 sm:w-12 sm:h-12
        cursor-pointer select-none
        ${radius.md} ${transitions.fast}
        bg-[var(--typro-bg)]
    `;

    return (
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6">
            <button
                onClick={onPrevious}
                disabled={currentLevel <= 1}
                className={`
                    ${btnBase}
                    ${currentLevel <= 1 ? 'opacity-30 cursor-not-allowed' : ''}
                    transition-all duration-[40ms] ease-out
                    text-[var(--typro-text-secondary)]
                    hover:text-[var(--typro-accent)]
                `}
                style={{
                    boxShadow: currentLevel <= 1
                        ? 'none'
                        : '6px 6px 12px var(--typro-shadow-dark), -6px -6px 12px var(--typro-shadow-light)',
                }}
                aria-label="Previous level"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <button
                onClick={onRetry}
                className={`
                    ${btnBase}
                    transition-all duration-[40ms] ease-out
                    text-[var(--typro-text-secondary)]
                    hover:text-[var(--typro-accent)]
                    ${isRetrying ? 'animate-spin' : ''}
                `}
                style={{
                    boxShadow: '6px 6px 12px var(--typro-shadow-dark), -6px -6px 12px var(--typro-shadow-light)',
                }}
                aria-label="Retry level"
            >
                <RotateCcw className="w-5 h-5" />
            </button>

            <button
                onClick={onNext}
                disabled={currentLevel >= totalLevels}
                className={`
                    ${btnBase}
                    ${currentLevel >= totalLevels ? 'opacity-30 cursor-not-allowed' : ''}
                    transition-all duration-[40ms] ease-out
                    text-[var(--typro-text-secondary)]
                    hover:text-[var(--typro-accent)]
                `}
                style={{
                    boxShadow: currentLevel >= totalLevels
                        ? 'none'
                        : '6px 6px 12px var(--typro-shadow-dark), -6px -6px 12px var(--typro-shadow-light)',
                }}
                aria-label="Next level"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}
