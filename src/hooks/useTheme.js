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

export default function useTheme() {
  const darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage(
    'theme',
    darkTheme ? 'dark' : 'light'
  );
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    setTheme(darkTheme ? 'dark' : 'light');
    document.head.querySelector('#antd-stylesheet') || createAntStylesheet();
  }, []); //eslint-disable-line

  useEffect(
    function setAntStylesheetTheme() {
      document.head.querySelector('#antd-stylesheet').href = stylesheets[theme];
    },
    [theme]
  );
  return [theme, toggleTheme];
}
