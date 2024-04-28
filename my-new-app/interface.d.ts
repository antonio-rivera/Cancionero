export interface IDatabaseApi {
  getAllData: () => Promise<any>,
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