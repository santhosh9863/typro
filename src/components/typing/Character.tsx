// src/components/typing/Character.tsx
import React from 'react';
import { colors } from '@/styles/neumorphism';

export type CharacterState = 'pending' | 'correct' | 'incorrect' | 'active';

interface CharacterProps {
    char: string;
    state: CharacterState;
}

/**
 * Character Component
 * Renders an individual letter with Neumorphic text effects based on typing state.
 */
export default function Character({ char, state }: CharacterProps) {
    // Mapping states to specific Tailwind classes and Neumorphic text shadows
    const stateStyles = {
        pending: `opacity-30 ${colors.textPrimary}`,
        correct: `text-green-500 drop-shadow-[1px_1px_1px_rgba(255,255,255,0.8)]`,
        incorrect: `text-red-500 bg-red-500/10 rounded-sm drop-shadow-[0_0_2px_rgba(239,68,68,0.5)]`,
        active: `text-blue-500 font-bold drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]`,
    };

    return (
        <span
            className={`
        relative inline-block px-[1px]
        transition-all duration-150 ease-in-out
        ${stateStyles[state]}
      `}
        >
            {/* For spaces, we need a non-breaking space or a specific width to ensure they don't collapse */}
            {char === ' ' ? '\u00A0' : char}
        </span>
    );
}