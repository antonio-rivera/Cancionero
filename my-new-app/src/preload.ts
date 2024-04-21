import { contextBridge, ipcRenderer } from "electron";
import sqlite3 from "sqlite3";
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const db = new sqlite3.Database('./songs.db', err => {
  if (err) {
      return console.error('Database connection failed!', err);
  }
  console.log('Connected to SQLite database.');
});

contextBridge.exposeInMainWorld("DB", {
 getAllData: () => ipcRenderer.invoke("getall")
})