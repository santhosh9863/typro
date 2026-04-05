'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { shadows, radius } from '@/styles/neumorphism';
import Character from '@/components/typing/Character';
import Cursor from '@/components/typing/Cursor';
import SuccessOverlay from '@/components/typing/SuccessOverlay';
import Controls from '@/components/typing/Controls';
import WpmGraph from '@/components/typing/WpmGraph';
import Button from '@/components/ui/Button';
import useTypingEngine from '@/hooks/useTypingEngine';
import { useTrainingStats } from '@/hooks/useTrainingStats';
import { calculateAccuracy, calculateWPM } from '@/lib/utils';
import { CURRICULUM } from '@/lib/constants';
import { useTheme } from '@/context/ThemeContext';

interface TypingAreaProps {
    hardMode: boolean;
    onRgbModeChange?: (mode: boolean) => void;
}

export default function TypingArea({ hardMode, onRgbModeChange }: TypingAreaProps) {
    const { theme } = useTheme();
    const [level, setLevel] = useState<number>(1);
    const [sentenceIdx, setSentenceIdx] = useState<number>(0);
    const [wpmSnapshots, setWpmSnapshots] = useState<number[]>([]);
    const [levelUnlocked, setLevelUnlocked] = useState<boolean>(true);
    const hasShownConfetti = useRef<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const lastInputLength = useRef<number>(0);

    const { stats, completeLevel, isLevelUnlocked } = useTrainingStats();

    const currentDay = CURRICULUM[level - 1];
    const targetText = currentDay?.sentences[sentenceIdx] || CURRICULUM[0].sentences[0];

    const {
        typed,
        cursorIndex,
        errors,
        characterStates,
        reset,
        isFrozen,
        handleInput,
        handleBackspace,
    } = useTypingEngine(targetText, { hardMode });

    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [isRetrying, setIsRetrying] = useState<boolean>(false);

    useEffect(() => {
        hasShownConfetti.current = false;
        lastInputLength.current = 0;
    }, [level, sentenceIdx]);

    useEffect(() => {
        const unlocked = isLevelUnlocked(level);
        setLevelUnlocked(unlocked);
    }, [level, isLevelUnlocked]);

    useEffect(() => {
        if (cursorIndex === 1 && !isTyping) {
            setIsTyping(true);
        }
    }, [cursorIndex, isTyping]);

    useEffect(() => {
        if (cursorIndex >= targetText.length) {
            setIsTyping(false);
        }
    }, [cursorIndex, targetText.length]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isTyping) {
            interval = setInterval(() => {
                setElapsedTime((prev) => prev + 1);
                const currentWpm = calculateWPM(typed.length, errors, elapsedTime + 1);
                setWpmSnapshots((prev) => [...prev, currentWpm]);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isTyping, typed.length, errors, elapsedTime]);

    const triggerConfetti = useCallback(() => {
        if (hasShownConfetti.current) return;
        hasShownConfetti.current = true;

        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: [theme.accent, '#ffffff', theme.accentSecondary],
        });
    }, [theme]);

    const handleReset = useCallback(() => {
        reset();
        setIsTyping(false);
        setElapsedTime(0);
        setWpmSnapshots([]);
        lastInputLength.current = 0;
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }, [reset]);

    const handleRetry = useCallback(() => {
        setIsRetrying(true);
        handleReset();
        setTimeout(() => setIsRetrying(false), 600);
    }, [handleReset]);

    const handleNext = useCallback(() => {
        const day = CURRICULUM[level - 1];
        if (sentenceIdx < (day?.sentences.length || 1) - 1) {
            setSentenceIdx((prev) => prev + 1);
        } else if (level < CURRICULUM.length) {
            const nextLevel = level + 1;
            if (isLevelUnlocked(nextLevel)) {
                setLevel(nextLevel);
                setSentenceIdx(0);
            }
        }
        handleReset();
    }, [level, sentenceIdx, handleReset, isLevelUnlocked]);

    const handlePrevious = useCallback(() => {
        if (sentenceIdx > 0) {
            setSentenceIdx((prev) => prev - 1);
        } else if (level > 1) {
            const prevLevelIdx = level - 2;
            setLevel((prev) => prev - 1);
            setSentenceIdx((CURRICULUM[prevLevelIdx]?.sentences.length || 1) - 1);
        }
        handleReset();
    }, [level, sentenceIdx, handleReset]);

    const handleContainerClick = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.value = '';
            lastInputLength.current = 0;
        }
    }, []);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const inputLength = inputValue.length;

        if (inputLength > lastInputLength.current) {
            const newChar = inputValue.slice(-1);
            handleInput(newChar);
        } else if (inputLength < lastInputLength.current) {
            handleBackspace();
        }

        lastInputLength.current = inputLength;

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }, [handleInput, handleBackspace]);

    const handleInputKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            handleBackspace();
            if (inputRef.current) {
                inputRef.current.value = '';
            }
            lastInputLength.current = 0;
        }
    }, [handleBackspace]);

    const isFinished = cursorIndex >= targetText.length;
    const wpm = calculateWPM(typed.length, errors, elapsedTime);
    const accuracy = calculateAccuracy(typed.length, errors);

    useEffect(() => {
        if (isFinished && elapsedTime > 0) {
            completeLevel(wpm, accuracy, level);
            triggerConfetti();
        }
    }, [isFinished]);

    return (
        <div className="relative w-full max-w-4xl mx-auto px-2 sm:px-4">
            <Controls
                currentLevel={level}
                totalLevels={CURRICULUM.length}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onRetry={handleRetry}
                isRetrying={isRetrying}
            />

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--typro-text-secondary)]">
                        Day {level}
                    </span>
                    <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-medium uppercase"
                        style={{
                            backgroundColor: `${theme.accent}20`,
                            color: theme.accent,
                        }}
                    >
                        {currentDay?.difficulty}
                    </span>
                    <span className="text-xs text-[var(--typro-text-secondary)]">
                        {currentDay?.title}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    {stats.dailyStreak > 0 && (
                        <span className="text-xs font-mono text-orange-500">
                            {stats.dailyStreak}d streak
                        </span>
                    )}
                    <span className="text-xs font-mono text-[var(--typro-accent)]">
                        Best: {stats.highestWpm}
                    </span>
                </div>
            </div>

            <div
                onClick={handleContainerClick}
                className={`
                    w-full p-6 sm:p-10 mb-6
                    flex flex-col items-center justify-center
                    ${shadows.pressed}
                    ${radius.lg}
                    transition-all duration-500
                    ${isFinished ? 'opacity-40 scale-95 blur-[1px]' : 'opacity-100 scale-100'}
                    ${isFrozen ? 'ring-2 ring-red-500 ring-opacity-50' : ''}
                    ${!levelUnlocked ? 'opacity-50 pointer-events-none' : ''}
                    cursor-text
                `}
                style={{ backgroundColor: theme.bgSecondary }}
            >
                <input
                    ref={inputRef}
                    type="text"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    autoCapitalize="off"
                    className="opacity-0 absolute pointer-events-none w-0 h-0"
                    aria-hidden="true"
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    onBlur={() => {
                        setTimeout(() => {
                            inputRef.current?.focus();
                        }, 10);
                    }}
                />

                <div className="flex w-full justify-between items-center mb-10 px-2 sm:px-6 font-bold tracking-widest uppercase text-[10px] sm:text-xs opacity-70">
                    <div className="flex items-center gap-2">
                        <span className="text-[var(--typro-text-secondary)]">Sentence</span>
                        <span className="font-mono text-lg" style={{ color: theme.accent }}>
                            {sentenceIdx + 1}/{currentDay?.sentences.length}
                        </span>
                    </div>
                    <div className="flex gap-6 sm:gap-12">
                        <div>
                            <span className="text-[var(--typro-text-secondary)]">WPM: </span>
                            <span className="font-mono text-xl sm:text-3xl ml-1" style={{ color: theme.accent }}>
                                {wpm}
                            </span>
                        </div>
                        <div>
                            <span className="text-[var(--typro-text-secondary)]">ACC: </span>
                            <span className="font-mono text-xl sm:text-3xl ml-1 text-green-500">
                                {accuracy}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="relative text-xl sm:text-2xl md:text-3xl font-mono leading-relaxed tracking-wide select-none whitespace-pre-wrap break-words w-full text-center mb-12 min-h-[120px] flex flex-wrap justify-center content-center">
                    {targetText.split('').map((char, index) => (
                        <React.Fragment key={`char-${level}-${sentenceIdx}-${index}`}>
                            {index === cursorIndex && <Cursor />}
                            <Character
                                char={char}
                                state={characterStates[index] || 'pending'}
                            />
                        </React.Fragment>
                    ))}
                    {isFinished && <Cursor />}
                </div>

                {!isFinished && (
                    <div className="flex justify-center w-full">
                        <Button onClick={handleReset} className="text-[10px] opacity-60 hover:opacity-100">
                            Restart
                        </Button>
                    </div>
                )}

                {!levelUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[var(--typro-bg)]/80 rounded-lg">
                        <span className="text-sm font-bold text-[var(--typro-text-secondary)]">
                            Complete previous level with &gt;95% accuracy to unlock
                        </span>
                    </div>
                )}
            </div>

            <WpmGraph snapshots={wpmSnapshots} />

            {isFinished && (
                <SuccessOverlay
                    wpm={wpm}
                    accuracy={accuracy}
                    onNext={handleNext}
                />
            )}
        </div>
    );
}
