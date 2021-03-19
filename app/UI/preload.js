const { ipcRenderer } = require('electron')
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    let listContainer = document.getElementById('list-container');
    listContainer.addEventListener('click', () => {
        console.log('tab was clicked');
    })

});