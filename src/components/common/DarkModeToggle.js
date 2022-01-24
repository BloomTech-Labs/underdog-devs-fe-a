// hosted style sheets from cdnjs
const stylesheets = {
  light: 'https://cdnjs.cloudflare.com/ajax/libs/antd/4.9.4/antd.min.css',
  dark: 'https://cdnjs.cloudflare.com/ajax/libs/antd/4.9.4/antd.dark.min.css',
};

//creates and returns <link rel="stylesheet" id="ant-dstylesheet" href="<theme from stylesheets obj goes here>">
const createStylesheetLink = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.id = 'antd-stylesheet';
  document.head.appendChild(link);
  return link;
};

//returns the <link> that was created by getting by its id || calls createStylesheetLink if its not there
const getStylesheetLink = () => {
  return (
    document.head.querySelector('#antd-stylesheet') || createStylesheetLink()
  );
};

// checks what the user's systemtheme is, if its dark, it will set the className button toggle so its on.
const systemTheme = () => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.getElementById('darkModeToggle').className =
      'ant-switch ant-switch-small ant-switch-checked';
  }
  return window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

// returns the theme, if no theme, call systemTheme func
export const getTheme = () => {
  return localStorage.getItem('theme') || systemTheme();
};

//sets the theme, gets the theme from the stylesheets object and sets the href equal to that
export const setTheme = theme => {
  localStorage.setItem('theme', theme);
  // asssigns the href in getStylesheetLink function to the corrisponding theme in the stylesheets object
  getStylesheetLink().href = stylesheets[theme];
};

export const DarkModeToggle = () => {
  return setTheme(getTheme() === 'dark' ? 'light' : 'dark');
};
