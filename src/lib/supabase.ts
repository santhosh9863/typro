import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

export type Profile = {
    id: string;
    username: string;
    best_wpm: number;
    avg_accuracy: number;
    streak_count: number;
    created_at?: string;
    updated_at?: string;
};

export type WpmSnapshot = {
    id: string;
    user_id: string;
    wpm: number;
    accuracy: number;
    level: number;
    created_at: string;
};

export type ScoreEntry = {
    username: string;
    wpm: number;
    accuracy: number;
};

export async function saveScore(username: string, wpm: number, accuracy: number): Promise<boolean> {
    if (!supabase) {
        console.warn('Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
        return false;
    }

    try {
        const { data: existing } = await supabase
            .from('profiles')
            .select('best_wpm, avg_accuracy, streak_count')
            .eq('username', username)
            .single();

        if (existing) {
            const newBestWpm = Math.max(existing.best_wpm, wpm);
            const newAvgAccuracy = Math.round((existing.avg_accuracy + accuracy) / 2);
            const newStreak = existing.streak_count + 1;

            await supabase
                .from('profiles')
                .update({
                    best_wpm: newBestWpm,
                    avg_accuracy: newAvgAccuracy,
                    streak_count: newStreak,
                    updated_at: new Date().toISOString(),
                })
                .eq('username', username);
        } else {
            await supabase.from('profiles').insert({
                username,
                best_wpm: wpm,
                avg_accuracy: accuracy,
                streak_count: 1,
            });
        }

        return true;
    } catch (error) {
        console.error('Failed to save score:', error);
        return false;
    }
}

export async function getTopScores(limit: number = 10): Promise<Profile[]> {
    if (!supabase) {
        console.warn('Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
        return [];
    }

    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('best_wpm', { ascending: false })
            .limit(limit);

        if (error) {
            console.error('Failed to fetch scores:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Failed to fetch scores:', error);
        return [];
    }
}
