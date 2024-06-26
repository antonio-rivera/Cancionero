import { contextBridge, ipcRenderer } from "electron";
import { Song } from "./models/Song";

contextBridge.exposeInMainWorld("DB", {
  getAllData: () => ipcRenderer.invoke("getall"),
  getAllGenres: () => ipcRenderer.invoke("getgenres"),
  addSong: (song: Song) => ipcRenderer.invoke("addsong", song),
  editSong: (song: Song) => ipcRenderer.invoke("editsong", song),
  deleteSong: (id: number) => ipcRenderer.invoke("deletesong", id)
})