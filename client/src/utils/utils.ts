// src/utils/utils.ts

/**
 * Generate a random 6-digit PIN.
 * @returns {string} A 6-digit random PIN.
 */
export const generateRandomPin = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit random pin
  };