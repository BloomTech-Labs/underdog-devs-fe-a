import useLocalStorage from './useLocalStorage';
import { createElement, useEffect, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';

const stylesheets = {
  light: 'https://cdnjs.cloudflare.com/ajax/libs/antd/4.9.4/antd.min.css',
  dark: 'https://cdnjs.cloudflare.com/ajax/libs/antd/4.9.4/antd.dark.min.css',
};
const createAntStylesheet = () => {
  const antStylesheet = createElement('link', {
    rel: 'stylesheet',
    id: 'antd-stylesheet',
  });
  ReactDOM.render(antStylesheet);
};

export default function useTheme() {
  const darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage(
    'theme',
    darkTheme ? 'dark' : 'light'
  );
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  useLayoutEffect(
    function flipToggleBtn() {
      const toggleBtn = document.getElementById('darkModeToggle');
      theme === 'dark' && toggleBtn.classList.add('ant-switch-checked');
      theme === 'light' && toggleBtn.classList.remove('ant-switch-checked');
    },
    [theme]
  );

  useLayoutEffect(() => {
    setTheme(darkTheme ? 'dark' : 'light');
    document.head.querySelector('#antd-stylesheet') || createAntStylesheet();
  }, []); //eslint-disable-line

  useEffect(
    function setAntStylesheetTheme() {
      document.head.querySelector('#antd-stylesheet').href = stylesheets[theme];
    },
    [theme]
  );

  return [toggleTheme];
}
