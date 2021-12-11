


const stylesheets = {
    light: "https://cdnjs.cloudflare.com/ajax/libs/antd/4.9.4/antd.min.css",
    dark: "https://cdnjs.cloudflare.com/ajax/libs/antd/4.9.4/antd.dark.min.css"
};

const createStylesheetLink = () => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.id = "antd-stylesheet";
    document.head.appendChild(link);
    return link;
};

const getStylesheetLink = () => {
    return document.head.querySelector("#antd-stylesheet") || createStylesheetLink();
};

const systemTheme = () => {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

const getTheme = () => { return localStorage.getItem("theme") || systemTheme(); };
    const setTheme = (theme) => {
    localStorage.setItem("theme", theme);
    getStylesheetLink().href = stylesheets[theme];
};

export const DarkModeToggle = () => { return setTheme(getTheme() === "dark" ? "light" : "dark"); };


