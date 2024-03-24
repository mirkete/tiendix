import { useState } from "react";

export function useLocalStorage(key, initialValue){
    const [value, setValue] = useState(() => {
        const localValue = window.localStorage.getItem(key)
        return localValue ?? initialValue
    })

    const updateValue = (newValue) => {
        window.localStorage.setItem(key, newValue)
        setValue(newValue)
    }

    return [value, updateValue]
}