import { contextBridge, ipcRenderer } from "electron";
import { Song } from "./models/Song";

contextBridge.exposeInMainWorld("DB", {
  getAllData: () => ipcRenderer.invoke("getall"),
  getAllGenres: () => ipcRenderer.invoke("getgenres"),
  addSong: (song: Song) => ipcRenderer.invoke("addsong", song)
})