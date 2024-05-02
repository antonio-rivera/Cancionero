export interface IDatabaseApi {
  getAllData: () => Promise<any>,
  getAllGenres: () => Promise<any>
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