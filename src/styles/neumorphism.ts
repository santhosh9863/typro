// src/styles/neumorphism.ts

export const colors = {
    background: "bg-[var(--typro-bg)]",
    textPrimary: "text-[var(--typro-text)]",
    textSecondary: "text-[var(--typro-text-secondary)]",
    accent: "text-[var(--typro-accent)]",
    correct: "text-[var(--typro-correct)]",
    incorrect: "text-[var(--typro-incorrect)]",
    active: "text-[var(--typro-active)]",
    pending: "text-[var(--typro-pending)]",
};

export const shadows = {
    raised: "shadow-[6px_6px_12px_var(--typro-shadow-dark),-6px_-6px_12px_var(--typro-shadow-light)]",
    pressed: "shadow-[inset_4px_4px_8px_var(--typro-shadow-dark),inset_-4px_-4px_8px_var(--typro-shadow-light)]",
};

export const gradients = {
    keySurface: "bg-gradient-to-br from-[var(--typro-key-from)] to-[var(--typro-key-to)]",
};

export const radius = {
    sm: "rounded-md",
    md: "rounded-lg",
    lg: "rounded-xl",
    full: "rounded-full",
};

export const transitions = {
    fast: "transition-all duration-[40ms] ease-out",
};
