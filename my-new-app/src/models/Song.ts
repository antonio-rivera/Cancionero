export class Song  {
  ID: Number
  title: String
  lyrics: String
  genre: String
  artist: String
  constructor({ID, title, lyrics, genre, artist}: any)
  {
    this.ID = ID;
    this.title = title;
    this.lyrics = lyrics;
    this.genre = genre;
    this.artist = artist;
  }
}