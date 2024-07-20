// localStorageUtils.ts

/**
 * Save data to local storage
 * @param key - The key under which to store the data
 * @param value - The data to store
 */
export const saveToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Fetch data from local storage
 * @param key - The key of the data to fetch
 * @returns The parsed data or null if not found
 */
export const fetchFromLocalStorage = (key: string): any => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};

/**
 * Remove data from local storage
 * @param key - The key of the data to remove
 */
export const removeFromLocalStorage = (key: string) => {
    localStorage.removeItem(key);
};

