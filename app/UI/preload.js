const { ipcRenderer } = require('electron')
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('footer');
    const footerTitle = document.querySelector('h1');

    // set the footer color by system's accent color
    ipcRenderer.on('color', (_event, accentColor, isDarkMode) => {
        footerTitle.style.color = isDarkMode ? "white" : "black";
        footer.style.backgroundColor = isDarkMode ? `#${accentColor}` : "white";
    });

})