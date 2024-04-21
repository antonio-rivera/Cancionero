import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("DB", {
 getAllData: () => ipcRenderer.invoke("getall")
})