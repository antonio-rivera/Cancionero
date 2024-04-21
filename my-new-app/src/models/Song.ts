export class Song  {
  ID: number
  title: string
  lyrics: string
  genre: string
  artist: string
  constructor({ID, title, lyrics, genre, artist}: any)
  {
    this.ID = ID;
    this.title = title;
    this.lyrics = lyrics;
    this.genre = genre;
    this.artist = artist;
  }
}