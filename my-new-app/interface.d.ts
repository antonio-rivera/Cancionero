import { Song } from "src/models/Song";

export interface IDatabaseApi {
  getAllData: () => Promise<any>;
  getAllGenres: () => Promise<any>;
  addSong: (song: Song) => Promise<any>;
}

declare global {
  interface Window {
    DB: IDatabaseApi
  }
}

export type Props =
  {
    songs: Array<Song>
  }