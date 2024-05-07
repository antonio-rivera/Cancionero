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

export type UpdateProps =
  {
    updateData: () => void
  }

export type EditProps =
  {
    songs: Array<Song>
    updateData: () => void
  }

export type FormProps =
  {
    handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    handleSubmit: (e: FormEvent) => Promise<void>
    formData: Song
  }