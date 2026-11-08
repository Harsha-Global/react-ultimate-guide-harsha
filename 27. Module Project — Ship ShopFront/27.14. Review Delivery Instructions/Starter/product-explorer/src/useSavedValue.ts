import { useEffect, useState } from "react";
function readSavedValue<T>(key: string, fallback: T, isValid: (value: unknown) => value is T): T {
    try {
        const raw = window.localStorage.getItem(key);
        if (raw === null)
            return fallback;
        const parsed: unknown = JSON.parse(raw);
        return isValid(parsed) ? parsed : fallback;
    }
    catch {
        return fallback;
    }
}
export function useSavedValue<T>(key: string, fallback: T, isValid: (value: unknown) => value is T) {
    const [value, setValue] = useState<T>(() => readSavedValue(key, fallback, isValid));
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        }
        catch {
            // The current session can still work if storage is unavailable.
        }
    }, [key, value]);
    return [value, setValue] as const;
}
