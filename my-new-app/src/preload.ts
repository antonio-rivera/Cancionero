import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("DB", {
 getAllData: () => ipcRenderer.invoke("getall"),
 getAllGenres: () => ipcRenderer.invoke("getgenres")
})