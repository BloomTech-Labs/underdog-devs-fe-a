
const stylesheets = {
    light: "https://cdnjs.cloudflare.com/ajax/libs/antd/4.9.4/antd.min.css",
    dark: "https://cdnjs.cloudflare.com/ajax/libs/antd/4.9.4/antd.dark.min.css"
};

//creates <link rel="stylesheet" id="ant-dstylesheet" href="">
const createStylesheetLink = () => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.id = "antd-stylesheet";
    document.head.appendChild(link);
    return link;
};

//gets the <link> that was created by getting by its id || calls createStylesheetLink if its not there
const getStylesheetLink = () => {
    return document.head.querySelector("#antd-stylesheet") || createStylesheetLink();
};

// checks what the user's systemtheme is, if its dark, it will set the className button toggle so its on.
const systemTheme = () => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.getElementById("darkModeToggle").className = "ant-switch ant-switch-small ant-switch-checked";
    };
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};


export const getTheme = () => { 
    if (localStorage.theme === 'dark'){
        document.getElementById("darkModeToggle").className = "ant-switch ant-switch-small ant-switch-checked";
        return localStorage.getItem("theme") || systemTheme(); 
    } else if (localStorage.theme === 'light') {
        document.getElementById("darkModeToggle").className = "ant-switch ant-switch-small";
        return localStorage.getItem("theme") || systemTheme(); 
    }
    return localStorage.getItem("theme") || systemTheme(); 
    };
    export const setTheme = (theme) => {
        localStorage.setItem("theme", theme);
        getStylesheetLink().href = stylesheets[theme];
};

export const DarkModeToggle = () => { 
    return setTheme(getTheme() === "dark" ? "light" : "dark"); 
};
