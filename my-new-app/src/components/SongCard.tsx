import { Song } from "../models/Song";

export interface SongProp {
  song: Song
  goToSong: (ID: number) => void
}
export default function SongCard({ song, goToSong }: SongProp) {


  return (
    <>
      <div onClick={() => goToSong(song.ID)} id="song-card" className="d-flex justify-content-center flex-column rounded p-2 m-2">
        {song.albumArtwork ? (
          <img className="mx-auto mb-2 rounded" src={song.albumArtwork} alt={`${song.title} artwork`} />
        ) : null}
        <div id="song-card-title" className="text-center py-2">{song.title}</div>
        <div className="text-center text-muted">{song.artist}</div>
        <div className="text-center text-muted pt-2">{song.genre}</div>
      </div>
    </>
  );
}
