// main.js
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
}

// IPC за запис на Markdown файл локално
ipcMain.handle("save-chapter", async (event, { filename, content }) => {
  const dir = path.join(app.getPath("documents"), "StoryForge");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  const filePath = path.join(dir, filename);
  fs.writeFileSync(filePath, content, "utf-8");
  return filePath;
});

app.whenReady().then(() => {
  createWindow();
});
