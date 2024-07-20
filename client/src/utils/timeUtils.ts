// timeUtils.ts

/**
 * Format a date to a readable string
 * @param date - The date to format
 * @param options - Options for formatting
 * @returns Formatted date string
 */
export const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions): string => {
    return new Intl.DateTimeFormat('en-US', options).format(date);
};

/**
 * Get the current date and time as a string
 * @returns Current date and time string
 */
export const getCurrentDateTime = (): string => {
    return new Date().toLocaleString();
};
