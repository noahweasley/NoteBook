'use strict';

require('./menu');
const { BrowserWindow, app, ipcMain } = require("electron");
const path = require('path');

// Create new window on application first startup
app.whenReady().then(() => {
    createWindow()
})

let win;
/**
 * Create a new window when called
 */
const createWindow = exports.createWindow = (rX, rY, rW, rH, wasMax) => {
    let x; // Window x coordinate or horizontal position on screen
    let y; // Window y coordinate or vertical position on screen

    const winLen = BrowserWindow.getAllWindows().length;
    if (winLen >= 3) return;

    const focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
        let [posX, posY] = focusedWindow.getPosition();
        // Log the window position
        console.log(`	Window position \n x : ${posX}, y : ${posY}`);

        if (!focusedWindow.isNormal())
            posX = posY = 50;
        // Randomly place the window on the screen
        const randX = Math.round(Math.random() * 20);
        const randY = Math.round(Math.random() * 20);
        const _randX = -randX - 5;
        const _randY = -randY - 5;

        x = posX + (randX <= 10 ? _randX : randX);
        y = posY + (randY <= 10 ? _randY : randY);
        // check if window is not fully visible
        const isOffScreen = x < 0 || y < 0;
        // then set the window in a specific position: 60
        if (isOffScreen) x = y = 60;
    }

    let width = 900;
    let height = 500;

    width = rW != null && !wasMax ? rW : width;
    height = rH != null && !wasMax ? rH : height;

    // Create a new browser window
    win = new BrowserWindow({
        x,
        y,
        width,
        height,
        minWidth: 800,
        minHeight: 380,
        frame: false,
        backgroundColor: '#fff',
        show: false,
        webPreferences: {
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(__dirname, '../UI/preload.js')
        }
    });

    // Load the start up page
    win.loadFile(path.join(__dirname, '../pages/index.html'));
    win.on('ready-to-show', win.show);
    // win.webContents.toggleDevTools();
    win.on('close', () => { });
}

// main process callbacks
ipcMain.on('new', createWindow);

ipcMain.on('close-window', () => {
    let window = BrowserWindow.getFocusedWindow();
    window.close();
})

ipcMain.on('minimize-window', () => {
    let window = BrowserWindow.getFocusedWindow();
    window.minimize();
})

ipcMain.on('resize-window', () => {
    let window = BrowserWindow.getFocusedWindow();
    !window.isNormal() ? win.restore() : win.maximize();
})