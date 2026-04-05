'use client';

import React, { useEffect, useState } from 'react';
import KeyRow from '@/components/keyboard/KeyRow';
import useKeyboard from '@/hooks/useKeyboard';
import { KEYBOARD_LAYOUT } from '@/lib/constants';

interface KeyboardProps {
    rgbMode?: boolean;
    predictedKey?: string | null;
}

export default function Keyboard({ rgbMode = false, predictedKey = null }: KeyboardProps) {
    const { activeKeys } = useKeyboard();
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
            if (window.innerWidth < 768) {
                const keyboardWidth = 700;
                const availableWidth = window.innerWidth - 32;
                const calculatedScale = Math.min(1, availableWidth / keyboardWidth);
                setScale(Math.max(0.5, calculatedScale));
            } else {
                setScale(1);
            }
        };

        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    return (
        <div
            className="flex justify-center"
            style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
        >
            <div
                className={`
                    flex flex-col 
                    gap-2 sm:gap-3 md:gap-4 
                    p-4 sm:p-6 md:p-8
                    mx-auto w-fit
                    select-none
                `}
            >
                {KEYBOARD_LAYOUT.map((row, rowIndex) => (
                    <KeyRow
                        key={`row-${rowIndex}`}
                        keys={row}
                        activeKeys={activeKeys}
                        rgbMode={rgbMode}
                        predictedKey={predictedKey}
                    />
                ))}
            </div>
        </div>
    );
}
