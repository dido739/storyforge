// preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  saveChapter: (data) => ipcRenderer.invoke("save-chapter", data),
});
