
// preload.js
const { contextBridge, ipcRenderer } = require('electron');



// Expose IPC functions
contextBridge.exposeInMainWorld('electronAPI', {
    storeToken: (accountName, token) => ipcRenderer.invoke('store-token', { accountName, token }),
    getToken: (accountName) => ipcRenderer.invoke('get-token', { accountName }),
    deleteToken: (accountName) => ipcRenderer.invoke('delete-token', { accountName })
});