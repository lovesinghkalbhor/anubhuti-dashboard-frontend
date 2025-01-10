// main.ts
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const keytar = require('keytar');
require('dotenv').config();

const SERVICE_NAME = "AnubhutiSevaSansthanApp";
const ACCOUNT_NAME = "accessToken";

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        maxHeight: 800,
        maxWidth: 1400,
        title: "Anubhuti vision seva sansthan",
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.webContents.openDevTools();
    win.loadURL("http://localhost:5173");
    console.log(path.join(__dirname, 'preload.js'));
};

// Setup IPC handlers for secure storage
const setupSecureStorage = () => {
    ipcMain.handle('store-token', async (event, { accountName, token }) => {
        try {
            await keytar.setPassword(SERVICE_NAME, accountName, token);
            return { success: true };
        } catch (error) {
            console.error('Error storing token:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('get-token', async (event, { accountName }) => {
        try {
            const token = await keytar.getPassword(SERVICE_NAME, accountName);
            return { success: true, token };
        } catch (error) {
            console.error('Error retrieving token:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('delete-token', async (event, { accountName }) => {
        try {
            await keytar.deletePassword(SERVICE_NAME, accountName);
            return { success: true };
        } catch (error) {
            console.error('Error deleting token:', error);
            return { success: false, error: error.message };
        }
    });
};

app.whenReady().then(() => {
    createWindow();
    setupSecureStorage(); // Initialize secure storage handlers

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});




