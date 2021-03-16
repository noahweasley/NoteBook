const { ipcRenderer } = require('electron')
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.on('color', (_event, accentColor, isDarkMode) => {
        const footer = document.querySelector('footer');
        const footerTitle = document.querySelector('h1');
        footerTitle.style.color = isDarkMode ? "white" : "black";
        footer.style.backgroundColor = isDarkMode ? `#${accentColor}` : "white";
    });
})