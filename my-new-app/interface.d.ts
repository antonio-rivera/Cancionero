import { Song } from "src/models/Song";

export interface IDatabaseApi {
  getAllData: () => Promise<any>;
  getAllGenres: () => Promise<any>;
  addSong: (song: Song) => Promise<any>;
  editSong: (song: Song) => Promise<any>;
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
    updateData: () => Promise<void>
  }

export type EditProps =
  {
    songs: Array<Song>
    updateData: () => Promise<void>
  }

export type FormProps =
  {
    handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    handleSubmit: (e: FormEvent) => Promise<void>
    formData: Song
  }

export type IDProps = {
  id: string
}

export type ModalProps = {
  song: Song;
  show: boolean;
  handleClose: () => void;
  // handleShow: () => void;
}