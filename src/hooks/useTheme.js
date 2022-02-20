import useLocalStorage from './useLocalStorage';
import { useEffect, useLayoutEffect } from 'react';

const stylesheets = {
  light: 'https://cdnjs.cloudflare.com/ajax/libs/antd/4.9.4/antd.min.css',
  dark: 'https://cdnjs.cloudflare.com/ajax/libs/antd/4.9.4/antd.dark.min.css',
};
const createStylesheetLink = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.id = 'antd-stylesheet';
  document.head.appendChild(link);
  return link;
};

export default function useTheme() {
  const darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage(
    'theme',
    darkTheme ? 'dark' : 'light'
  );

  useEffect(() => setTheme(darkTheme ? 'dark' : 'light'), []); //eslint-disable-line
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    const getStylesheet = document.head.querySelector('#antd-stylesheet');
    const antStylesheet = getStylesheet || createStylesheetLink();
    antStylesheet.href = stylesheets[theme];
  }, [theme]);

  useLayoutEffect(() => {
    const toggleOn = 'ant-switch ant-switch-small ant-switch-checked';
    const toggleOff = 'ant-switch ant-switch-small';
    const toggleElement = document.getElementById('darkModeToggle');
    toggleElement.className = theme === 'dark' ? toggleOn : toggleOff;
  }, [theme]);

  return [theme, toggleTheme];
}
