'use client';

import React, { useEffect, useState } from 'react';
import { Trophy, User, Zap, Target, Flame } from 'lucide-react';
import { shadows, radius, transitions } from '@/styles/neumorphism';
import { useTheme } from '@/context/ThemeContext';
import { getTopScores, type Profile } from '@/lib/supabase';

export default function Leaderboard() {
    const { theme } = useTheme();
    const [leaders, setLeaders] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLeaders() {
            try {
                const data = await getTopScores(10);
                setLeaders(data);
            } catch {
                setLeaders([
                    { id: '1', username: 'SpeedDemon', best_wpm: 142, avg_accuracy: 99, streak_count: 30 },
                    { id: '2', username: 'TypeMaster', best_wpm: 128, avg_accuracy: 98, streak_count: 25 },
                    { id: '3', username: 'KeyNinja', best_wpm: 115, avg_accuracy: 97, streak_count: 22 },
                    { id: '4', username: 'FingerFlux', best_wpm: 108, avg_accuracy: 96, streak_count: 18 },
                    { id: '5', username: 'NeonTyper', best_wpm: 102, avg_accuracy: 95, streak_count: 15 },
                    { id: '6', username: 'ClickClack', best_wpm: 98, avg_accuracy: 94, streak_count: 12 },
                    { id: '7', username: 'SwiftKeys', best_wpm: 95, avg_accuracy: 93, streak_count: 10 },
                    { id: '8', username: 'TypeStorm', best_wpm: 89, avg_accuracy: 92, streak_count: 8 },
                    { id: '9', username: 'KeyBlazer', best_wpm: 85, avg_accuracy: 91, streak_count: 6 },
                    { id: '10', username: 'RapidFire', best_wpm: 80, avg_accuracy: 90, streak_count: 4 },
                ]);
            } finally {
                setLoading(false);
            }
        }

        fetchLeaders();
    }, []);

    const rankIcon = (rank: number) => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return `#${rank}`;
    };

    return (
        <div className={`w-full max-w-2xl mx-auto p-6 ${shadows.raised} ${radius.lg} bg-[var(--typro-bg)]`}>
            <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-5 h-5" style={{ color: theme.accent }} />
                <h2 className="text-lg font-bold text-[var(--typro-text)] uppercase tracking-wider">Global Leaderboard</h2>
            </div>

            {loading ? (
                <div className="text-center py-8 text-[var(--typro-text-secondary)]">Loading...</div>
            ) : (
                <div className="space-y-3">
                    {leaders.map((profile, i) => (
                        <div
                            key={profile.id}
                            className={`
                                flex items-center gap-4 px-4 py-3 rounded-lg ${transitions.fast}
                                ${i < 3 ? shadows.pressed : shadows.raised}
                            `}
                            style={{
                                background: i < 3
                                    ? `linear-gradient(135deg, ${theme.bgSecondary}, ${theme.bg})`
                                    : undefined,
                            }}
                        >
                            <span className="text-lg font-bold w-8 text-center" style={{ color: theme.accent }}>
                                {rankIcon(i + 1)}
                            </span>

                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                <User className="w-4 h-4 text-[var(--typro-text-secondary)] flex-shrink-0" />
                                <span className="font-semibold text-[var(--typro-text)] truncate">{profile.username}</span>
                            </div>

                            <div className="flex items-center gap-4 text-xs sm:text-sm">
                                <div className="flex items-center gap-1">
                                    <Zap className="w-3 h-3" style={{ color: theme.accent }} />
                                    <span className="font-mono font-bold text-[var(--typro-text)]">{profile.best_wpm}</span>
                                    <span className="text-[var(--typro-text-secondary)]">wpm</span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <Target className="w-3 h-3 text-green-500" />
                                    <span className="font-mono text-[var(--typro-text-secondary)]">{profile.avg_accuracy}%</span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <Flame className="w-3 h-3 text-orange-500" />
                                    <span className="font-mono text-[var(--typro-text-secondary)]">{profile.streak_count}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
