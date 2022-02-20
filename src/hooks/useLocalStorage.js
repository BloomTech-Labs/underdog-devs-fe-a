import { useState } from 'react';

export default function useLocalStorage(key, initValue) {
  const [storedValue, setStoredValue] = useState(() => {
    return localStorage.getItem(key) || initValue;
  });
  const setValue = value => {
    setStoredValue(value);
    localStorage.setItem(key, value);
  };
  return [storedValue, setValue];
}
