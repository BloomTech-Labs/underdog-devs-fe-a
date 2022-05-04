import useLocalStorage from './useLocalStorage';
import { useEffect } from 'react';

const stylesheets = {
  light: 'https://cdnjs.cloudflare.com/ajax/libs/antd/4.9.4/antd.min.css',
  dark: 'https://cdnjs.cloudflare.com/ajax/libs/antd/4.9.4/antd.dark.min.css',
};
const createAntStylesheet = () => {
  const antStylesheet = document.createElement('link');
  antStylesheet.rel = 'stylesheet';
  antStylesheet.id = 'antd-stylesheet';
  document.head.appendChild(antStylesheet);
};

const checkMode = () => {
  const theme = localStorage.getItem('theme');
  if (theme === null) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      localStorage.setItem('theme', 'dark');
      return 'dark';
    } else {
      localStorage.setItem('theme', 'light');
      return 'light';
    }
  }
};

export default function useTheme() {
  const [theme, setTheme] = useLocalStorage('theme', checkMode());
  const toggle = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  useEffect(() => {
    createAntStylesheet();
    const antStylesheet = document.getElementById('antd-stylesheet');
    antStylesheet.href = stylesheets[theme];
  }, [theme]);
  return [theme, toggle];
}
