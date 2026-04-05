'use client';

import { useState, useEffect, useCallback } from 'react';

interface TrainingStats {
    dailyStreak: number;
    highestWpm: number;
    completedLevels: number[];
    lastCompletedDate: string | null;
}

const STORAGE_KEY = 'typro-training-stats';
const ACCURACY_THRESHOLD = 95;

const defaultStats: TrainingStats = {
    dailyStreak: 0,
    highestWpm: 0,
    completedLevels: [],
    lastCompletedDate: null,
};

function loadStats(): TrainingStats {
    if (typeof window === 'undefined') return defaultStats;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return { ...defaultStats, ...JSON.parse(raw) };
    } catch { /* ignore */ }
    return defaultStats;
}

function saveStats(stats: TrainingStats): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

function getToday(): string {
    return new Date().toISOString().split('T')[0];
}

function isYesterday(dateStr: string): boolean {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0] === dateStr;
}

export function useTrainingStats() {
    const [stats, setStats] = useState<TrainingStats>(defaultStats);

    useEffect(() => {
        setStats(loadStats());
    }, []);

    const completeLevel = useCallback((wpm: number, accuracy: number, level: number): boolean => {
        if (accuracy <= ACCURACY_THRESHOLD) {
            return false;
        }

        setStats(prev => {
            const today = getToday();
            let newStreak = prev.dailyStreak;

            if (prev.lastCompletedDate !== today) {
                if (prev.lastCompletedDate && isYesterday(prev.lastCompletedDate)) {
                    newStreak = prev.dailyStreak + 1;
                } else {
                    newStreak = 1;
                }
            }

            const isAlreadyCompleted = prev.completedLevels.includes(level);
            const newCompletedLevels = isAlreadyCompleted
                ? prev.completedLevels
                : [...prev.completedLevels, level];

            const newStats: TrainingStats = {
                dailyStreak: newStreak,
                highestWpm: Math.max(prev.highestWpm, wpm),
                completedLevels: newCompletedLevels,
                lastCompletedDate: today,
            };

            saveStats(newStats);
            return newStats;
        });

        return true;
    }, []);

    const isLevelUnlocked = useCallback((level: number): boolean => {
        if (level === 1) return true;
        return stats.completedLevels.includes(level - 1);
    }, [stats.completedLevels]);

    const resetStats = useCallback(() => {
        setStats(defaultStats);
        saveStats(defaultStats);
    }, []);

    return {
        stats,
        completeLevel,
        isLevelUnlocked,
        resetStats,
        accuracyThreshold: ACCURACY_THRESHOLD,
    };
}
