// src/hooks/useTypingEngine.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import { CharacterState } from '@/components/typing/Character';
import { playClickSound } from '@/lib/audio';

interface UseTypingEngineOptions {
    hardMode?: boolean;
}

export default function useTypingEngine(targetText: string, options: UseTypingEngineOptions = {}) {
    const { hardMode = false } = options;
    const [typed, setTyped] = useState<string>('');
    const [errors, setErrors] = useState<number>(0);
    const [isFrozen, setIsFrozen] = useState<boolean>(false);
    const cursorIndexRef = useRef<number>(0);
    const pendingErrorRef = useRef<string | null>(null);

    const reset = useCallback(() => {
        setTyped('');
        setErrors(0);
        setIsFrozen(false);
        cursorIndexRef.current = 0;
        pendingErrorRef.current = null;
    }, []);

    const triggerHaptic = useCallback(() => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(10);
        }
    }, []);

    const handleInput = useCallback(
        (char: string) => {
            if (hardMode && isFrozen) return;

            playClickSound();
            triggerHaptic();

            const idx = cursorIndexRef.current;
            if (idx < targetText.length) {
                const isCorrect = char === targetText[idx];

                if (!isCorrect) {
                    setErrors((prev) => prev + 1);

                    if (hardMode) {
                        setIsFrozen(true);
                        pendingErrorRef.current = char;
                        return;
                    }
                }

                setTyped((prev) => prev + char);
                cursorIndexRef.current = idx + 1;
            }
        },
        [targetText, hardMode, isFrozen, triggerHaptic]
    );

    const handleBackspace = useCallback(() => {
        playClickSound();
        triggerHaptic();

        if (pendingErrorRef.current && hardMode) {
            pendingErrorRef.current = null;
            setIsFrozen(false);
        } else {
            const idx = cursorIndexRef.current;
            if (idx > 0) {
                setTyped((prev) => prev.slice(0, -1));
                cursorIndexRef.current = idx - 1;
            }
        }
    }, [hardMode, triggerHaptic]);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.ctrlKey || e.metaKey || e.altKey) return;

            if (e.key === 'Backspace') {
                e.preventDefault();
                handleBackspace();
                return;
            }

            if (e.key.length === 1) {
                e.preventDefault();
                handleInput(e.key);
            }
        },
        [handleInput, handleBackspace]
    );

    useEffect(() => {
        cursorIndexRef.current = 0;
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        cursorIndexRef.current = 0;
    }, [targetText]);

    const characterStates: CharacterState[] = targetText.split('').map((expectedChar, index) => {
        if (index < cursorIndexRef.current) {
            return typed[index] === expectedChar ? 'correct' : 'incorrect';
        }
        if (index === cursorIndexRef.current) {
            return 'active';
        }
        return 'pending';
    });

    return {
        typed,
        cursorIndex: cursorIndexRef.current,
        errors,
        characterStates,
        reset,
        isFrozen,
        handleInput,
        handleBackspace,
    };
}
