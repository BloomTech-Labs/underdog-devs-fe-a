import { useState } from 'react';

export default function useLocalStorage(key, initValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const storedItem = window.localStorage.getItem(key);
    if (storedItem) return JSON.parse(storedItem);
    return initValue;
  });
  const setValue = value => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  return [storedValue, setValue];
}
