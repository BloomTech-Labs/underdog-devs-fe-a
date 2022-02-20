import useLocalStorage from './useLocalStorage';
import { useEffect, useLayoutEffect } from 'react';

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

  useLayoutEffect(
    function flipToggle() {
      const toggleElement = document.getElementById('darkModeToggle');
      theme === 'dark' && toggleElement.classList.add('ant-switch-checked');
      theme === 'light' && toggleElement.classList.remove('ant-switch-checked');
    },
    [theme]
  );

  useLayoutEffect(() => {
    setTheme(darkTheme ? 'dark' : 'light');
    createAntStylesheet();
  }, []); //eslint-disable-line

  useEffect(
    function setAntStylesheetTheme() {
      const antStylesheet = document.head.querySelector('#antd-stylesheet');
      antStylesheet.href = stylesheets[theme];
    },
    [theme]
  );

  return [toggleTheme];
}
