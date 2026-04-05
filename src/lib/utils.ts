// src/lib/utils.ts
/**
 * Typro Performance Metrics Utility
 * Standard calculations for typing speed and accuracy.
 */

/**
 * Calculates Words Per Minute (WPM).
 * Standard formula: ((total characters / 5) - uncorrected errors) / minutes.
 * * @param totalChars - Number of characters typed
 * @param errors - Number of mistakes made
 * @param seconds - Elapsed time in seconds
 * @returns Rounded WPM score (never less than 0)
 */
export const calculateWPM = (totalChars: number, errors: number, seconds: number): number => {
    if (seconds <= 0 || totalChars === 0) return 0;

    const minutes = seconds / 60;
    const wordsTyped = totalChars / 5;
    const netWPM = (wordsTyped - errors) / minutes;

    return Math.max(0, Math.round(netWPM));
};

/**
 * Calculates the accuracy percentage of the typing session.
 * Formula: ((total characters - errors) / total characters) * 100.
 * * @param totalChars - Total number of keys pressed
 * @param errors - Total number of mistakes
 * @returns Rounded accuracy percentage (0 to 100)
 */
export const calculateAccuracy = (totalChars: number, errors: number): number => {
    if (totalChars <= 0) return 100;

    const correctChars = Math.max(0, totalChars - errors);
    const accuracy = (correctChars / totalChars) * 100;

    return Math.round(accuracy);
};