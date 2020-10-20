const { app, session, BrowserWindow, BrowserView } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;
let childWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    icon: `${path.join(__dirname, "./note2.ICO")}`,
    webPreferences: {
      javascript: true,
      nativeWindowOpen: true,
      nodeIntegration: false,
    },
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.on("show", () => {
    console.log("window show");
  });
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", () => {
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders["User-Agent"] = "Firefox";
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });
  createWindow();
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
