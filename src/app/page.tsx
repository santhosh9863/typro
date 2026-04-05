'use client';

import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import Container from '@/components/ui/Container';
import TypingArea from '@/components/typing/TypingArea';
import Keyboard from '@/components/keyboard/Keyboard';
import Sidebar from '@/components/ui/Sidebar';
import { shadows } from '@/styles/neumorphism';

export default function Home() {
    const [rgbMode, setRgbMode] = useState(false);
    const [hardMode, setHardMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <main className="min-h-screen w-full bg-[var(--typro-bg)] flex flex-col items-center justify-center p-4 sm:p-8 relative">

            {/* 1. THE ONLY SETTINGS BUTTON - FIXED POSITION */}
            <div className="fixed top-6 right-6 z-40">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className={`p-4 flex items-center justify-center rounded-2xl ${shadows.raised} bg-[var(--typro-bg)] text-[var(--typro-text-secondary)] hover:text-[var(--typro-accent)] active:shadow-inner transition-all duration-150 ease-out`}
                    aria-label="Open settings"
                >
                    <Settings className="w-6 h-6" />
                </button>
            </div>

            <Container className="flex flex-col items-center justify-center gap-12 sm:gap-16 max-w-5xl w-full">

                {/* 2. TYPING SECTION */}
                <section className="w-full flex justify-center">
                    <TypingArea
                        hardMode={hardMode}
                        onRgbModeChange={setRgbMode}
                    />
                </section>

                {/* 3. KEYBOARD SECTION */}
                <section className="w-full flex justify-center overflow-x-auto hide-scrollbar">
                    <div className="min-w-fit px-4">
                        <Keyboard rgbMode={rgbMode} />
                    </div>
                </section>

                {/* 4. BRANDING */}
                <footer className="opacity-30 text-[10px] uppercase tracking-[0.2em] font-bold mt-4">
                    SANTHOSH // Typro 2.0
                </footer>
            </Container>

            {/* 5. SIDEBAR DRAWER */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                rgbMode={rgbMode}
                onRgbModeToggle={() => setRgbMode((p) => !p)}
                hardMode={hardMode}
                onHardModeToggle={() => setHardMode((p) => !p)}
                onSoundProfileChange={(profile) => console.log(`Switching to ${profile}`)}
            />
        </main>
    );
}