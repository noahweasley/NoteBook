'use strict';

const { BrowserWindow, app, systemPreferences, nativeTheme } = require("electron");
const path = require('path');
// const database = require('./database');


// Create new window on application first startup
app.whenReady().then(() => {
    // Get the last saved window position and size
    // database.DB_getWindowProperties()
    //     .then((row) => {
    //         let { xCord, yCord, width, height, isMaximized } = row[0];
    //         // Now use the retrieved data to create window, but if this promise fails,
    //         // Use the default {width: 800, height: 600}
    //         createWindow(xCord, yCord, width, height, isMaximized);
    //         database.DB_clearWindowProperties(); // delete all rows
    //     }).catch(() => createWindow())
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

    x = rX != null && !wasMax ? rX : x;
    y = rY != null && !wasMax ? rY : y;

    let width = 800;
    let height = 500;

    width = rW != null && !wasMax ? rW : width;
    height = rH != null && !wasMax ? rH : height;

    // Create a new browser window
    win = new BrowserWindow({
        x,
        y,
        width,
        height,
        frame: true,
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
    win.webContents.send('color', systemPreferences.getAccentColor(), nativeTheme.shouldUseDarkColors);
    win.on('ready-to-show', () => {
        win.show();
    });

    // win.on('close', () => {
    //     database.DB_addWindowProperties({ x, y, width, height, wasMax: true });
    // });

    // Send a message to the window-blurred channel so that renderer process
    // can display blur status
    win.on('blur', () => {
        win.webContents.send('window-blurred');
    });

    // Send a message to the window-in-focus channel so that renderer process
    // can display blur status
    win.on('focus', () => {
        win.webContents.send('window-in-focus')
    });
}