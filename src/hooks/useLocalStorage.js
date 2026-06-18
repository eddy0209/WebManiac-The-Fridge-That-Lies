import { useState } from "react";

export default function useLocalStorage(
    key,
    initialValue
) {

    const [value, setValue] = useState(() => {

        try {

            const saved =
                localStorage.getItem(key);

            if (
                saved === null ||
                saved === undefined ||
                saved === "undefined"
            ) {
                return initialValue;
            }

            return JSON.parse(saved);

        } catch (error) {

            console.error(
                `Error reading localStorage key "${key}"`,
                error
            );

            return initialValue;
        }
    });

    const updateValue = (newValue) => {

        setValue(newValue);

        localStorage.setItem(
            key,
            JSON.stringify(newValue)
        );
    };

    return [value, updateValue];
}