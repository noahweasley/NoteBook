'use-strict'

detectWindowActions();
awaitCreateNewWindow();

function detectWindowActions() {
    // close
    document.getElementById('action-close')
        .addEventListener('click', () => window.bridgeApis.send("close-window"));

    // resize
    document.getElementById('action-window-resize')
        .addEventListener('click', () => window.bridgeApis.send("resize-window"));

    // minimize
    document.getElementById('action-minimize')
        .addEventListener('click', () => window.bridgeApis.send("minimize-window"));
}

function awaitCreateNewWindow() {
    let win = document.querySelector(".icon-window");
    win.addEventListener("click", () => window.bridgeApis.send("new"));
}