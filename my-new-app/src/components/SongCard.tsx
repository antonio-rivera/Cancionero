import { Song } from "../models/Song";

export interface SongProp {
  song: Song
  goToSong: (ID: number) => void
}
export default function SongCard({ song, goToSong }: SongProp) {
  const hasArtwork = Boolean(song.albumArtwork);
  const openSong = () => goToSong(song.ID);


  return (
    <>
      <div
        onClick={openSong}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openSong();
          }
        }}
        className={`song-card ${hasArtwork ? "song-card--with-artwork" : "song-card--empty"}`}
        role="button"
        aria-label={`Open ${song.title} by ${song.artist}`}
        tabIndex={0}
      >
        {hasArtwork ? (
          <img className="song-card__artwork" src={song.albumArtwork} alt={`${song.title} artwork`} />
        ) : (
          <div className="song-card__placeholder">
            <div className="song-card__placeholder-title">{song.title}</div>
            <div className="song-card__placeholder-artist">{song.artist}</div>
          </div>
        )}
        <div className="song-card__details">
          <div className="song-card__title">{song.title}</div>
          <div className="song-card__artist">{song.artist}</div>
          <div className="song-card__genre">{song.genre}</div>
        </div>
      </div>
    </>
  );
}
