const { app, BrowserWindow, ipcMain } = require('electron/main')
const { updateElectronApp } = require('update-electron-app')
console.log('update-electron-app module:', updateElectronApp);
updateElectronApp({
  repo: 'jarrywen/my-electron-app', // 替换为你的GitHub仓库路径
  updateInterval: '1 hour', // 检查更新的频率
  logger: console // 打印更新日志
})

const path = require('node:path')
console.log('Hello from main process!')

console.log('version v1.0.4!')
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
  win.webContents.openDevTools(); // 打开开发者工具
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})