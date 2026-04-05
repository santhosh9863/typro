'use client';

import React, { useState, useEffect } from 'react';
import { X, Volume2, Palette, Zap, Shield, Settings } from 'lucide-react';
import { SwitchProfile, getAvailableProfiles, getProfileInfo, setSwitchProfile, getSwitchProfile } from '@/lib/audio';
import { shadows, radius, transitions } from '@/styles/neumorphism';
import { useTheme } from '@/context/ThemeContext';
import { ThemeName, THEMES } from '@/context/ThemeContext';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    rgbMode: boolean;
    onRgbModeToggle: () => void;
    hardMode: boolean;
    onHardModeToggle: () => void;
    onSoundProfileChange: (profile: SwitchProfile) => void;
}

export default function Sidebar({
    isOpen,
    onClose,
    rgbMode,
    onRgbModeToggle,
    hardMode,
    onHardModeToggle,
    onSoundProfileChange,
}: SidebarProps) {
    const { themeName, setThemeName } = useTheme();

    // --- HYDRATION FIX START ---
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    // --- HYDRATION FIX END ---

    const [soundProfile, setSoundProfile] = useState<SwitchProfile>('blue');

    // Load initial sound profile only after component is mounted to avoid hydration mismatch
    useEffect(() => {
        if (mounted) {
            setSoundProfile(getSwitchProfile());
        }
    }, [mounted]);

    const handleSoundChange = (profile: SwitchProfile) => {
        setSoundProfile(profile);
        setSwitchProfile(profile);
        onSoundProfileChange(profile);
    };

    // If we haven't reached the client yet, return null to avoid server/client HTML mismatch
    if (!mounted) return null;

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
                    fixed top-0 right-0 h-full w-72 sm:w-80 z-50
                    bg-[var(--typro-bg)]
                    ${shadows.raised}
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                    overflow-y-auto
                `}
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2">
                            <Settings className="w-5 h-5 text-[var(--typro-accent)]" />
                            <h2 className="text-lg font-bold text-[var(--typro-text)]">Control Center</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg ${shadows.raised} ${transitions.fast} text-[var(--typro-text-secondary)] hover:text-[var(--typro-accent)]`}
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4 text-[var(--typro-text)]">
                                <Palette className="w-4 h-4" />
                                <h3 className="text-sm font-semibold uppercase tracking-wider">Theme</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {(Object.keys(THEMES) as ThemeName[]).map((name) => (
                                    <button
                                        key={name}
                                        onClick={() => setThemeName(name)}
                                        className={`
                                            px-3 py-2 text-xs font-medium rounded-lg ${transitions.fast}
                                            ${themeName === name
                                                ? `${shadows.pressed} text-[var(--typro-accent)]`
                                                : `${shadows.raised} text-[var(--typro-text-secondary)]`
                                            }
                                        `}
                                        style={{
                                            backgroundColor: THEMES[name].bg,
                                            color: themeName === name ? THEMES[name].accent : THEMES[name].text,
                                        }}
                                    >
                                        {THEMES[name].label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-4 text-[var(--typro-text)]">
                                <Volume2 className="w-4 h-4" />
                                <h3 className="text-sm font-semibold uppercase tracking-wider">Sound Profile</h3>
                            </div>
                            <div className="space-y-2">
                                {getAvailableProfiles().map((profile) => {
                                    const info = getProfileInfo(profile);
                                    return (
                                        <button
                                            key={profile}
                                            onClick={() => handleSoundChange(profile)}
                                            className={`
                                                w-full px-4 py-3 text-left text-sm rounded-lg ${transitions.fast}
                                                ${soundProfile === profile
                                                    ? `${shadows.pressed} text-[var(--typro-accent)]`
                                                    : `${shadows.raised} text-[var(--typro-text-secondary)]`
                                                }
                                            `}
                                        >
                                            {info.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-4 text-[var(--typro-text)]">
                                <Zap className="w-4 h-4" />
                                <h3 className="text-sm font-semibold uppercase tracking-wider">RGB Mode</h3>
                            </div>
                            <button
                                onClick={onRgbModeToggle}
                                className={`
                                    w-full px-4 py-3 text-sm rounded-lg ${transitions.fast} flex items-center justify-between
                                    ${rgbMode
                                        ? `${shadows.pressed} text-[var(--typro-accent)]`
                                        : `${shadows.raised} text-[var(--typro-text-secondary)]`
                                    }
                                `}
                            >
                                <span>{rgbMode ? 'Enabled' : 'Disabled'}</span>
                                <span className={`w-10 h-5 rounded-full relative ${transitions.fast} ${rgbMode ? 'bg-[var(--typro-accent)]' : 'bg-[var(--typro-pending)]'}`}>
                                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white ${transitions.fast} ${rgbMode ? 'left-5' : 'left-0.5'}`} />
                                </span>
                            </button>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-4 text-[var(--typro-text)]">
                                <Shield className="w-4 h-4" />
                                <h3 className="text-sm font-semibold uppercase tracking-wider">Hard Mode</h3>
                            </div>
                            <button
                                onClick={onHardModeToggle}
                                className={`
                                    w-full px-4 py-3 text-sm rounded-lg ${transitions.fast} flex items-center justify-between
                                    ${hardMode
                                        ? `${shadows.pressed} text-[var(--typro-incorrect)]`
                                        : `${shadows.raised} text-[var(--typro-text-secondary)]`
                                    }
                                `}
                            >
                                <span>{hardMode ? 'Stop on error' : 'Disabled'}</span>
                                <span className={`w-10 h-5 rounded-full relative ${transitions.fast} ${hardMode ? 'bg-[var(--typro-incorrect)]' : 'bg-[var(--typro-pending)]'}`}>
                                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white ${transitions.fast} ${hardMode ? 'left-5' : 'left-0.5'}`} />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}