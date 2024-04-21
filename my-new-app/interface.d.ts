export interface IDatabaseApi {
  getAllData: () => Promise<any>,
}

declare global {
  interface Window {
    DB: IDatabaseApi
  }
}