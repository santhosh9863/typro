// src/lib/audio.ts

export type SwitchProfile = 'blue' | 'brown' | 'red';

interface SwitchSound {
    label: string;
    frequency: number;
    duration: number;
    type: OscillatorType;
    volume: number;
}

const SWITCH_PROFILES: Record<SwitchProfile, SwitchSound> = {
    blue: {
        label: 'Blue (Clicky)',
        frequency: 1800,
        duration: 0.03,
        type: 'square',
        volume: 0.15,
    },
    brown: {
        label: 'Brown (Tactile)',
        frequency: 600,
        duration: 0.06,
        type: 'triangle',
        volume: 0.2,
    },
    red: {
        label: 'Red (Linear)',
        frequency: 1200,
        duration: 0.02,
        type: 'sine',
        volume: 0.1,
    },
};

let currentProfile: SwitchProfile = 'blue';

const STORAGE_KEY = 'typro-switch-profile';

if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY) as SwitchProfile | null;
    if (saved && SWITCH_PROFILES[saved]) {
        currentProfile = saved;
    }
}

export function setSwitchProfile(profile: SwitchProfile): void {
    currentProfile = profile;
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, profile);
    }
}

export function getSwitchProfile(): SwitchProfile {
    return currentProfile;
}

export function getAvailableProfiles(): SwitchProfile[] {
    return ['blue', 'brown', 'red'];
}

export function getProfileInfo(profile: SwitchProfile): SwitchSound {
    return SWITCH_PROFILES[profile];
}

export const playClickSound = (): void => {
    if (typeof window === 'undefined') return;

    try {
        const profile = SWITCH_PROFILES[currentProfile];
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.type = profile.type;
        oscillator.frequency.setValueAtTime(profile.frequency, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(profile.frequency * 0.5, ctx.currentTime + profile.duration);

        gainNode.gain.setValueAtTime(profile.volume, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + profile.duration);

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + profile.duration);
    } catch (error) {
        console.warn('Audio playback failed:', error);
    }
};
