// src/hooks/useKeyboard.ts
import { useState, useEffect } from 'react';

interface KeyboardState {
    activeKeys: string[];
}

export default function useKeyboard(): KeyboardState {
    const [activeKeys, setActiveKeys] = useState<string[]>([]);

    useEffect(() => {
        // Adds the key to state, preventing duplicates if held down
        const handleKeyDown = (e: KeyboardEvent) => {
            setActiveKeys((prev) => {
                if (!prev.includes(e.key)) {
                    return [...prev, e.key];
                }
                return prev;
            });
        };

        // Removes the key from state when released
        const handleKeyUp = (e: KeyboardEvent) => {
            setActiveKeys((prev) => prev.filter((key) => key !== e.key));
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Cleanup listeners on unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return { activeKeys };
}