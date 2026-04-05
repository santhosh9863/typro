'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export type ThemeName = 'classic' | 'onyx' | 'cyberpunk' | 'matcha';

export interface ThemeColors {
    name: ThemeName;
    label: string;
    bg: string;
    bgSecondary: string;
    text: string;
    textSecondary: string;
    accent: string;
    accentSecondary: string;
    shadowLight: string;
    shadowDark: string;
    keySurfaceFrom: string;
    keySurfaceTo: string;
    correct: string;
    incorrect: string;
    active: string;
    pending: string;
    border: string;
    glow: string;
}

export const THEMES: Record<ThemeName, ThemeColors> = {
    classic: {
        name: 'classic',
        label: 'Classic',
        bg: '#e0e5ec',
        bgSecondary: '#d1d9e6',
        text: '#2d3436',
        textSecondary: '#636e72',
        accent: '#0984e3',
        accentSecondary: '#74b9ff',
        shadowLight: '#ffffff',
        shadowDark: '#a3b1c6',
        keySurfaceFrom: '#d1d9e6',
        keySurfaceTo: '#f0f4f8',
        correct: '#00b894',
        incorrect: '#d63031',
        active: '#0984e3',
        pending: '#b2bec3',
        border: 'rgba(255,255,255,0.1)',
        glow: 'rgba(9,132,227,0.3)',
    },
    onyx: {
        name: 'onyx',
        label: 'Onyx',
        bg: '#1a1a2e',
        bgSecondary: '#16213e',
        text: '#eaeaea',
        textSecondary: '#a0a0b0',
        accent: '#e94560',
        accentSecondary: '#ff6b81',
        shadowLight: '#2a2a3e',
        shadowDark: '#0f0f1a',
        keySurfaceFrom: '#1e1e36',
        keySurfaceTo: '#252545',
        correct: '#2ed573',
        incorrect: '#ff4757',
        active: '#e94560',
        pending: '#555570',
        border: 'rgba(255,255,255,0.05)',
        glow: 'rgba(233,69,96,0.4)',
    },
    cyberpunk: {
        name: 'cyberpunk',
        label: 'Cyberpunk',
        bg: '#0d0d0d',
        bgSecondary: '#1a1a1a',
        text: '#00ff41',
        textSecondary: '#00cc33',
        accent: '#ff00ff',
        accentSecondary: '#00ffff',
        shadowLight: '#1a1a2e',
        shadowDark: '#000000',
        keySurfaceFrom: '#111111',
        keySurfaceTo: '#1a1a1a',
        correct: '#00ff41',
        incorrect: '#ff0040',
        active: '#ff00ff',
        pending: '#333333',
        border: 'rgba(0,255,65,0.1)',
        glow: 'rgba(255,0,255,0.5)',
    },
    matcha: {
        name: 'matcha',
        label: 'Matcha',
        bg: '#f0f5e8',
        bgSecondary: '#e4ebd4',
        text: '#2d3a2d',
        textSecondary: '#6b7c6b',
        accent: '#5a8f3c',
        accentSecondary: '#8bc34a',
        shadowLight: '#ffffff',
        shadowDark: '#c8d4b8',
        keySurfaceFrom: '#e4ebd4',
        keySurfaceTo: '#f5f9ed',
        correct: '#4caf50',
        incorrect: '#e57373',
        active: '#5a8f3c',
        pending: '#a8b89a',
        border: 'rgba(255,255,255,0.15)',
        glow: 'rgba(90,143,60,0.3)',
    },
};

interface ThemeContextType {
    theme: ThemeColors;
    themeName: ThemeName;
    setThemeName: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'typro-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [themeName, setThemeNameState] = useState<ThemeName>('classic');

    useEffect(() => {
        const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName | null;
        if (saved && THEMES[saved]) {
            setThemeNameState(saved);
        }
    }, []);

    const setThemeName = useCallback((name: ThemeName) => {
        setThemeNameState(name);
        localStorage.setItem(THEME_STORAGE_KEY, name);
    }, []);

    useEffect(() => {
        const t = THEMES[themeName];
        const root = document.documentElement;
        root.style.setProperty('--typro-bg', t.bg);
        root.style.setProperty('--typro-bg-secondary', t.bgSecondary);
        root.style.setProperty('--typro-text', t.text);
        root.style.setProperty('--typro-text-secondary', t.textSecondary);
        root.style.setProperty('--typro-accent', t.accent);
        root.style.setProperty('--typro-accent-secondary', t.accentSecondary);
        root.style.setProperty('--typro-shadow-light', t.shadowLight);
        root.style.setProperty('--typro-shadow-dark', t.shadowDark);
        root.style.setProperty('--typro-key-from', t.keySurfaceFrom);
        root.style.setProperty('--typro-key-to', t.keySurfaceTo);
        root.style.setProperty('--typro-correct', t.correct);
        root.style.setProperty('--typro-incorrect', t.incorrect);
        root.style.setProperty('--typro-active', t.active);
        root.style.setProperty('--typro-pending', t.pending);
        root.style.setProperty('--typro-border', t.border);
        root.style.setProperty('--typro-glow', t.glow);
        root.style.setProperty('--neumorphic-bg', t.bg);
        root.style.setProperty('--neumorphic-text', t.text);
        root.setAttribute('data-theme', themeName);
    }, [themeName]);

    return (
        <ThemeContext.Provider value={{ theme: THEMES[themeName], themeName, setThemeName }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextType {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
}
