// main.ts
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('node:path');
const keytar = require('keytar');
require('dotenv').config();
const { autoUpdater, AppUpdater } = require("electron-updater")

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;
const SERVICE_NAME = "AnubhutiSevaSansthanApp";
const ACCOUNT_NAME = "accessToken";


let win;
const createWindow = () => {
    win = new BrowserWindow({
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
        },
    });

    // Load the React app from the correct path

    console.log(app.isPackaged)
    if (app.isPackaged) {
        const appPath = app.getAppPath();
        win.loadFile(path.join(appPath, 'dashboard', 'dist', 'index.html'));
    }
    else {
        win.loadURL('http://localhost:5173');
        win.webContents.openDevTools();
    }
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

const autoUpdaterfunction = () => {


    autoUpdater.on('checking-for-update', () => {
        win.webContents.send('checking_for_update'); // Sends message to renderer


    });

    autoUpdater.on('update-available', (info) => {
        win.webContents.send('update_available', info); // Sends message to renderer
        console.log(info, "here is the info object")
        autoUpdater.downloadUpdate()

    });

    autoUpdater.on("update-not-available", (info) => {
        win.webContents.send('update_not_available', info); // Sends message to renderer

    });

    /*Download Completion Message*/
    autoUpdater.on("update-downloaded", (info) => {
        win.webContents.send('update_downloaded', info); // Sends message to renderer
        dialog.showMessageBox(win, {
            type: 'info',
            title: 'Update Downloaded',
            message: 'A new version has been downloaded. Do you want to restart the application now to apply the update?',
            buttons: ['Restart', 'Later']
        })
            .then(result => {
                if (result.response === 0) {
                    autoUpdater.quitAndInstall();
                }
            });

    });

    autoUpdater.on("error", (info) => {
        win.webContents.send('Error', info); // Sends message to renderer
    });
}



app.whenReady().then(() => {
    createWindow();
    setupSecureStorage(); // Initialize secure storage handlers
    autoUpdaterfunction(); //

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
    autoUpdater.checkForUpdates()
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});




