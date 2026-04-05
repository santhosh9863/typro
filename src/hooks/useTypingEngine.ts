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
    const [cursorIndex, setCursorIndex] = useState<number>(0);
    const [errors, setErrors] = useState<number>(0);
    const [isFrozen, setIsFrozen] = useState<boolean>(false);
    const pendingErrorRef = useRef<string | null>(null);

    const reset = useCallback(() => {
        setTyped('');
        setCursorIndex(0);
        setErrors(0);
        setIsFrozen(false);
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

            if (cursorIndex < targetText.length) {
                const isCorrect = char === targetText[cursorIndex];

                if (!isCorrect) {
                    setErrors((prev) => prev + 1);

                    if (hardMode) {
                        setIsFrozen(true);
                        pendingErrorRef.current = char;
                        return;
                    }
                }

                setTyped((prev) => prev + char);
                setCursorIndex((prev) => prev + 1);
            }
        },
        [cursorIndex, targetText, hardMode, isFrozen, triggerHaptic]
    );

    const handleBackspace = useCallback(() => {
        playClickSound();
        triggerHaptic();

        if (pendingErrorRef.current && hardMode) {
            pendingErrorRef.current = null;
            setIsFrozen(false);
        } else {
            setTyped((prev) => prev.slice(0, -1));
            setCursorIndex((prev) => Math.max(0, prev - 1));
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
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const characterStates: CharacterState[] = targetText.split('').map((expectedChar, index) => {
        if (index < cursorIndex) {
            return typed[index] === expectedChar ? 'correct' : 'incorrect';
        }
        if (index === cursorIndex) {
            return 'active';
        }
        return 'pending';
    });

    return {
        typed,
        cursorIndex,
        errors,
        characterStates,
        reset,
        isFrozen,
        handleInput,
        handleBackspace,
    };
}
