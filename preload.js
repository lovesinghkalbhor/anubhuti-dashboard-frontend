
// preload.js
const { contextBridge, ipcRenderer } = require('electron');



// Expose IPC functions
contextBridge.exposeInMainWorld('electronAPI', {
    storeToken: (accountName, token) => ipcRenderer.invoke('store-token', { accountName, token }),
    getToken: (accountName) => ipcRenderer.invoke('get-token', { accountName }),
    deleteToken: (accountName) => ipcRenderer.invoke('delete-token', { accountName }),



    //available update
    onCheckingUpdate: (callback) => ipcRenderer.on('checking_for_update', callback),
    onUpdateAvailable: (callback) => ipcRenderer.on('update_available', callback),
    onUpdateNotAvailable: (callback) => ipcRenderer.on('update_not_available', callback),
    onUpdateDownloaded: (callback) => ipcRenderer.on('update_downloaded', callback),
    onError: (callback) => ipcRenderer.on('Error', callback),
});